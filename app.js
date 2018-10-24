const express = require('express');
const records = require('./records');

const app = express();


// Send a GET request to view (READ) a list of quotes 
app.get('/',  (req, res) => {
  const quotes = records.getAll();
  res.json(quotes);
});

// Send a GET request to view (READ) a quote
app.get('/:id', (req, res) => {
  const quote = records.getOne(req.params.id);
  res.json(quote);
});

// Send a GET request to view (READ) a random quote
// Send a POST request to CREATE a new quote 
// Send a PUT request to UPDATE a quote 
// Send a DELETE request to DELETE a QUOTE

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
