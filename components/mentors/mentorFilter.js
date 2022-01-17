Vue.component('mentor-filter', {
	template:
	'<div>\
		<base-card>\
			<h2>Filter your options</h2>\
			<input type="checkbox" id="laughing" checked @change="setFilter($event)">\
			<label for="laughing">Laughing</label>\
			<input type="checkbox" id="relativity" checked @change="setFilter($event)">\
			<label for="relativity">Relativity</label>\
			<input type="checkbox" id="neuroscience" checked @change="setFilter($event)">\
			<label for="neuroscience">Neuroscience</label>\
		</base-card>\
	</div>',
	emits: ['change-filter'],
	data: function() {
		return {
			filters: {
				laughing: true,
				relativity: true,
				neuroscience: true
			}
		}
	},
	methods: {
		setFilter: function(event) {
			let inputId = event.target.id;
			let isActive = event.target.checked; 
			const updatedFilters = Object.assign(this.filters, { [inputId]: isActive });
			// const updatedFilters = {
				// ...this.filters,
				// [inputId]: isActive
			// }
			this.filters = updatedFilters;
			this.$emit('change-filter', updatedFilters);
		}
	}
});