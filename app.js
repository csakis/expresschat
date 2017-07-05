var express = require('express')
var app = express()
var rooms = require('./data/rooms.json')
var bodyParser = require("body-parser")
var router = express.Router();

app.set('views', './views')
app.set('view engine', 'jade')

app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function (req, res) {
  res.render('index', {title: 'Home'})
})

var adminRouter = require('./admin')
app.use("/admin", adminRouter);

app.listen(3000, function () {
  console.log('Chat app listening on port 3000!')
})