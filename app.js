const express = require('express');
const records = require('./records');

const app = express();

app.use(express.json()); 

app.use((req, res, next) => {
  req.message = "I created some middleware";
  next();
});

app.use((req, res, next) => {
  console.log(req.message);
  next();
});


// Send a GET request to view (READ) a list of quotes 
app.get('/', async (req, res) => {
  const quotes = await records.fakeServerDelay(records.getAll);
  res.json(quotes);
});

// Send a GET request to view (READ) a quote
app.get('/:id', (req, res) => {
  const quote = records.getOne(req.params.id);
  res.json(quote);
});

// Send a GET request to view (READ) a random quote
// Send a POST request to CREATE a new quote 
app.post('/', async (req,res) => {
  const quote = await records.create(req.body);
  res.status(201).json(quote);
});
// Send a PUT request to UPDATE a quote 
// Send a DELETE request to DELETE a QUOTE

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
