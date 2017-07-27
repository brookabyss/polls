const path = require("path")
const users = require ('../controllers/users')
const polls = require ('../controllers/polls')

// const users = require("./../controllers/users.js")

module.exports = (app) => {
    app.post('/login', (req, res) => {
        console.log('login Route hit!', req.body.name)
        users.login(req, res)
    })
    app.get('/get_users', (req, res) => {
        console.log('getUsersRoute hit!')
        users.getUsers(req, res)
    })

    app.get('/get_logged_in_user', (req, res) => {
        console.log('logged in user hit!')
        users.get_logged_in_user(req, res)
    })
    

    app.post('/create_poll', (req, res) => {
        console.log('new_poll Route hit!')
        polls.create(req, res)
    })
    app.get('/get_polls', (req, res) => {
        console.log('getPollsRoute hit!')
       polls.getPolls(req, res)
    })
    app.post('/getPoll', (req, res) => {
        console.log('getPollRoute hit!')
       polls.getPoll(req, res)
    })
    app.post('/updatePoll', (req, res) => {
        console.log('UpdatePollRoute hit!')
        polls.updatePoll(req, res)
    })
    
    app.post('/deletePoll', (req, res) => {
        console.log('deletePollRoute hit!')
        polls.deletePoll(req, res)
    })

    app.get("/user/logout", (req, res) => {
        console.log('logoutRoute hit!')
       users.userLogout(req, res)
    })



	
	app.get("*", (req, res) => {
		res.sendFile(path.resolve("./client/dist/index.html"))
    })
    
    

}