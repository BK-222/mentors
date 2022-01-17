const mentorsList = {
	template:
	'<div>\
		<section>\
			<mentor-filter @change-filter="setFilters($event)"></mentor-filter>\
		</section>\
		<section>\
			<base-card>\
				<div v-if="!!error">{{ error }}</div>\
				<div class="card__buttons">\
					<base-button mode="outline" @click="loadMentors(true)">Refresh</base-button>\
					<button mode="outline" @click="loadMentors(true)">Refresh</button>\
					<base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Coach</base-button>\
					<base-button v-if="isLoggedIn && !isMentor && !isLoading" link to="/register">Register as a Mentor</base-button>\
				</div>\
				<div v-if="isLoading">\
					<base-spinner></base-spinner>\
				</div>\
				<ul v-else-if="hasMentors">\
					<mentor-item v-for="mentor in filteredMentors"\
						:key="mentor.id"\
						:id="mentor.id"\
						:firstName="mentor.firstName"\
						:lastName="mentor.lastName"\
						:rate="mentor.rate"\
						:skills="mentor.skills"\
					></mentor-item>\
				</ul>\
				<h4 v-else>No mentors found!</h4>\
			</base-card>\
		</section>\
	</div>',
	data: function() {
		return {
			isLoading: false, //spinner
			error: null,
			activeFilters: {
				laughing: true,
				relativity: true,
				neuroscience: true
			}
		}
	},
	methods: {
		setFilters: function(updatedFilters) {
			this.activeFilters = updatedFilters;
		},
		loadMentors: async function(refresh = false) {
			console.log('ping');
			this.isLoading = true;
			try {
				await this.$store.dispatch('mentors/loadMentors', { forceRefresh: refresh });
			}	catch(error) {
				this.error = error.message || 'Something went wrong!';
			}
			this.isLoading = false;
		}
	},
	computed: {
		filteredMentors: function() {
			const mentors = this.$store.getters['mentors/mentors'];
			return mentors.filter(mentor => {
				if (this.activeFilters.laughing && mentor.skills.includes('laughing hysterically')) {
					return true;
				}
				if (this.activeFilters.relativity && mentor.skills.includes('general relativity')) {
					return true;
				}
				if (this.activeFilters.neuroscience && mentor.skills.includes('neuroscience')) {
					return true;
				}
				return false;
			});
		},
		hasMentors: function() {
			return this.$store.getters['mentors/hasMentors'] && !this.isLoading;
		},
		isMentor: function() { //controls the visibility of the register button
			return this.$store.getters['mentors/isMentor'];
		},
		isLoggedIn: function() {
			return this.$store.isAuthenticated;
		}
	},
	created() {
		this.loadMentors();
	}
}