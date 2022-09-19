const express = require('express');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const indexRouter = require('./routes/index');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(flash());

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use('/', indexRouter);

app.listen(port, () => {
    console.log('App listening on port', port);
})