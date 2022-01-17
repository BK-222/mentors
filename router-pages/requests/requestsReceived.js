const requestsReceived = {
	template:
	'<div>\
		REQUESTS RECEIVED\
		<section>\
		<h1 v-if="!!error">{{ error }}</h1>\
			<base-card v-else>\
				<header>\
					Requests received\
				</header>\
				<base-spinner v-if="isLoading"></base-spinner>\
					<ul v-else-if="hasRequests && !isLoading">\
						<request-item v-for="request in receivedRequests"\
						:key="request.id"\
						:email="request.userEmail"\
						:message="request.message"\
						></request-item>\
					</ul>\
					<h3 v-else>No requests have been received.</h3>\
			</base-card>\
		</section>\
	</div>',
	data: function() {
		return {
			isLoading: false,
			error: null
		}
	},
	methods: {
		loadRequests: async function() {
			this.isLoading = true;
			try {
				await this.$store.dispatch('requests/fetchRequests');
			}
			catch (error) {
				this.error = error.message || 'Something failed!';
			}
			this.isLoading = false;
		}
	},
	computed: {
		receivedRequests: function() {
			return this.$store.getters['requests/requests'];
		},
		hasRequests: function() {
			return this.$store.getters['requests/hasRequests'];
		}
	},
	created() {
		this.loadRequests();
	}
}