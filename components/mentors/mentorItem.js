Vue.component('mentor-item', {
	template:
	'<div>\
		<li>\
			<h3>{{ fullName }}</h3>\
			<h4>${{ rate }}/hour</h4>\
		</li>\
		<base-badge v-for="skill in skills" :key="skill" :title="skill"></base-badge>\
		<base-button mode="outline" link :to="mentorContactLink">Contact</base-button>\
		<base-button link :to="mentorDetailsLink">View Details</base-button>\
		<hr>\
	</div>',
	props: {
		id: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		rate: { type: Number, required: true },
		skills: { type: Array, required: true }
	},
	computed: {
		fullName: function() {
			return `${this.firstName} ${this.lastName}`;
		},
		mentorContactLink: function() {
			return `${this.$route.path}/${this.id}/contact`; //from the current path we are on in the url
		},
		mentorDetailsLink: function() {
			return `${this.$route.path}/${this.id}`;
		}
	}
});
