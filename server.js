const express = require('express')
const app = express()

// To call the logger globally
//app.use(logger)
app.set('view engine', 'ejs')
// Allow use to call static file, now if we go to url/test/tt.html, it will display it (had to be inside public ofc)
app.use(express.static('public'))
// Allow us to access the body from a put
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// Normal GET call + we add logger to run on this specific route
/*
app.get('/', logger, (req, res) => {
    res.render('index', {text: "world"})
})
*/

// reference to the user file that defines all the routes for users
const userRouter = require('./routes/users')
// by defining /users, we no longer need it inside users.js
app.use('/users', userRouter)

// Middleware, he works in between the request and the responses, here it gets the url then
// by calling next we let the app run normally
// An app works from top to bottom, so if we call logger at the bottom, no url will be shown
// We can also use it on specific page by calling it as a parameter (just like it's done on app.get)
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(3000)