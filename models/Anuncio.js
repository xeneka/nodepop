/**
 * Created by Antonio on 3/5/16.
 */
'use strict';
let mongoose = require('mongoose');

let AnuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        index:true
    },
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
    
});


/*
Guarda un anuncio, se le pasa un json cn los datos del anuncio nombre, venta, precio y nombre de la foto
Se puede utilizar tanto como promesa como callback
 */


AnuncioSchema.statics.saveAnuncio = function(data, callback){

    return new Promise(function(resolve,reject){

        let anuncio = new Anuncio();
        anuncio.nombre=data.nombre;
        anuncio.venta=data.venta;
        anuncio.precio = data.precio;
        anuncio.foto=data.foto;
        anuncio.tags=data.tags;

        anuncio.save(function (err, user_Saved) {

            if (err){

                if (callback){
                    callback(err);
                    return;

                }

                reject(err);
                return;

            }

            if (callback){
                callback(null, anuncio._id);
                return;
            }

            resolve(anuncio._id);
            return;
        });

    });

};


/*
Función que borra todos los ancuncios
 */

AnuncioSchema.statics.zapAll = function(){

    Anuncio.remove({},function(err, removed){
      

        if(err){
            console.log(err);
            return;
        }

        console.log(removed);
        return;
    });

    
};

/* 
Función listado de los anuncios
*/

AnuncioSchema.statics.list = function(filter, start, limit,sort,callback){

    let query =  Anuncio.find(filter);
    console.log(filter);
    query.skip(start);
    query.limit(limit);
    query.sort(sort);
    return query.exec(callback);
};

AnuncioSchema.statics.listTag = function(callback){

    return new Promise(function (resolve, reject){


    let query = Anuncio.find().distinct('tags',function(err, results){

        if(err){
            if(callback){
                callback(err);
                return;
            }
            reject(err);
        }
        if(callback){
            callback(null, results);
            return;
        }

        resolve(results);

    });

    });

};



let Anuncio = mongoose.model('Anuncio',AnuncioSchema);
