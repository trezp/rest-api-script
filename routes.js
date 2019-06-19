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
  const quotes = await records.getQuotes();
  res.json(quotes);
});

// Send a GET request to view (READ) a quote
router.get('/quotes/:id', async (req, res, next) => {
  try {
    const quote = await records.getQuote(req.params.id);
    if (quote){
      res.json(quote);
    } else {
      res.status(404).json({error: {message: "Quote not found"}});
    }
  } catch(err){
    res.status(500).json({message: err.message});
  }
});

router.get('/quotes/quote/random', asyncHandler (async(req, res)=>{
  const quote = await records.getRandomQuote();
  res.json(quote);
}));

router.post('/quotes', async (req, res) => {
  try {
    if(req.body.author && req.body.quote && req.body.year){
      const quote = await records.createQuote({
        "quote": req.body.quote, 
        "author": req.body.author,
        "year": req.body.year
      });
      res.status(201).json(quote);
    } else {
      res.status(400).json({message: "Quote, author and year required."});
    }
    
  } catch(err){
    res.status(500).json({ message: err.message });
  }
});

// Send a PUT request to UPDATE a quote 
// Edit quote
// router.put('/quotes/:id', asyncHandler( async(req,res)=>{
//   try {
//     const quote = await records.getQuote(req.params.id);
//     if(quote){
//       quote.quote = req.body.quote;
//       quote.author = req.body.author; 
//       quote.year = req.body.year; 

//       await records.updateQuote(quote);
//       res.status(204).end(); 
//     } else {
//       res.status(404).json({message: "Quote not found"});
//     }
    
//   } catch(err){
//     res.status(500).json({ message: err.message });
//   }
// })); 

router.put('/quotes/:id', asyncHandler( async(req,res)=>{
  const quote = await records.getQuote(req.params.id);
  if(quote){
    quote.quote = req.body.quote;
    quote.author = req.body.author; 
    quote.year = req.body.year; 

    await records.updateQuote(quote);
    res.status(204).end(); 
  } else {
    res.status(404).json({error: {message: "Quote not found"}});
  }
})); 

// Send a DELETE request to DELETE a QUOTE
// router.delete('/quotes/:id', async(req,res, next)=>{
//   const quote = await records.getQuote(req.params.id);
//   try {
//     throw new Error("Something bad happened");
//     if (quote){
//       await records.deleteQuote(quote);
//       res.status(204).end();
//     } else {
//       res.status(404).json({message: "Quote not found"});
//     }
//   } catch(err){
//     next(err);
//   }
// });

router.delete('/quotes/:id', asyncHandler(async(req,res)=>{
  const quote = await records.getQuote(req.params.id);
  
  if (quote){
    await records.deleteQuote(quote);
    res.status(204).end();
  } else {
    res.status(404).json({error: {message: "Quote not found"}});
  }
}));

module.exports = router;