const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfgke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
client.connect(err => {
  const servicecollotion = client.db("creative-agency").collection("service");
  console.log(err);
  app.post('/servicecollotion' , (req,res) => {
      const service = req.body;
      servicecollotion.insertOne(service)
      .then(result => {
          res.send(result)
      })
  })
});
client.connect(err => {
  const massages = client.db("creative-agency").collection("service");
  console.log(err);
  app.post('/massages' , (req,res) => {
      const massage = req.body;
      massages.insertOne(massage)
      .then(result => {
          res.send(result)
      })
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)