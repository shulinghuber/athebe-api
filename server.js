﻿require('rootpath')();
const cors = require('cors');
const express = require('express');
const errorHandler = require('_middleware/error-handler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', require('./users/users.controller'));
app.use('/todos', require('./todos/todos.controller'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));