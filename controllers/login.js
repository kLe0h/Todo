const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req,res) => {
    //this could be use ONLY if values aren't IDs.
    const {username, email, pass} = req.body
    if(!username || !email || !pass) return res.json(
        {
            status: "error",
            error: "All fields are required"
        }
    )
    else {
        db.query("SELECT * FROM users WHERE email = ?", [email], async(error, result) => {
            if(error) throw error;
            if(!result.length || !await bcrypt.compare(pass, result[0].pass)) return res.json({
                status: "error",
                error: "Incorrect password, email or user."
            })
            else{
                const token = jwt.sign({id: result[0].id}, process.env.JWT_TOKEN, {expiresIn: process.env.JWT_EXPIRES})
                const cookieOptions = {
                    expiresIn: new Date(
                        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true,
                };
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({
                    status: "success",
                    success: "You've logged in!"
                });
            }
        })
    } 
}

module.exports = login;