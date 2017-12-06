const express = require('express');
const http = require('http');
const ws = require('./server/ws');
const router = require('./server');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
require('./config/global');

const app = express();

app.use(bodyParser.json({
  limit: '300kb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(compress());

app.use(express.static(process.env.NODE_ENV==='development'? './static': './dist'));

router(app);

const server = http.createServer(app);
// init ws
ws(server);
