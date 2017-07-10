// A customer should be able to get a list of the current items, their costs, and quantities of those items
// A customer should be able to buy an item using money
// A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.
// A customer should not be able to buy items that are not in the machine, but instead get an error
// A vendor should be able to see total amount of money in machine
// A vendor should be able to see a list of all purchases with their time of purchase
// A vendor should be able to update the description, quantity, and costs of items in the machine
// A vendor should be able to add a new item to the machine

// Model:
// "status": "success",
//   "data": [
//     {
//       "id": 1,
//       "description": "Corn chips",
//       "cost": 65,
//       "quantity": 4
//     },
//     {
//       "id": 2,
//       "description": "Gum",
//       "cost": 35,
//       "quantity": 10

// POST /api/customer/items/:itemId/purchases - purchase an item
// POST /api/vendor/items - add a new item not previously existing in the machine
// PUT /api/vendor/items/:itemId - update item quantity, description, and cost

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/vendingDB');

app.use(bodyParser.urlencoded({extended: false}));

const Item = require("./models/Items");
const Total = require("./models/Totals");

app.listen(3000, function(){
    console.log('Vending Machine App is running!');
});

app.get('/api/customer/items', function(request, response){ // lists all items in the Items Collection
  Item.find()
  .then(function(allItems){
    response.json(allItems);
  })
})

app.get('/api/vendor/money', function(request, response){ // lists total money in the vending machine
  Total.find({}, {money: 1}) // projection only includes money
  .then(function(allTotals){
    response.json(allTotals);
  })
})

app.get('/api/vendor/purchases', function(request, response){ // lists all purchases with item descriptions and time purchased
  Total.find({}, {"purchases.description": 1, "purchases.time": 1}) // projection only includes description and time
  .then(function(allPurchases){
    response.json(allPurchases);
  })
})
