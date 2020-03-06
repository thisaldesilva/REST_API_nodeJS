const express = require('express');
const router = express.Router();
const Contact = require('./models/contact');

var allData = []; 
var mapData = new Map();

router.get('/contacts/:id', function (req, res) {
    console.log("inside this function")
    Contact.findById(req.params.id).then(function(contact){
        res.send(contact);
    })

 })

//GET
router.get('/contacts', function(req, res, next){

    if(mapData.size < 1){
        Contact.find({}).then(function(contacts){
            contacts.forEach((contact)=>{
                mapData.set(contact.id, contact);
                console.log( contact)
            })
            console.log("Coming From here")
            res.send(contacts);
        });
    }
    else{
        console.log("Coming From there")
        Contact.find({}).then(function(contacts){
            res.send(contacts)});

    }

    
    // Contact.geoNear(
    //     {type: 'point',
    //     coordinates: [parseFloat(req.query.lag), parseFloat(req.query.lat)]},
    //     {maxDistance: 100000, spherical: true}        
    // ).then(function(contacts){
    //     res.send(contacts);
    // });
});

//POST
//Add new
router.post('/contacts', function(req, res, next){

    Contact.create(req.body).then(function(contact){
        res.send(contact);
    }).catch(next);
    
});


//UPDATE
router.put('/contacts/:id', function(req, res, next){
    Contact.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Contact.findOne({_id: req.params.id}).then(function(contact){
            res.send(contact)
        })
    })
});

//DELETE
router.delete('/contacts/:id', function(req, res, next){
    Contact.findByIdAndRemove({_id: req.params.id}).then(
        function(contact){
            res.send(contact);
        }
    )
});


module.exports = router;