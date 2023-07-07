const logged_out = (req, res) => {
    res.clearCookie("userRegistered");
    res.redirect("/");
}

module.exports = logged_out;