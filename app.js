const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const {Pool} = require('pg');
const http = require("http");
const socket = require("socket.io");

//todo: Add a config file
const pool = new Pool({
  user: ,
  host: ,
  database: ,
  password: ,
  port: ,
  ssl:
})

/*const pool = new Pool({
  user: 'morgancourvoisier',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
  database: 'chatapp'
})*/

//Workaround for Heroku deployment, Revisit this. 
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const port = process.env.PORT || 8000;


var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './frontend/build')))


//Functions for Heroku build
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})



//Add error handlers to all of these.
app.post('/login_request', async function(req, res) {
  //Checks database for whether account exists and return true/false
  const query = await pool.query("select true from login where email = $1 and password = $2", [req.body.email, req.body.password]);
  if(await query.rows.length == 1)
    return await res.send(true);
  return await res.send(false);

});

app.post('/get_rooms', async function(req, res) {
  const query = await pool.query("select room_id from room_auth where email = $1", [req.body.key])
  console.log(query.rows);
  return await res.send(query.rows);

});

app.post('/delete_room', async function(req, res) {
  await pool.query("delete from room_auth where email = $1 and room_id = $2", [req.body.email, req.body.key]);
});

app.post('/add_room', async function(req, res) {
  await pool.query("insert into room_auth (room_id, email) values ($1, $2)", [req.body.key, req.body.email]);
});

app.post('/send_history', async function(req, res) {
  await pool.query("insert into history (room_id, message, username) values ($1, $2, $3)", [req.body.key, req.body.message, req.body.username]);
  return await true;
});

app.post('/fetch_history', async function(req, res) {
  const query = await pool.query("select * from history where room_id = $1 order by message_id asc", [req.body.key]);
  return await res.send(query.rows);
});

app.post('/signup_request', async function(req, res) {
  const check_email = await pool.query("select exists(select 1 from login where email = $1)", [req.body.email])
  if(await check_email.rows[0].exists == true) 
    return res.send(false)
  const query = await pool.query("insert into login (email, password) values ($1, $2)", [req.body.email, req.body.password]);
  return await res.send(true);
});


//Server
const server = http.createServer(app);
const io = socket(server);


// Listen for incoming connections
io.on("connection", (socket) => {
  console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })

});


server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;















