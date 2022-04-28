const express = require('express')
const router = express.Router()

// All the routes used for the user only
// We don't need to specify /users before because we specified it in server.js using app.use

router.get('/', (req, res) => {
    /* If url looks like /users?name=Stefan&test=Lol*/
    console.log(req.query.name) // Stefan
    console.log(req.query.test) // Lol
    res.send('User list')
})

router.get('/new', (req, res) => {
    res.render("users/new")
})

router.post('/', (req, res) => {
    const isValid = false
    if(isValid) {
        users.push({firstName: req.body.firstName})
        res.redirect(`/users/${users.length-1}`)
    } else {
        console.log("Error")
        res.render('users/new', {firstName: req.body.firstName})
    }
})

// Allow us to combine multiple actions for a same route (like here for my /id)
router.route('/:id')
    .get((req, res) => {
        let id = req.params.id
        console.log(req.user)
        res.send(`get user with id ${id}`)
    })
    .put((req, res) => {
        let id = req.params.id
        res.send(`update user with id ${id}`)
    })
    .delete((req, res) => {
        res.send(`update user with id ${req.params.id}`)
    })

const users = [{
    name: "Stefan",
}, {
    name: "Victor"
}]

// Allow to pass the users to the handles and access their data (here name)
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})


module.exports = router