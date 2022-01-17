let timer;
const authModule = {
	state: function() {
		return {
			userId: null,
			token: null,
			// tokenExpiration: null,
			didAutoLogOut: false
		}
	},
	getters: {
		userId: function(state) {
			return state.userId;
		},
		token: function(state) {
			return state.token;
		},
		isAuthenticated: function(state) {
			return !!state.token; //converts to a true boolean
		},
		didAutoLogOut: function(state) {
			return state.didAutoLogOut;
		}
	},
	mutations: {
		setUser: function(state, payload) {
			console.log(payload);
			state.token = payload.token;
			state.userId = payload.userId;
			state.didAutoLogOut = false;

			// only matters when page is reloaded, no need to commit to vuex
			// state.tokenExpiration = payload.tokenExpiration;
		},
		setAutoLogOut: function(state) {
			state.didAutoLogOut = true;
		}
	},
	actions: {
		logIn: async function(context, data) {
			return context.dispatch('auth', Object.assign({ mode: 'logIn' }, data) );
			// const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGpTcxBCabD_ojwpP6XeqdaRM9oht6bko', {
			// 	method: 'POST',
			// 	body: JSON.stringify({
			// 		email: data.email,
			// 		password: data.password,
			// 		returnSecureToken: true
			// 	})
			// });
			// const responseData = await response.json();
			// if (!response.ok) {
			// 	console.log(responseData);
			// 	const error = new Error(responseData.message || 'Failed to authenticate.');
			// 	throw error;
			// }
			// console.log(responseData);
			// context.commit('setUser', {
			// 	token: responseData.idToken,
			// 	userId: responseData.userId,
			// 	tokenExpiration: responseData.expiresIn
			// });
		},
		signUp: async function(context, data) {
			return context.dispatch('auth', Object.assign({ mode: 'signUp' }, data) );
			// const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGpTcxBCabD_ojwpP6XeqdaRM9oht6bko', {
			// 	method: 'POST',
			// 	body: JSON.stringify({
			// 		email: data.email,
			// 		password: data.password,
			// 		returnSecureToken: true
			// 	})
			// });
			// const responseData = await response.json();
			// if (!response.ok) {
			// 	console.log(responseData);
			// 	const error = new Error(responseData.message || 'Failed to authenticate.');
			// 	throw error;
			// }
			// console.log(responseData);
			// context.commit('setUser', {
			// 	token: responseData.idToken,
			// 	userId: responseData.localId,
			// 	tokenExpiration: responseData.expiresIn
			// });
		},
		auth: async function(context, data) {
			const mode = data.mode;
			//login url
			let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGpTcxBCabD_ojwpP6XeqdaRM9oht6bko';
			
			if (mode === 'signUp') {
			//signup url
				url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGpTcxBCabD_ojwpP6XeqdaRM9oht6bko';
			}

			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: data.email,
					password: data.password,
					returnSecureToken: true
				})
			});
			const responseData = await response.json();
			if (!response.ok) {
				console.log(responseData);
				const error = new Error(responseData.message || 'Failed to authenticate.');
				throw error;
			}

			//+ converts string to a number
			//*1000 converts to milliseconds
			// const expiresIn = 5000; //testing timer
			const expiresIn = +responseData.expiresIn * 1000;
			const expirationDate = new Date().getTime() + expiresIn;

			//local storage in the browser, not just Vuex
			//logs user in automatically once the data is checked
			localStorage.setItem('token', responseData.idToken);
			localStorage.setItem('userId', responseData.localId);
			localStorage.setItem('tokenExpiration', expirationDate);

			timer = setTimeout(function() {
				context.dispatch('autoLogOut');
			}, expiresIn);

			console.log(responseData);
			context.commit('setUser', {
				token: responseData.idToken,
				userId: responseData.localId
				// tokenExpiration: responseData.expiresIn

				// only matters when page is reloaded, no need to commit to vuex
				// tokenExpiration: expirationDate
			});
		},
		autoLogIn: function(context) {
			const token = localStorage.getItem('token');
			const userId = localStorage.getItem('userId');

			//timestamp in the future
			const tokenExpiration = localStorage.getItem('tokenExpiration');

			//the difference between the future timestamp and the current time
			const expiresIn = +tokenExpiration - new Date().getTime();

			if (expiresIn < 0) {
				return; //not continuing with log in
			}

			timer = setTimeout(function() {
				context.dispatch('autoLogOut');
			}, expiresIn);

			if (token && userId) {
				context.commit('setUser', {
					token: token,
					userId: userId

					// only matters when page is reloaded, no need to commit to vuex
					// tokenExpiration: null
				});
			}
		},
		logOut: function(context) {
			localStorage.removeItem('token');
			localStorage.removeItem('userId');

			localStorage.removeItem('tokenExpiration');

			clearTimeout(timer);

			context.commit('setUser', {
				token: null, //isAuthenticated will be set to false
				userId: null
				// tokenExpiration: null
			});
		},
		autoLogOut: function(context) {
			context.dispatch('logOut');
			context.commit('setAutoLogOut');
		}
	}
};