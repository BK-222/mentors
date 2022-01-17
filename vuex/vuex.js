const vuex = new Vuex.Store({
	modules: {
		mentors: mentorsModule,
		requests: requestsModule,
		auth: authModule
	}
	// state: function() {
	// 	return {
	// 		userId: 'c3'
	// 	}
	// },
	// getters: {
	// 	userId: function(state) {
	// 		return state.userId;
	// 	}
	// }
});