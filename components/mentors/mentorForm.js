Vue.component('mentor-form', {
	template:
	'<div>\
		<form @submit.prevent="submitForm">\
			<div>\
				<label for="firstname">First Name</label>\
				<input type="text" id="firstname" v-model.trim="firstName.val">\
				<p v-if="!firstName.isValid">First name is missing.</p>\
			</div>\
			<div>\
				<label for="lastname">Last Name</label>\
				<input type="text" id="lastname" v-model.trim="lastName.val">\
				<p v-if="!lastName.isValid">Last name is missing.</p>\
			</div>\
			<div>\
				<label for="description">Description</label>\
				<textarea id="description" rows="5" v-model.trim="description.val"></textarea>\
				<p v-if="!description.isValid">Description is missing.</p>\
			</div>\
			<div>\
				<label for="rate">Rate</label>\
				<input type="number" id="rate" min=0 v-model.number="rate.val">\
				<p v-if="!rate.isValid">Please enter your rate.</p>\
			</div>\
			<div>\
				<h3>Areas of expertise.</h3>\
				<div>\
					<input type="checkbox" id="laughing" value="laughing hysterically" v-model="areas.val">\
					<label for="laughing">Laughing</label>\
				</div>\
				<div>\
					<input type="checkbox" id="relativity" value="general relativity" v-model="areas.val">\
					<label for="relativity">Relativity</label>\
				</div>\
				<div>\
					<input type="checkbox" id="neuroscience" value="neuroscience" v-model="areas.val">\
					<label for="neuroscience">Neuroscience</label>\
				</div>\
				<p v-if="!areas.isValid">At least one skill must be selected.</p>\
			</div>\
			<p v-if="!isFormValid">Please check the form inputs and submit again.</p>\
			<base-button>Register</base-button>\
		</form>\
	</div>',
	emits: ['mentor-data'],
	data: function() {
		return {
			firstName: { val: '', isValid: true },
			lastName: { val: '', isValid: true },
			description: { val: '', isValid: true },
			rate: { val: null, isValid: true },
			areas: { val: [], isValid: true },
			isFormValid: true
		}
	},
	methods: {
		validateForm: function() {
			this.formIsValid = true;
			if (this.firstName.val === '') {
				this.firstName.isValid = false;
				this.formIsValid = false;
			}
			if (this.lastName.val === '') {
				this.lastName.isValid = false;
				this.formIsValid = false;
			}
			if (this.description.val === '') {
				this.description.isValid = false;
				this.formIsValid = false;
			}
			if (!this.rate.val || this.rate.val < 0) {
				this.rate.isValid = false;
				this.formIsValid = false;
			}
			if (this.firstName.val === '') {
				this.firstName.isValid = false;
				this.formIsValid = false;
			}
			if (this.areas.val.length === 0) {
				this.areas.isValid = false;
				this.formIsValid = false;
			}
		},
		submitForm: function() {
			this.validateForm();
			if (this.formIsValid === false) {
				return;
			}
			const data = {
				first: this.firstName.val,
				last: this.lastName.val,
				desc: this.description.val,
				rate: this.rate.val,
				skills: this.areas.val
			}
			console.log(data);
			this.$emit('mentor-data', data);
		}
	}
});