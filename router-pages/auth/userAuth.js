const userAuth = {
	template:
	'<div>\
		<base-card v-if="isLoading">\
			<p>Authenticating...</p>\
			<base-spinner></base-spinner>\
		</base-card>\
		<base-card>\
			<form @submit.prevent="submitForm">\
				<div>\
					<label for="email">e-mail</label>\
					<input type="email" id="email" v-model.trim="email">\
				</div>\
				<div>\
					<label for="password">Password</label>\
					<input type="password" id="password" v-model.trim="password">\
				</div>\
				<p v-if="!isFormValid">Please enter a valid email and password (min. 6 chars.)</p>\
				<button>{{ submitButtonCaption }}</button>\
				<button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</button>\
			</form>\
		</base-card>\
	</div>',
	data: function() {
		return {
			email: '',
			password: '',
			isFormValid: true,
			mode: 'login',
			isLoading: false,
			error: null
		}
	},
	methods: {
		submitForm: async function() {
			this.isFormValid = true;
			if (
				this.email === '' ||
				!this.email.includes('@') ||
				this.password.length < 1
			) {
				this.isFormValid = false;
				return;
			}
			this.isLoading = true;

			const actionPayload = {
				email: this.email,
				password: this.password
			}
			
			try {
				if (this.mode === 'login') {
				    await this.$store.dispatch('logIn', actionPayload);
				} else {
				    await this.$store.dispatch('signUp', actionPayload);
				}
				const redirectUrl = `/${(this.$route.query.redirect || 'mentors')}`; //leads to register route
				//this.$router.replace('/mentors');
				this.$router.replace(redirectUrl); //not push(), so that we can't go back
			} catch (error) {
				this.error = error.message || 'Failed to authenticate, try again later.';
			}
			this.isLoading = false;
		},
		switchAuthMode: function() {
			if (this.mode === 'login') {
				this.mode = 'signup';
			} else {
				this.mode = 'login';
			}
		}
	},
	computed: {
		submitButtonCaption: function() {
			if (this.mode === 'login') {
				return 'Log In';
			} else {
				return 'Sign Up';
			}
		},
		switchModeButtonCaption: function() {
			if (this.mode === 'login') {
				return 'Sign Up instead';
			} else {
				return 'Log In instad';
			}
		}
	}
}