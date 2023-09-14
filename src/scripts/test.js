const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const {ggs2} = require('./postcode')
const  {ggs3} = require('./name_town')
const  {ggs4} = require('./postcode_address')

const app = express()
const port = 9999

// app.use(bodyParser.json());
let numberOfCalls = 0
app.use(cors())

app.get('/postcode',(req,res) => {
    
    numberOfCalls = numberOfCalls+1
    console.log(numberOfCalls);
    console.log('postcode scraping');
    const postcode = req.query.postcode
    ggs2(postcode).then(result =>{
        const newData = result.map((obj, index) => {
            obj.occupants = JSON.stringify(obj.occupants)
            return { ...obj, id: index + 1 };
          });
        console.log(newData);
        res.send(newData)
    })
})

app.get('/town',(req,res) => {
    numberOfCalls = numberOfCalls+1
    console.log(numberOfCalls);
    console.log('address scraping');
    const firstName = req.query.firstName
    const lastName = req.query.lastName
    const tn = req.query.town
    ggs3(firstName, lastName, tn).then(result => {
        const newData = result.map((obj, index) => {
            obj.occupants = JSON.stringify(obj.occupants)
            return { ...obj, id: index + 1 };
          });
        console.log(newData);
        res.send(newData);
    })
})

app.get('/name'),(req,res) =>{
    numberOfCalls = numberOfCalls+1
    console.log(numberOfCalls);
    console.log('address scraping');
    const firstName = 'Leigh'
    const lastName = 'Duncan'
    const tn = 'ELLON'
    ggs3(firstName, lastName, tn).then(result => {
        console.log(result);
        res.send(result);
    })
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})