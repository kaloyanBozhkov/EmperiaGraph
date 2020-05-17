const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./helpers/setupConnection')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/emperia/friends', (req, res) => {
  console.log('Request:', req.body)
  connection.query(
    'SELECT * FROM ' + process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS,
    (err, results, fields) => {
      if (err) {
        res.json(err)
      } else {
        res.json({
          results,
          fields,
        })
      }
    }
  )
})

app.get('/emperia', (req, res) => res.send('Hello World'))

// app.listen(3000)

module.exports = app
