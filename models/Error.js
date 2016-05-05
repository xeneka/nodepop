/**
 * Created by Antonio on 5/5/16.
 */
'use strict';

let fs = require('fs');

var errorSkin = function(idioma){
    



    var content=fs.readFileSync('./error_'+idioma+'.json');

    
        let datos = JSON.parse(content);

        let result=[];
        for(var i in datos){
            result[i]=datos[i];

        }


        return result;

        

    
};



module.exports.errorSkin = errorSkin;



