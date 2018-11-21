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
router.get('/', (req, res) => {
  const quotes =  records.getAll();
  res.json(quotes);
});

// Send a GET request to view (READ) a quote
router.get('/:id', async (req, res) => {
  const quote = await records.getOne(req.params.id);
  res.json(quote);
});

router.get('/quotes/random', asyncHandler (async(req, res, next)=>{
  const quotes = await records.getAll();
  const quote = await records.getRandom(quotes);
  res.json(quote);
}));

router.post('/', asyncHandler( async (req, res) => {
  const quote = await records.create({
    "quote": req.body.quote, 
    "author": req.body.author,
    "year": req.body.year
  });
  res.status(201).json(quote);
}));

// Send a PUT request to UPDATE a quote 
// Edit quote
router.put('/:id', asyncHandler( async(req,res, next)=>{
    const quote = await records.getOne(req.params.id);
    await records.edit(quote, req.body);
    res.status(204).end();
})); 

// Send a DELETE request to DELETE a QUOTE
router.delete('/:id', async(req,res,)=>{
  try {
    const quote = await records.getOne(req.params.id);
    await records.deleteRecord(quote);
    res.status(204).end();
  } catch(err){
    es.status(500).json({ message: err.message });
  }
});

module.exports = router;