/**
 * Created by Antonio on 4/5/16.
 */
'use strict';
let express = require('express');
let router = express.Router();

let mongoose =require('mongoose');
let Token = mongoose.model('Token');

router.post('/:plataforma/:token/:usuario', function(req, res, next){

    

    Token.saveToken(req.params).then(function(data){
        res.json({success:true, payload:data});
    }).catch(function(err){
        res.json({success:false, payload:err});
    });


});
module.exports = router;