const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require(path.resolve('./database/controllerDb'));


//route for search
router.get('/post/searchPost', (req, res) => {
    
    controller.search(req, res);  
});

//print all the projects
router.get('/post/listPosts', (req, res) => {

    controller.printAllPost(req, res);
});

//show all the text
router.get('/post/(:id)/readMore', (req, res) => {

    controller.readMore(req, res);
});

//create a post
router.post('/post/create', (req, res) => {

    controller.insertPost(req, res);
});

//delete a project
router.get('/post/(:id)/delete', (req, res) => {

    controller.deletePost(req, res);
});

//edit a project
router.get('/post/(:id)/edit', (req, res) => {

    controller.editPost(req, res);
});

//update a project
router.post('/post/(:id)/update',(req, res) => {

    controller.updatePost(req, res);
});


module.exports = router;