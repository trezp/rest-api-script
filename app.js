const express = require('express');

const app = express();
const routes = require('./routes');

app.use(express.json()); 

app.use('/api', routes);

app.use((req, res, next) => {
  req.message = "I created some middleware";
  next();
});

app.use((req, res, next) => {
  console.log(req.message);
  next();
});


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    } 
  });

});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
