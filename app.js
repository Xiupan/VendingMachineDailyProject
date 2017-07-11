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
    console.log('All items returned!');
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

app.post('/api/customer/items/:itemId/purchases', function(request, response){ // adds the cost of the purchased item to the total money
  var itemId = request.params.itemId;
  var cashInserted = 500;

  Item.findOne({_id: itemId})
  .then(function(itemToPurchase){
    itemToPurchase.quantity = itemToPurchase.quantity - 1; // subtracts one from quantity of item when a purchase is made
    itemToPurchase.save()
    .then(function(){
      Total.find()
      .then(function(machineTotals){ // adds the cost of the item to the total amt of money in the machine. Also adds the transaction to the machine's transaction history array!
      if(cashInserted > itemToPurchase.cost){ // only continues if the customer put enough money into the machine
        machineTotals[0].money += itemToPurchase.cost;
        machineTotals[0].purchases.push({description: itemToPurchase.description, quantity: 1, time: Date.now(), moneyGiven: cashInserted, changeGiven: cashInserted - itemToPurchase.cost});
      }
      machineTotals[0].save();
      response.json(machineTotals[0]);
      })
    })
  })
})

app.post('/api/vendor/items', function(request, response){ // adds new items to the Items collection. Hard-coded values for now. Can switch to req.body stuff to pull from a form?
  const itemToAdd = new Item()
  itemToAdd.description = "Doritos";
  itemToAdd.quantity = 20;
  itemToAdd.cost = 60;
  itemToAdd.save()
  .then(function(newItem){
    Item.find()
    .then(function(allItems){
      response.json(allItems)
    })
  })
})


app.put('/api/vendor/items/:itemId', function(request, response){ // vendor can update a specific item's values. Values hard-coded for now.
  var itemId = request.params.itemId;
  Item.findOne({_id: itemId})
  .then(function(foundItem){
    foundItem.description = "Corn Chips";
    foundItem.quantity = 20;
    foundItem.cost = 40;
    foundItem.save()
    .then(function(updatedItem){
      Item.find()
      .then(function(allItems){
        response.json(allItems)
      })
    })
  })
})

module.exports = app;
