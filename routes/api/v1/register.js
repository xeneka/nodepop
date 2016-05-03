/**
 * Created by Antonio on 2/5/16.
 */
'use strict';


var express = require('express');
var router = express.Router();

var mongoose =require('mongoose');
var User = mongoose.model('User');

router.post('/:name/:mail/:pass', function(req, res, next){

    /*
    Uso la función de guardar usuario como una promesa
     */

    User.saveUser(req.params).then(function(data){
       res.json({success:true, payload:data});
    }).catch(function(err){
        res.json({success:false, payload:err});
    });


});

router.post('/', function(req,res,next){
    let user = req.query.name || req.body.name;
    let email = req.query.mail || req.body.mail;
    let pass = req.query.pass || req.body.pass;

    /*
     Uso la función de guardar usuario como un callback
     */

    User.saveUser({name:user,mail:email,pass:pass}, function(err,data){

        if(err){
            res.json({success:false, payload:err});
            return;
        }

        res.json({success:true, payload:data});
        return;


    })


});

module.exports = router;

