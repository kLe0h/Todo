const db = require("../routes/db-config")
const jwt = require("jsonwebtoken");
require("dotenv").config()


const show_todo = (req, res, next) => {
    
    if(!req.cookies.userRegistered){
        return next();
    }
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_TOKEN);
        db.query(`SELECT * FROM tasks WHERE user_id = ${decoded.id}`, (err, rows) => {
            if(err){
                req.flash('error', err)
                res.render('todo_view',{data:''})
            } else {
                res.render('todo_view', {data:rows})
            }
        })
    } catch (e) {
        if(e) return next();
    }


}

module.exports = show_todo;