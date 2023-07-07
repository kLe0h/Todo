const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const{username, pass : NPassword, email} = req.body
    if(!username || !NPassword || !email) return res.json({
        status: "error",
        error: "All fields are required"
    });
    else {
        db.query("SELECT email FROM users WHERE email = ?", [email], async(error, result) => {
            if(error) throw error;
            if(result[0]) return res.json({
                status: "error",
                error: "Email has already been registered"
            });
            else {
                const pass = await bcrypt.hash(NPassword, 10);
                db.query("INSERT INTO users SET ?", {username: username, email: email, pass: pass}, (error, results => {
                    if(error) throw error;
                    return res.json({
                        status: "success",
                        success: "User registered successfully!"
                    })
                }))
            }
        })
    }
}

module.exports = register;