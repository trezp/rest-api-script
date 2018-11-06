const fs = require('fs');
const data = require('./data.json');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function getAll(){
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

async function getOne(id){
  const quotes = await getAll();
  return quotes.records.find(record => record.id == id);
}

async function getRandom(arr){
  const quotes = await getAll();
  const randNum = Math.floor(Math.random() * quotes.records.length);
  return arr[randNum];
}

async function create(newRecord) {
  const quotes = await getAll(); 

  if (newRecord.quote && newRecord.author){
    newRecord.id = generateRandomId(); 
    quotes.records.push(newRecord);
    await save(quotes); 
    return newRecord; 
  } else {
    throw new Error("Oops! Quote and author expected.")
  }
}

async function edit(record, body){
  const quotes = await getAll();
  const quote = quotes.records.find(item => item.id == record.id);
  

  quote.quote = body.quote || record.quote;
  quote.author = body.author || record.author;
  quote.year = body.year || record.year;

  await save(quotes);
}

async function deleteRecord(record){
  const quotes = await getAll();
  quotes.records = quotes.records.filter(item => item.id != record.id);
  await save(quotes);
}

module.exports = {
  getAll,
  getOne, 
  create, 
  edit, 
  deleteRecord,
  getRandom
}
