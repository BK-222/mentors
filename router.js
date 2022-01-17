const router = new VueRouter({
	// mode: 'history',
	routes: [
		{ path: '/', redirect: '/mentors' },
		{ path: '/mentors', component: mentorsList },
		{ path: '/mentors/:id', component: mentorDetails, props: true, children: [{ path: '/mentors/:id/contact', component: contactMentor }] },
		{ path: '/register', component: mentorRegistration, meta: { requiresAuth: true } },
		{ path: '/requests', component: requestsReceived, meta: { requiresAuth: true } },
		{ path: '/auth', component: userAuth, meta: { requiresUnAuth: true } },
		{ path: '/:notFound(.*)', component: notFound }
	]
});


// global navigation guard
// router.beforeEach(function(to, from, next) {
// 	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
// 		next('/auth');
// 	} else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
// 		next('/mentors');
// 	} else {
// 		next();
// 	}
// });

// 'props: true' allows to pass the value of dynamic name (:id) as prop to a component (mentorDetails)
// available in vue-router 2.2.0+