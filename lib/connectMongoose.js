/**
 * Created by Antonio on 3/5/16.
 */
'use strict';

var mongoose = require("mongoose");

var conn = mongoose.connection;

// Handles de events de conexion

conn.on('error', console.log.bind(console, 'Connection error'));

conn.once('open',function(){
    console.log('Connected to mongodb');
})

// Conectar a la base de datos

mongoose.connect('mongodb://localhost:27017/nodepop');