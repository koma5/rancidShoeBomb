var app = new Vue({
	el: '#app',
	data: {
		message: "Hello fillers of land",
		landfills: [1,2]
	},
	mounted() {
		axios.get('http://127.0.0.1:3000/landfills').then(response => (this.landfills = response.data))
	}
})
