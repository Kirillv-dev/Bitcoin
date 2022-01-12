import Logger from "./core/logger"; 
const express = require ("express");  
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

const api = require('./api');
app.use('/api', api); 

app.listen(3001, () => Logger.info(`Server is running on port ${3001}`,__filename, 'app.listen'));