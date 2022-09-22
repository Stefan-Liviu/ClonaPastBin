const connectionDb = require('./connectionDb');

function insertPost(req, res) {
    let data = req.body;
    let sql = "INSERT INTO project (id, name_project, text_project, syntax_highlighting, date_project) VALUES ?";
    let time = new Date().toLocaleString();
    let values = [
       [0, data.projectName, data.textProject, data.syntaxHighlighting, time]
   ];
    connectionDb.query(sql, [values], (err) => {
       if (err) throw err;
       console.log('Data inserted into project');
    });
    res.redirect('/');
};


function printAllPost(req, res) {
    res = res;
    let sql = "SELECT * FROM  project";
    connectionDb.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('listOfProjects', {
            data: rows 
        });
    });   
};

function readMore(req, res) {
    res = res;
    let sql = "SELECT * FROM project WHERE id=?";
    connectionDb.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        res.render('readMore', {
            data: result[0]
        });
    });
};

function deletePost(req, res) {
    let sql = "DELETE FROM project WHERE id=?";
    connectionDb.query(sql, req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.redirect('../listPosts');
        }
    });  
};

function editPost(req, res) {

    let sql = "SELECT * FROM project WHERE id=?";
    connectionDb.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        res.render('edit', {
            data: result[0]
        });
    });
};

function updatePost(req, res) {

    let time = new Date().toLocaleString();
    let id = req.params.id;
    let sql = "UPDATE project SET ?  WHERE id = ?";

    connectionDb.query(sql,[{name_project:req.body.projectName, text_project:req.body.textProject,syntax_highlighting:req.body.syntaxHighlighting, date_project:time}, id], (err, results) => {
      if(err) throw err;
      
      res.redirect('../listPosts');
    });
};

function search(req, res) {

    let search = req.query.search;
    let sql = "SELECT * FROM project WHERE name_project LIKE?";
    connectionDb.query(sql, [search + '%'], (err, rows) => {
        if (err) throw err;
        res.render('search', {
            data:rows
        });
    });
};

module.exports = {insertPost, printAllPost, readMore, deletePost, editPost, updatePost, search};