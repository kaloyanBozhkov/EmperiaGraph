const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./helpers/setupConnection')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/emperia/friends', (req, res) => {
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

app.get('/emperia/connections', (req, res) => {
  connection.query(
    'SELECT * FROM ' + process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS,
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

app.get('/emperia', (req, res) =>
  res.send('Hello, this is the emperia API. Nothing to look at here.')
)

app.post('/emperia/add/friend', (req, res) => {

  console.log(req)
  console.log('LOVE')  

  // get friend data
  const friend = {
    firstName: 'Tisho',
    lastName: 'isDope',
    totalFriends: 400,
    sex: 'Male',
    toJSON: function () {
        return `${this.firstName}, ${this.lastName}, ${this.totalFriends}, ${this.sex}`
    }
  }

  // create insertion query
  connection.query(
    `INSERT INTO 
    ${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS}
    ('firstName, 'lastName, 'totalFriends, 'sex, 'id')
    VALUES (${JSON.stringify(friend)})`,

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

app.listen(3000)
