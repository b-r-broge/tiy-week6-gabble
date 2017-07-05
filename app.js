'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const path = require('path');
const session = require('express-session');

const pubRoutes = require('./routes/pub');
const userRoutes = require('./routes/users');
// const createRoutes = require('./routes/create');
// const readRoutes = require('./routes/read');
// const updateRoutes = require('./routes/update');
// const deleteRoutes = require('./routes/delete');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.engine('mustache', mustache());
app.set('view engine', 'mustache')
app.set('views', './views')
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'this is very secret',
  resave: false,
  saveUninitialized: false
}));

app.use(pubRoutes);
app.use(userRoutes);
// app.use(createRoutes);
// app.use(readRoutes);
// app.use(updateRoutes);
// app.use(deleteRoutes);

app.listen(3000, function() {
  console.log('visit http://localhost:3000/gobble');
})
