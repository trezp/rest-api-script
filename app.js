const express = require('express');
const records = require('./records');

const app = express();


// Send a GET request to view (READ) a list of quotes 
app.get('/',  (req, res) => {
  const quotes = records.getAll();
  res.json(quotes);
});

// Send a GET request to view (READ) a quote
app.get('/:index', (req, res) => {
  res.json(quotes.quotes[req.params.index]);
});

// Send a GET request to view (READ) a random quote
// Send a POST request to CREATE a new quote 
// Send a PUT request to UPDATE a quote 
// Send a DELETE request to DELETE a QUOTE

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
