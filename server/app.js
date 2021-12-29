const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var database

app.get('/', (req,res) => {
    database.collection('turnos').find({}).toArray((err,result) => {
        if (err) throw err 
        res.send(result)
    })
})

app.post('/', (req,res)=>{
    const nombre = req.body.nombre
    const apellido =  req.body.apellido
    const hora =  req.body.hora
    const fecha = req.body.fecha
    const telefono = req.body.telefono
    const descripcion = req.body.descripcion;

    database.collection('turnos').insertOne({
        nombre:nombre,
        apellido:apellido,
        hora:hora,
        fecha:fecha,
        telefono:telefono,
        descripcion:descripcion
    })
})



app.listen(3001, (req,res)=>{
    MongoClient.connect('mongodb://localhost:27017',(error,result)=> {
        if (error) throw error
        database = result.db('db-turnos')
        console.log("coneccion perfecta");
    })
});