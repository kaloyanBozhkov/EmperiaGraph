const express = require('express')
const connection = require('./helpers/setupConnection')
const cors = require('cors')
const app = express()

app.use(cors())

// enable pre-flight request
app.options('*', cors())

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
  res.send('Hello, this is the emperia API. Nothing to look at here directly.')
)

app.post('/emperia/add/friend', (req, res) => {

  // get friend data
  const friend = req.body

  if (!friend?.firstName || !friend?.lastName || !friend?.totalFriends || !friend?.sex) {
    res.json({ error: 'The provided friend object is invalid, make sure it has firstName, lastName, totalFriends and sex.' })
  }

  const sqlQuery = `INSERT INTO 
  \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS}\`
  (\`firstName\`,\`lastName\`,\`totalFriends\`,\`sex\`)
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


app.post('/emperia/add/connections', (req, res) => {

  // get connections data
  const connections = req.body

  if (!connections?.length) {
    res.json({ error: 'Array of connections must be provided' })
  }

  if (connections.filter(({ source, target }) => !source || !target).length > 0) {
    res.json({ error: 'Array of connections must be made of { source, target } items.' })
  }

  const sqlQuery = `INSERT INTO 
  \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS}\`
  (\`source\`,\`target\`)
  VALUES ${connections.map(({ source, target }) => (`('${source}','${target}')`)).join(' ')}`
  
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

app.post('/emperia/remove/friend', (req, res) => {

  const { friendId = null } = req.body

  if (!friendId || parseInt(friendId) !== friendId) {
    res.json({ error: 'No friend Id provided.' })
  }

  const sqlQuery = `DELETE FROM
  \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS}\`
  WHERE \`source\` = ${friendId} OR \`target\` = ${friendId}
  
  DELETE FROM 
  \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS}\`
  WHERE \`id\` = ${friendId}`
  
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


app.post('/emperia/remove/connections', (req, res) => {

  const connections = req.body

  if (!connections?.length) {
    res.json({ error: 'Array of connections must be provided' })
  }

  if (connections.filter(({ source, target }) => !source || !target).length > 0) {
    res.json({ error: 'Array of connections must be made of { source, target } items.' })
  }

  const sqlQuery = `DELETE FROM
  \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS}\`
  WHERE \`source\` IN (${connections.map(({ source }) => source).join(',')}) 
  AND \`target\` IN (${connections.map(({ target }) => target).join(',')})`
  
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

