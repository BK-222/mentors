const contactMentor = {
	template:
	'<div>\
		<form @submit.prevent="submitForm">\
			<div>\
				<label for="email">Your email.</label>\
				<input type="email" id="email" v-model.trim="email">\
			</div>\
			<div>\
				<label for="message">Message</label>\
				<textarea id="message" rows="5" v-model.trim="message"></textarea>\
			</div>\
			<p v-if="!isFormValid">Please enter a valid email and a message.</p>\
			<div>\
				<base-button>Send message</base-button>\
			</div>\
		</form>\
	</div>',
	data: function() {
		return {
			email: '',
			message: '',
			isFormValid: true
		}
	},
	methods: {
		submitForm: function() {
			this.isFormValid = true;
			if (this.email === '' || !this.email.includes('@') || this.message === '') {
				this.isFormValid = false;
				return;
			}
			const data = {
				mentorId: this.$route.params.id,
				email: this.email,
				message: this.message
			}
			this.$store.dispatch('requests/contactMentor', data);
			this.$router.replace('/mentors');
		}
	}
}