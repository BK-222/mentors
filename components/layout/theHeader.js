const theHeader = {
	template:
	'<div>\
		<nav class="navbar">\
			<h1 class="navbar__h1"><router-link to="/">Find a Mentor</router-link></h1>\
			<ul class="navbar__ul">\
				<li class="navbar__li">\
					<router-link to="/mentors">All Mentors</router-link>\
				</li>\
				<li v-if="isLoggedIn" class="navbar__li">\
					<router-link to="/requests">Requests</router-link>\
				</li>\
				<li v-else class="navbar__li">\
					<router-link to="/auth">Login</router-link>\
				</li>\
				<li v-if="isLoggedIn" class="navbar__li">\
					<button @click="logOut">Logout</button>\
				</li>\
			</ul>\
		</nav>\
	</div>',
	methods: {
		logOut: function() {
			this.$store.dispatch('logOut');
			this.$router.replace('/mentors');
		}
	},
	computed: {
		isLoggedIn: function() {
			return this.$store.getters.isAuthenticated;
		}
	}
}