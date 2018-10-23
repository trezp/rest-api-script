const express = require('express');

const app = express();

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