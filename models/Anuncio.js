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
Esta función no esta pedida inicialmente, pero como podra utilizarse en un futuro la hago para la carga inicial
 */



AnuncioSchema.statics.saveAnuncio = function(data, callback){

    return new Promise(function(resolve,reject){

        let anuncio = new Anuncio();
        anuncio.nombre=data.nombre;
        anuncio.venta=data.venta;
        anuncio.precio = data.precio;
        anuncio.foto=data.foto;

        anuncio.save(function (err, user_Saved) {

            if (err){

                if (callback){
                    callback(err);
                    return

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
        })

    });

}


AnuncioSchema.statics.zapAll = function(){

    Anuncio.remove({},function(err, removed){
        console.log("Entro....",err);

        if(err){
            console.log(err);
            return;
        }

        console.log(removed);
        return;
    });

    
}

let Anuncio = mongoose.model('Anuncio',AnuncioSchema);
