const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mainRouter = require('./router/main_router');
const userRouter = require('./router/user_router');
const notFoundRouter = require('./router/not_found_router');
const app = express();

//Middlewares 
app.use(express.json()); 
app.use(express.urlencoded({extended : true})); 
app.use(express.static('public'));
//access.log create
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }))

//Routes
app.use('/', mainRouter);
app.use('/users', userRouter);
app.use(notFoundRouter);


app.listen(3000, () => {
    console.log('Server 3000 portunu dinliyor.');
});