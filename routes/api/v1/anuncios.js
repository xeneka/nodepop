/**
 * Created by Antonio on 4/5/16.
 */
'use strict';

let express = require('express');
let router = express.Router();

let mongoose =require('mongoose');
let Anuncio = mongoose.model('Anuncio');


var jwtAuth = require('../../../lib/jwtAuth');


router.use(jwtAuth());


router.get('/', function(req, res, next){

    let name =req.query.name;
    let tag = req.query.tag;
    let tipoanuncio = req.query.tipoanuncio;
    let precio = req.query.precio;
    let start = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.limit) || null;
    let sort = req.query.sort || null;

    console.log(req.query);


    var criteria ={};
    if (typeof name !== "undefined"){

        criteria.nombre = {$regex : "^" + name};
    }

    if (typeof tag !== "undefined"){
        criteria.tags = tag;
    }

    if (typeof tipoanuncio !== "undefined"){

        /*
        Pongo los dos if en lugar de un else o un switch por que si en el tipo de anuncio ponen algo distinto a compra o venta se obviara y mostrará todo
         */


        if (tipoanuncio === "venta"){
            criteria.venta = true;
        }

        if (tipoanuncio === "compra"){
            criteria.venta = false;
        }


    }


    /*
    Rango de precios. Se pueden establecer un rango preciomin y preciomax con los valores o puede darsele
    sólo valor a uno de ello por eso verificaremos cuantos valores estan definidos y así configurar el criterio de selección
     */

    if (typeof precio !== "undefined" ){

;        let rangeprecio = precio.split("-");
        console.log(rangeprecio);
        console.log(rangeprecio.length);

        if (rangeprecio.length === 1){
            criteria.precio = precio;
        }else{
            if (rangeprecio[0] !== '' & rangeprecio[1] === ''){
                criteria.precio={'$gte':rangeprecio[0]};
            }
            if (rangeprecio[1] !== '' & rangeprecio[0] === ''){
                criteria.precio={'$lte':rangeprecio[1]};
            }
            if (rangeprecio[1] !== '' & rangeprecio[0] !== ''){
                criteria.precio={'$gte':rangeprecio[0],'$lte':rangeprecio[1]};
            }


        }



    }





    Anuncio.list(criteria, start, limit, sort,function(err, rows) {

        if (err){
            return res.json({success:false , err:err});
        }

        res.json({success:true, rows:rows});

    });




});


router.get('/tag', function(req, res, next){
   Anuncio.listTag(function(err, rows){
       if (err){
           return res.json({success:false , err:err});
       }

       res.json({success:true, rows:rows});
   })

});

module.exports = router;


