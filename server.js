const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
// const fetch = require('node-fetch')
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path')

const app = express()

app.use(cors())
app.use(morgan("coins"))

app.use(express.static(path.join(__dirname,'frontend')))




app.get("/coins", (req, res) => {
  const url = "https://api.coinranking.com/v2/coins";
  
  (async () => {
    try {
      await fetch(`${url}`, {
        headers: { "x-access-token": `${process.env.COIN_RANKING_API_KEY}` }
      }).then((response) => response.json())
        .then((json) => {
          console.log(json)
          res.json(json)
        })
    } catch (error) {
      console.log(error)
    }
  })()
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'frontend/tables.html'))
})

app.get('/dashboard', (req, res) => {
  // res.send('This is ABOUT.')
  res.sendFile(path.join(__dirname,'frontend/tables.html'))
})

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname,'frontend/contact/contact.html'))
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
  })


