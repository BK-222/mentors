Vue.component('base-badge', {
	template:
	'<div class="badge" :class="type">\
		{{ text }}\
	</div>',
	props: ['type', 'title'],
	computed: {
		text: function() {
			return this.title.toUpperCase();
		}
	}
});