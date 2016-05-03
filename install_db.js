/**
 * Created by Antonio on 3/5/16.
 */
'use strict';

// Leo el fichero de configuración inicial

let conn = require('./lib/connectMongoose');
let mongoose = require('mongoose');
let AnuncioModel = require('./models/Anuncio');
let Anuncio = mongoose.model('Anuncio');


console.log("Borrando datos de la Base de datos");
Anuncio.zapAll();


console.log("Cargando la base de datos de los Anuncios");

let fs = require('fs');

fs.readFile('./anuncios.json', 'utf8', function(err,data){

    if(err){

        console.log("Error al abrir el fichero", err);

        return;
    }

    let datos = JSON.parse(data);


    datos.anuncios.forEach(function(row){
       
        Anuncio.saveAnuncio(row).then(function(data){
            console.log(data);
        }).catch(function(err){
            console.log(err);
        });

        

    });


});
