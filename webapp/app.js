var app = new Vue({
	el: '#app',
	data: {
		message: "Hello fillers of land",
		landfills: []
	},
	mounted() {
		axios.get('http://127.0.0.1:3000/landfills').then(response => (this.landfills = response.data))
	},
	methods: {

		addLandfill: function(e) {
			if(e.target.value !== '') {
				this.landfills.push({'name': e.target.value});
				axios.post('http://127.0.0.1:3000/landfills', {'name': e.target.value})
				e.target.value = '';
			}
		}
	}
})

Vue.component('landfill', {
	props: ['landfill'],
	template: '<li> {{ landfill.name }}</li>'
});
