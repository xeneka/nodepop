/**
 * Created by Antonio on 4/5/16.
 */

'use strict';
let mongoose = require('mongoose');

let pushTokenSchema = mongoose.Schema({
    plataforma:
        {type: String, enum: ['ios', 'android']},
        token: String,
        usuario: String
});

pushTokenSchema.statics.saveToken = function(data, callback){

    return new Promise(function(resolve,reject){

        let tokenN = new token();
        tokenN.plataforma = data.plataforma;
        tokenN.token = data.token;
        tokenN.usuario = data.usuario;

        console.log(token);

        tokenN.save(function (err, user_Saved) {

            if(err){
                if(callback){
                    callback(err);
                    return;
                }
                reject(err);
                return;
            }

            if(callback){
                callback(null, tokenN._id);
                return;
            }

            resolve(tokenN._id);
            return;

        });


    });
};

let token = mongoose.model('Token',pushTokenSchema);


