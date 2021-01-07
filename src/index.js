const express = require('express');
const app = express();
const morgan = require('morgan');

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//  middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/api/home', require('./routes/home'));

app.use('/api/roulette',require("./routes/roulettes"));
app.use('/api/roulette',require("./routes/roulettes"));
app.use('/api/newroulette',require("./routes/roulettes"));
app.use('/api/openroulette',require("./routes/roulettes"));
app.use('/api/savebetsroulette', require('./routes/roulettes'));

app.use('/api/albums',require("./routes/albums"));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});

