const db = require("../routes/db-config");

const borrar = (req, res) => {
    let id = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ' + id, function(err, result) {
        if(err) {
            req.flash('error', err)
            res.redirect('/show_todo')
        } else {
            req.flash('success', 'Task deleted successfully')
            res.redirect('/show_todo')
        }
    })
}

module.exports = borrar;