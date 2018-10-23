const express = require('express');

const app = express();

// Send a GET request to view (READ) a list of quotes 
app.get('/', (req, res) => {
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

const quotes = {
  "quotes": [
    {
      "id": 835,
      "quote": "I am replacing this quote with another",
      "author": "Lance Bass",
      "year": 3343
    },
    {
      "id": 8448,
      "quote": "I am replacing this quote with another 2",
      "author": "Lance Bass 2",
      "year": 9999
    },
    {
      "id": 6869,
      "quote": "I am replacing this quote with another 3",
      "author": "Lance Bass 3",
      "year": 7777
    }
  ]
}