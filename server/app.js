const express = require('express')
const connection = require('./helpers/setupConnection')
const cors = require('cors')
const app = express()

app.use(cors())

// create application/json parser & use middleware
app.use(express.json())

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

  // get friend data
  const friend = req.body

  const sqlQuery = `INSERT INTO 
  ${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS}
  ('firstName','lastName', 'totalFriends', 'sex', 'id')
  VALUES ('${friend.firstName}', '${friend.lastName}', '${friend.totalFriends}', '${friend.sex}')`
  
  // create insertion query
  connection.query(
    sqlQuery,
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

