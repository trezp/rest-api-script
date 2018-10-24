const fs = require('fs');
const data = require('./data.json');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function save(){
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
  return data.records;
}

function getOne(id){
  return data.records.find(record => record.id == id);
}

async function getRandom(arr){
  const randNum = Math.floor(Math.random() * data.records.length);
  return arr[randNum];
}

async function create(body) {
  const record = {
    id: generateRandomId(),
    quote: body.quote,
    author: body.author,
    year: body.year
  }
  data.records.push(record);
  await save(); 
  return record; 
}

async function edit(record, body){
  record.quote = body.quote || record.quote;
  record.author = body.author || record.author;
  record.year = body.year || record.year;
  await save();
}

async function deleteRecord(record){
  data.records = data.records.filter(item => item.id != record.id);
  console.log(data.records)
  return save();
}

module.exports = {
  getAll,
  getOne, 
  create, 
  edit, 
  deleteRecord,
  getRandom
}
