const mysql = require('mysql')
const REACT_APP_USERNAME = process.env.mysql_username
const REACT_APP_PASSWORD = process.env.mysql_password
const REACT_APP_HOST = process.env.mysql_host
const REACT_APP_DATABASE = process.env.mysql_database

const connection = mysql.createPool({
  host: REACT_APP_HOST,
  user: REACT_APP_USERNAME,
  password: REACT_APP_PASSWORD,
  database: REACT_APP_DATABASE,
})

module.exports = connection
