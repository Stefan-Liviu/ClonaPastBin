const express = require('express');
const router = express.Router();
const path = require('path');
const connectionDb = require(path.resolve('./database/connectionDb'));

//open the index page
router.get('/', (req, res) => {
    res.render('index') 
});

//buton search
router.get('/searchPage', (req, res) => {

    let search = req.query.search;
    let sql = "SELECT * FROM project WHERE name_project LIKE?";
    connectionDb.query(sql, [search + '%'], (err, rows) => {
        if (err) throw err;
        res.render('searchPage', {
            data:rows
        });
    });
});

//print all the projects
router.get('/listProjects', (req, res) => {

    let sql = "SELECT * FROM  project";
    connectionDb.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('listOfProjects', {
            data: rows 
        });
    });   
});

//show all the text
router.get('/readMore/(:id)', (req, res) => {

    let sql = "SELECT * FROM project WHERE id=?";
    connectionDb.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        res.render('readMore', {
            data: result[0]
        });
    });
});

//insert data for a project
router.post('/create', (req, res) => {

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
});

//delete a project
router.get('/delete/(:id)', (req, res) => {

    let sql = "DELETE FROM project WHERE id=?";
    connectionDb.query(sql, req.params.id, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });  
});

//edit a project
router.get('/edit/(:id)', function(req, res, next){

    let sql = "SELECT * FROM project WHERE id=?";
    connectionDb.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        res.render('edit', {
            data: result[0]
        });
    });
});

//update a project
router.post('/update/(:id)',(req, res) => {

    let time = new Date().toLocaleString();
    let id = req.params.id;
    let sql = "UPDATE project SET ?  WHERE id = ?";

    connectionDb.query(sql,[{name_project:req.body.projectName, text_project:req.body.textProject,syntax_highlighting:req.body.syntaxHighlighting, date_project:time}, id], (err, results) => {
      if(err) throw err;
      
      res.redirect('/');
    });
});


module.exports = router;