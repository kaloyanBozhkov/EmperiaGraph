const express = require('express')
const connection = require('./helpers/setupConnection')
const cors = require('cors')
const formatEdges = require('./helpers/formatEdges')
const formatFriends = require('./helpers/formatFriends')
const sendIP = require('./middleware/sendIP')

const app = express()

app.use(cors())
// create application/json parser & use middleware
app.use(express.json())

app.use(sendIP)

// get friends
app.get('/api/emperia/friends', (req, res) => {
  try {
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
  } catch (error) {
    res.json({ error: error.message })
  }
})


// get connections
app.get('/api/emperia/connections', (req, res) => {
  try {
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
  } catch (error) {
    res.json({ error: error.message })
  }
})

// get friends and connections
app.get('/api/emperia/data', (req, res) => {
  try {
    connection.query(
      `SELECT * FROM ${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS};
         SELECT * FROM ${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS};`,
      (err, results, fields) => {
        if (err) {
          res.json(err)
        } else {

          const [friends, connections] = results
          const formattedConnections = formatEdges(connections, friends)
          const formattedFriends = formatFriends(friends, formattedConnections)

          res.json({
            connections: formattedConnections,
            friends: formattedFriends
          })
        }
      }
    )
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.get('/api/emperia', (req, res) =>
  res.send('Hello, this is the emperia API. Nothing to look at here directly.')
)

// add friend
app.post('/api/emperia/friend', (req, res) => {
  try {

    // get friend data
    const friend = req.body

    if (!friend.firstName || !friend.lastName || !friend.totalFriends || !friend.sex) {
      throw Error('The provided friend object is invalid, make sure it has firstName, lastName, totalFriends and sex.')
    }

    const sqlQuery = `INSERT INTO 
      \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS}\`
      (\`firstName\`,\`lastName\`,\`totalFriends\`,\`sex\`)
      VALUES ('${friend.firstName}', '${friend.lastName}', '${friend.totalFriends}', '${friend.sex}');
      SELECT * from  \`emperia_graph_friends\` WHERE \`id\` = LAST_INSERT_ID()`


    // create insertion query
    connection.query(
      sqlQuery,
      (err, results, fields) => {
        if (err) {
          res.json(err)
        } else {
          const friendData = {
            ...results[1][0],

            // since new friend, connections are empty!
            connections: {
              from: [],
              to: [],
            }
          }

          res.json({
            operation: 'CREATE_FRIEND',
            payload: { friendData } // gotta get friend data from second query due to the need of ID which is AUTO_INCREMET
          })
        }
      }
    )
  } catch (error) {
    res.json({ error: error.message })
  }
})


// update friend
app.put('/api/emperia/friend', (req, res) => {
  try {

    // get friend data
    const friend = req.body

    if (!friend.firstName || !friend.lastName || !friend.totalFriends || !friend.sex || !friend.id) {
      throw Error('The provided friend object is invalid, make sure it has firstName, lastName, totalFriends, sex and ID.')
    }

    const sqlQuery = `UPDATE
      \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS}\`
      SET \`firstName\`='${friend.firstName}',\`lastName\`='${friend.lastName}',\`totalFriends\`='${friend.totalFriends}',\`sex\`='${friend.sex}'
      WHERE \`id\` = ${friend.id}`

    connection.query(
      sqlQuery,
      (err) => {
        if (err) {
          res.json(err)
        } else {
          res.json({
            operation: 'UPDATE_FRIEND',
            payload: { friend }
          })
        }
      }
    )
  } catch (error) {
    res.json({ error: error.message })
  }
})

// add connection
app.post('/api/emperia/connections', (req, res) => {
  try {

    // get connections data
    const { connections = [] } = req.body

    if (!connections.length) {
      throw Error('Array of connections must be provided.')
    }

    if (connections.filter(({ source, target }) => !source || !target).length > 0) {
      throw Error('Array of connections must be made of { source, target } items.')
    }

    const sqlQuery = `INSERT INTO 
      \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS}\`
      (\`source\`,\`target\`)
      VALUES ${connections.map(({ source, target }) => (`('${source}','${target}')`)).join(', ')};

      SELECT * FROM ${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS};
      SELECT * FROM ${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS};`

    // create insertion query
    connection.query(
      sqlQuery,
      (err, results) => {
        if (err) {
          res.json(err)
        } else {

          const [,friends, connections] = results
          const formattedConnections = formatEdges(connections, friends)
          const formattedFriends = formatFriends(friends, formattedConnections)

          res.json({
            operation: 'CREATE_CONNECTIONS',
            payload: {
              connections: formattedConnections,
              friends: formattedFriends
            }
          })
        }
      }
    )
  } catch (error) {
    res.json({ error: error.message })
  }
})

// delete friend
app.delete('/api/emperia/friend', (req, res) => {
  try {

    const { id: friendId = null } = req.body

    if (!friendId || parseInt(friendId) !== friendId) {
      throw Error('No friend Id provided.')
    }

    const sqlQuery = `DELETE FROM
      \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS}\`
      WHERE \`source\` = ${friendId} OR \`target\` = ${friendId};
      
      DELETE FROM 
      \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_FRIENDS}\`
      WHERE \`id\` = ${friendId};`

    // create insertion query
    connection.query(
      sqlQuery,
      (err) => {
        if (err) {
          res.json(err)
        } else {
          res.json({ operation: 'DELETE_FRIEND', payload: { friendId } })
        }
      }
    )
  } catch (error) {
    res.json({ error: error.message })
  }
})

// delete connection
app.delete('/api/emperia/connections', (req, res) => {
  try {

    const { connectionIds = [] } = req.body

    if (!connectionIds.length) {
      throw Error('Array of connection ids must be provided')
    }

    if (connectionIds.filter((id) => typeof id !== 'number').length > 0) {
      throw Error('Array of connections must be made of numbers.')
    }

    const sqlQuery = `DELETE FROM
      \`${process.env.REACT_APP_EMPERIA_GRAPH_TABLE_CONNECTIONS}\`
      WHERE \`id\` IN (${connectionIds.join(',')});`

      // create insertion query
    connection.query(
      sqlQuery,
      (err) => {
        if (err) {
          res.json(err)
        } else {
          res.json({ operation: 'DELETE_CONNECTIONS', payload: { connectionIds } })
        }
      }
    )
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.listen(3000)

