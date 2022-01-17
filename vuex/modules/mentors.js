const mentorsModule = {
	namespaced: true,
	state: function() {
		return {
			mentors: [
				{
					id: 'm1',
					firstName: 'Okabe',
					lastName: 'Rintaro',
					skills: ['talking to self on the phone', 'laughing hysterically'],
					description: 'I\'m a mad scientist!',
					rate: 135
				},
				{
					id: 'm2',
					firstName: 'Kurisu',
					lastName: 'Makise',
					skills: ['general relativity', 'neuroscience'],
					description: 'I wish I had my fork with me.',
					rate: 125
				}
			],
			lastFetch: null
		}
	},
	mutations: {
		registerMentor: function(state, payload) {
			state.mentors.push(payload);
		},
		setMentor: function(state, payload) {
			state.mentors = payload;
		},
		setFetchTimestamp: function(state) {
			state.lastFetch = new Date().getTime();
		}
	},
	actions: {
		registerMentor: async function(context, data) {
			let id = context.rootGetters.userId;
			const newData = {
				firstName: data.first,
				lastName: data.last,
				skills: data.skills,
				description: data.desc,
				rate: data.rate
			}

			let token = context.rootGetters.token;

			const response = await fetch(
				`https://find-a-mentor-66f28-default-rtdb.europe-west1.firebasedatabase.app/mentors/${id}.json?auth=${token}`,
			{
				method: 'PUT',
				body: JSON.stringify(newData)
			});
			context.commit('registerMentor', Object.assign(newData, { id: id }));
			// context.commit('registerMentor', newData);
		},
		loadMentors: async function(context, data) {
			if (!data.forceRefresh && !context.getters.shouldUpdate) { //cache
				return;
			}
			const response = await fetch(
				//?auth adds a token
				`https://find-a-mentor-66f28-default-rtdb.europe-west1.firebasedatabase.app/mentors.json`
			);
			const responseData = await response.json();
			if (!response.ok) {
				const error = new Error(responseData.message || 'Failed to fetch!');
				throw error;
			}
			const mentors = [];
			let key;
			for (key in responseData) {
				const mentor = {
					id: key,
					firstName: responseData[key].firstName,
					lastName: responseData[key].lastName,
					skills: responseData[key].skills,
					description: responseData[key].description,
					rate: responseData[key].rate
				}
				mentors.push(mentor);
			}
			context.commit('setMentor', mentors);
			context.commit('setFetchTimestamp'); //no payload needed
		}
	},
	getters: {
		mentors: function(state) {
			return state.mentors;
		},
		hasMentors: function(state) {
			return state.mentors && state.mentors.length > 0;
		},
		isMentor: function(_, getters, _2, rootGetters) {
			let mentors = getters.mentors;
			let userId = rootGetters.userId;
			return mentors.some(mentor => mentor.id === userId);
			//some() returns true if some mentor fulfills the criteria  
		},
		shouldUpdate: function(state) {
			const lastFetch = state.lastFetch;
			if (!lastFetch) {
				return true;
			} else {
				const currentTimestamp = new Date().getTime();
				return (currentTimestamp - lastFetch) / 1000 > 60;
			}
		}
	}
}


// if (response.status >= 400) {
				// 	const errResData = await response.json();
				// 	const error = new Error(errResData.message);
				// 	throw error;
				// }