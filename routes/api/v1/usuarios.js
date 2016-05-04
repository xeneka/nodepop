/**
 * Created by Antonio on 2/5/16.
 */
'use strict';


let express = require('express');
let router = express.Router();

let mongoose =require('mongoose');
let User = mongoose.model('User');

var jwt = require('jsonwebtoken');
var config = require('../../../local_config');


router.post('/register/:name/:mail/:pass', function(req, res, next){

    /*
    Uso la función de guardar usuario como una promesa
     */

    User.saveUser(req.params).then(function(data){
       res.json({success:true, payload:data});
    }).catch(function(err){
        res.json({success:false, payload:err});
    });


});

router.post('/register', function(req,res,next){
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

router.post('/authenticate', function(req, res, next) {

    var user = req.body.user;
    var pass = req.body.pass;

    User.findOne({name: user}).exec(function (err, user) {

        if (err) {
            return res.status(500).json({success: false, error: err});
        }

        if (!user) {
            return res.status(401).json({success: false, error: "Auth failed. User not found"});
        }

        if (user.pass !== pass) {
            return res.status(401).json({success: false, error: "Auth failed. Invalid password"});
        }

        // Creamos el token por que el usuario ya es correcto

       
        var token = jwt.sign({id: user._id}, config.jwt.secret, {expiresIn: "2 days"});

        res.json({sucess: true, token: token});

    });

});

module.exports = router;
