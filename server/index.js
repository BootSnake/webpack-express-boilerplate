const express = require('express');
const path = require('path');
const morgan = require('morgan');

const server = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000 || 3000;

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

server.use(express.static(distPath));

server.listen(port, () => console.log(`Server running at localhost:${port}`));
