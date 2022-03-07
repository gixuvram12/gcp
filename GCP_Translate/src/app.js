const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./services/routers');
const methodOverride = require('method-override');
require('dotenv').config()
require( './services/firebase/firebase-admin-service');
const morganConfig = require('./config/morgan-config');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

//Body Parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(morgan(morganConfig));

(router)(app);

app.listen(PORT, () => {
  console.log(`GCP server running at ${PORT}`)
})

module.exports = app;