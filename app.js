const express = require('express');
const bodyparser = require('body-parser');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use('/', indexRouter);
app.use('/', userRouter);

app.listen(port, () => {
    console.log('App listening on port', port);
})
