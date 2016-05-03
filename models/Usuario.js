/**
 * Created by Antonio on 2/5/16.
 */
'use strict';
let mongoose = require('mongoose');
let sha = require('sha256');


/* Esquema Básico de usuario */

let userSchema = mongoose.Schema({
   name:{
       type: String,
       required: true,
       index:true

   },

    email:{
        type: String,
        required: true,
        index:true
    },
    
    pass:{
        type: String,
        required: true

    }
});


/* Función para insertar un nuevo usuario en la base de datos
Debe comprobar si existe y si no existe darlo de alta y si existe dar el error

La función da la facilidad de llamarla bien con promesa o bien con callback

 */

userSchema.statics.saveUser = function(newUser,callback){

return new Promise(function(resolve,reject){


        let nUser = new User();
        nUser.name = newUser.name;
        nUser.email = newUser.mail;
        nUser.pass = sha(newUser.pass);


        nUser.save(function (err, user_Saved) {
            if (err) {
                if (callback){
                    callback(err);
                    return;
                }
                reject(err);
                return;
            }
            if (callback){
                callback(null,nUser._id );
                return;
            }
            resolve(nUser._id);
            return;
        });



    });
}

let User = mongoose.model('User',userSchema);



