const express = require ("express");
const  app = express();
const cors = require('cors');
const {MongoClient, ObjectId} = require('mongodb');
const port = process.env.PORT || 5000;


require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ej1lu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run ( ){
    try{
        await client.connect();
        const database = client.db('builderMen');
        const collection  = database.collection('builds');
        // get api 
        app.get('/buildings',async(req,res)=>{
           const  cursor = collection.find({});
           const buildings = await cursor.toArray();
           res.send(buildings)
        });


        // find by id

        app.get('/buildings/:id',async (req,res)=>{
            const  id = req.params.id;
            const query = { _id : ObjectId(id)}
            const building = await collection.findOne(query)
            console.log('load user',id)
            res.send(building)
         });
    }finally{

    }
}

run().catch(console.dir)


app.get('/', (req,res)=>{
    res.send('ssdashdgajsdhg')
});


app.listen(port,()=>{
    console.log('server started')
});