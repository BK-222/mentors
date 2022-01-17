Vue.component('request-item', {
	template:
	'<div>\
		<li>\
			<div>\
				<a :href="emailLink">{{ email }}</a>\
			</div>\
			<p>{{ message }}</p>\
		</li>\
	</div>',
	props: {
		email: { type: String, required: true },
		message: { type: String, required: true }
	},
	computed: {
		emailLink: function() {
			return 'mailto:' + this.email;
			//mailto: is a special instruction that the browser understands
		}
	}
});