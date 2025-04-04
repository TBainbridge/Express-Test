//import "/ExpressProj/Express-Test/server guff/loadEnvironment.mjs";
//const express = require ("express");
import express from "express";
//import db from "C:\\ExpressProj\\Express-Test\\server guff\\conn.js"
//const db = require ("C:\\ExpressProj\\Express-Test\\server guff\\conn.js")

const app = express();
const router = express.Router();
app.use(express.static("images"));
app.use(express.static("javascripts"));
app.use(express.static("HTML"));


// if we try to go anywhere that does not have a specific route defined
//go to the index
//any specific route definitions should go before this

router.get("/test", async (req,res) => {
  res.sendFile("test.html", {root: "../testapp/public/HTML"});
})

router.get("/posts", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

router.get('/*', async (req,res) => {
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

export default router;
//module.exports = router;