const express = require('express');
const router = express.Router();

const records = require('./records');

// HELPER function
function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}

// Send a GET request to view (READ) a list of quotes 
router.get('/quotes', async (req, res) => {
  const quotes =  await records.getQuotes();
  res.json(quotes);
});

// Send a GET request to view (READ) a quote
router.get('/quotes/:id', async (req, res) => {
  const quote = await records.getQuote(req.params.id);
  res.json(quote);
});

router.get('/quotes/quote/random', asyncHandler (async(req, res, next)=>{
  const quotes = await records.getQuotes();
  const quote = await records.getRandomQuote(quotes);
  res.json(quote);
}));

router.post('/quotes', asyncHandler( async (req, res) => {
  const quote = await records.createQuote({
    "quote": req.body.quote, 
    "author": req.body.author,
    "year": req.body.year
  });
  res.status(201).json(quote);
}));

// Send a PUT request to UPDATE a quote 
// Edit quote
router.put('/quotes/:id/update', asyncHandler( async(req,res, next)=>{
    const quote = await records.getQuote(req.params.id);
    await records.updateQuote(quote, req.body);
    res.status(204).end();
})); 

// Send a DELETE request to DELETE a QUOTE
router.delete('/quotes/:id/delete', async(req,res,)=>{
  try {
    const quote = await records.getQuote(req.params.id);
    await records.deleteQuote(quote);
    res.status(204).end();
  } catch(err){
    es.status(500).json({ message: err.message });
  }
});

module.exports = router;