const express = require("express");
const router = express.Router();
const logged_in = require("../controllers/logged_in");
const logged_out = require("../controllers/logged_out");
const show_todo = require("../controllers/show_todo");
const update_task = require("../controllers/update_task");
const borrar = require("../controllers/delete");
const add = require("../controllers/add");

router.get("/", logged_in, (req, res) => {
    if(req.user){
        res.render("index", {status:"loggedIn", user: req.user});
    } else {
        res.render("index", {status: "loggedOut", user: "no"});
    }
})

router.get("/show_todo", show_todo)

router.post("/add", add)

router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./public/html/" });
  });
  
router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./public/html/" });
  });

router.get("/logout", logged_out);

router.get('/delete/:id', borrar);

router.post('/update_task/:id', update_task);



module.exports = router;