const express = require('express');
const routes = require('./api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//set up express app
const app = express();

//connect to mongo DB
mongoose.connect('mongodb://localhost/phonebook', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    });


//ask why--------------------------------------------------
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', routes);

app.use(function(err, req, res, next){
    res.status(422).send({error: err })
    //console.log(err);
});

//listen for request 
app.listen(4000, function(){
    console.log("now listening for request");
});