const cors = require('cors');
const express = require('express');
const errorHandler = require('./_middleware/error-handler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', require('./users/users.controller'));
app.use('/api/todos', require('./todos/todos.controller'));

app.get('/users/todos', function(req, res){
    res.send("route todos");
});

//app.use(errorHandler);;

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));