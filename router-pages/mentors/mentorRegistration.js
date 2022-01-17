const mentorRegistration = {
	template:
	'<div>\
		REGISTER\
		<base-card>\
			<mentor-form @mentor-data="saveData"></mentor-form>\
		</base-card>\
	</div>',
	methods: {
		saveData: function(data) {
			console.log(data);
			this.$store.dispatch('mentors/registerMentor', data);
			this.$router.replace('/mentors'); //same as push() except that going back is disabled
		}
	}
}