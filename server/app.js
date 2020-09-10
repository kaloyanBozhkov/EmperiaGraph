const express = require('express')
const connection = require('./helpers/setupConnection')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.bodyParser())

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
  write(JSON.stringify(req))
  write(`INSERT INTO 
  ${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS}
  ('firstName, 'lastName, 'totalFriends, 'sex, 'id')
  VALUES (${JSON.stringify(friend)})`)

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


// Requiring fs module in which 
// writeFile function is defined. 
const fs = require('fs') 
  
// Data which will write in a file. 
  
// Write data in 'Output.txt' . 
const write = (data) => fs.writeFile(`koko-logger-${new Date().toISOString()}.txt`, data, (err) => { 
      
    // In case of a error throw err. 
    if (err) throw err; 
}) 
