const mentorDetails = {
	template:
	'<div>\
		<section>\
			<base-card>\
				<h2>{{ fullName }}</h2>\
				<h3>${{ rate }}</h3>\
			</base-card>\
		</section>\
		<section>\
			<base-card>\
				<header>\
					<h2>Reach out now!</h2>\
					<base-button link :to="contactLink">Contact</base-button>\
				</header>\
				<router-view></router-view>\
			</base-card>\
		</section>\
		<section>\
			<base-card>\
				<base-badge v-for="skill in skills" :key="skill" :title="skill"></base-badge>\
				<p>{{ description }}</p>\
			</base-card>\
		</section>\
	</div>',
	props: ['id'], //passes the :id param (vue-router 2.2.0+)
	data: function() {
		return {
			selectedMentor: null
		}
	},
	computed: {
		fullName: function() {
			return `${this.selectedMentor.firstName} ${this.selectedMentor.lastName}`;
		},
		skills: function() {
			return this.selectedMentor.skills;
		},
		rate: function() {
			return this.selectedMentor.rate;
		},
		description: function() {
			return this.selectedMentor.description;
		},
		contactLink: function() {
			// return `${this.$route.path}/${this.$route.params.id}/contact`;
			return `${this.$route.path}/contact`;
		}
	},
	created: function() {
		this.selectedMentor = this.$store.getters['mentors/mentors'].find(mentor => mentor.id === this.$route.params.id);
	}
}