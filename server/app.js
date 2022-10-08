const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookies = require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config();

const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(cookies());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();
router.use('/auth', authRouter);
app.use('/api', router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const http = require('http');
const PORT = 3001;
app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on('listening', () => {
  console.log(`Listening on port ${PORT}`);
});