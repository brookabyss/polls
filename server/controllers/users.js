const mongoose = require("mongoose")
const User = mongoose.model("User")
const Poll = mongoose.model("Poll")

module.exports = {
	login: (req, res) => {
        console.log('login function', req.body.name)
		User.findOne({name: req.body.name})
			.then(data => {
				if(data){
					req.session.user_id = data._id
					res.json(data)
				} else {
					let new_user = new User({name: req.body.name})
					new_user.save()
						.then(() => {
							req.session.user_id = new_user._id
							res.json(new_user)
						})
						.catch(err => res.status(500).json(err))
				}
			})
			
	},
	getUsers : (req, res) => {
		console.log("Inside getUsers function")
		User.find({})
		.then(data => res.json(data))
	    .catch(err => res.status(500).json(err))

	},
	// index: (req, res) => {
	// 	User.find()
	// 		.then(data => res.json(data))
	// 		.catch(err => res.status(500).json(err))
	// },
	get_logged_in_user: (req, res) => {
		if(req.session.user_id){
			User.findOne({_id: req.session.user_id})
				.then(user => res.json(user))
				.catch(err => res.status(500).json(err))
		} else {
			res.json(false)
		}
	},
	userLogout: (req, res) => {
		console.log("User log off", req.session.user_id)
		req.session.destroy()
		res.json(true)
		
	}
}