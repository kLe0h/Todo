const db = require("../routes/db-config")
const jwt = require("jsonwebtoken");
require("dotenv").config()

const add = (req, res, next) => {
    const task = req.body.task
    const state = 0

    if(!req.cookies.userRegistered){
        return next();
    }
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_TOKEN);
        db.query("INSERT INTO tasks SET ?", {user_id:decoded.id, task: task, state: state}, (err, result) => {
            if(err) throw err;
            req.flash('success!', 'task added successfully!')
            res.redirect('/show_todo');

        })
    } catch (e) {
        if(e) return next();
    }


}



module.exports = add;