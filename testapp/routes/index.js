var express = require('express');
const app = express();
var router = express.Router();
app.use(express.static("images"));
app.use(express.static("javascripts"));
app.use(express.static("HTML"));


// if we try to go anywhere that does not have a specific route defined
//go to the index
//any specific route definitions should go before this

router.get("/test", (req,res) => {
  res.sendFile("test.html", {root: "../testapp/public/HTML"});
})

router.get('/*', (req,res) => {
  res.sendFile("index.html", {root: "../testapp/public/HTML" });
})






/* GET home page. */
/*
router.get('/', function(req,res, next) {
  res.render('index',{title:"test"});
});

router.get("/", function(req,res, next) {
  res.render('index',{testVar:"hello world"});
});
*/


module.exports = router;
