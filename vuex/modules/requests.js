const requestsModule = {
	namespaced: true,
	state: function() {
		return {
			requests: []
		}
	},
	mutations: {
		addRequest: function(state, payload) {
			state.requests.push(payload);
		},
		setRequests: function(state, payload) {
			state.requests = payload;
		}
	},
	actions: {
		contactMentor: async function(context, data) {
			const newRequest = {
				userEmail: data.email,
				message: data.message
			}
			const response = await fetch(`https://find-a-mentor-66f28-default-rtdb.europe-west1.firebasedatabase.app/requests/${data.mentorId}.json`, {
				method: 'POST',
				body: JSON.stringify(newRequest)
			});
			const responseData = await response.json();
			if (!response.ok) {
				const error = new Error(responseData.message || 'Failed to fetch!');
				throw error;
			}
			newRequest.id = responseData.name; //name holds the auto-generated firebase id
			newRequest.mentorId = data.mentorId;
			context.commit('addRequest', newRequest);
		},
		fetchRequests: async function(context) {
			const mentorId = context.rootGetters.userId;
			const token = context.rootGetters.token;
			const response = await fetch(`https://find-a-mentor-66f28-default-rtdb.europe-west1.firebasedatabase.app/requests/${mentorId}.json?auth=${token}`);
			const responseData = await response.json();
			if (!response.ok) {
				const error = new Error(responseData.message || 'Failed to fetch!');
				throw error;
			}
			const requests = [];
			let key;
			for (key in responseData) {
				const request = {
					id: key,
					mentorId: mentorId, //from the rootGetters
					userEmail: responseData[key].userEmail,
					message: responseData[key].message
				}
				requests.push(request);
			}
			context.commit('setRequests', requests);
		}

	},
	getters: {
		requests: function(state, _, _2, rootGetters) {
			let mentorId = rootGetters.userId;
			return state.requests.filter(request => request.mentorId === mentorId);
			// return state.requests;
		},
		hasRequests: function(_, getters) {
			return getters.requests && getters.requests.length > 0;
			// return state.requests && state.requests.length > 0;
		}
	}
};