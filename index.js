const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors");


app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://AFCUSER:kNxxeFz0R86oSSBg@cluster0.lhxiv4t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async()=>{
try{
    const foodsCollection = client.db("foodsDB").collection('foods')
    const messageCollection = client.db("foodsDB").collection('messages')


    // const docs = [
    //     { name: "cake", healthy: false },
    //     { name: "lettuce", healthy: true },
    //     { name: "donut", healthy: false }
    //   ];
    //   const options = { ordered: true };
    //   const result = await foodsCollection.insertMany(docs, options);
    //   console.log('data inserted');

    app.get('/foods', async(req, res)=>{
        const query= {}

        const foods = await foodsCollection.find(query).toArray()
        res.send(foods)
    })

    app.post('/message', async(req, res)=>{
      const message = req.body
      console.log(message)
      const result = await messageCollection.insertOne(message)
      res.send(result)

    })
     

}finally{

}
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// AFCUSER
// kNxxeFz0R86oSSBg