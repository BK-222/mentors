Vue.component('base-button', {
	template:
	'<div>\
		<button v-if="!link" :class="mode" class="button">\
			<slot></slot>\
		</button>\
		<router-link v-else :to="to" :class="mode" class="link-button">\
			<slot></slot>\
		</router-link>\
	</div>',
	props: {
		link: { type: Boolean, required: false, default: false },
		to: { type: String, required: false, default: null },
		mode: { type: String, required: false, default: null }
	}
});