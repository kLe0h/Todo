const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const logged_in = (req, res, next) => {
    if(!req.cookies.userRegistered){
        return next();
    }
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_TOKEN);
        db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            return next();
        })
    } catch (e) {
        if(e) return next();
    }
};

module.exports = logged_in;