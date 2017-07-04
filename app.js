/**
 * Created by csaba on 7/4/17.
 */
var express = require('express');
var app = express();
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));

app.get("/", function (req, res) {
    res.send("Hello world");
});
app.listen(3000, function () {
    console.log("server started on port 3000.");
});
// app.use();

