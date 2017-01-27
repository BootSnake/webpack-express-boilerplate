const express = require('express');
const path = require('path');
const morgan = require('morgan');

const server = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;

server.use(express.static('dist'));

server.listen(port, () => console.log(`Server running at localhost:${port}`));
