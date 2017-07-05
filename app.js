var express = require('express')
var app = express()
var rooms = require('./data/rooms.json')
var bodyParser = require("body-parser")
var uuid = require("uuid")
var _  = require("lodash")

app.set('views', './views')
app.set('view engine', 'jade')

app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function (req, res) {
  res.render('index', {title: 'Home'})
})

app.get('/admin/rooms', function (req, res) {
  res.render('rooms', {
    title: 'Admin Rooms',
    rooms: rooms
  })
})

app.get('/admin/rooms/add', function (req, res) {
  res.render('add')
})

app.post('/admin/rooms/add', function (req, res) {
  var room = {
    name: req.body.name,
    id: uuid.v4()
  }
  rooms.push(room)
  res.redirect("/admin/rooms")
})

app.post('/admin/rooms/edit/:id', function (req, res) {
  var roomId = req.params.id
  room = _.find(rooms, r=> r.id === roomId);
  if(!room) {
    res.sendStatus(404)
    return;
  }
  room.name = req.body.name;
  res.redirect("/admin/rooms")
})

app.get('/admin/rooms/delete/:id', function (req, res) {
  var roomId=req.params.id
  rooms = rooms.filter(function(r) { return (r.id != roomId);})
  res.redirect("/admin/rooms")
})

app.get('/admin/rooms/edit/:id', function (req, res) {
  var roomId=req.params.id
  room = _.find(rooms, r=> r.id === roomId);
  if(!room) {
    res.sendStatus(404)
    return;
  }
  res.render("edit", {room})
})


app.listen(3000, function () {
  console.log('Chat app listening on port 3000!')
})