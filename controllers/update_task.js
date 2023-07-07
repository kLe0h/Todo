const db = require('../routes/db-config')


const update_task = (req, res) => {
    let id = req.params.id;
    let task = req.body.task;
    let state = req.body.state;

    var form_data = {
        task: task,
        state: state
    }

    db.query(`UPDATE tasks SET ? WHERE id = ${id}`, form_data, function(err, result){
        if(err) {
            req.flash('error', err)
        } else {
            req.flash('success', 'Task edited successfully!');
            res.redirect('/show_todo');
        }
    })

}

module.exports = update_task;