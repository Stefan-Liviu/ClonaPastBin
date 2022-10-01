const express = require('express');
const bodyparser = require('body-parser');
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use('/', indexRouter);
app.use('/', postRouter);

app.listen(port, () => {
    console.log('App listening on port', port);
})
