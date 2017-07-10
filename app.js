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

// GET /api/customer/items - get a list of items
// POST /api/customer/items/:itemId/purchases - purchase an item
// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
// GET /api/vendor/money - get a total amount of money accepted by the machine
// POST /api/vendor/items - add a new item not previously existing in the machine
// PUT /api/vendor/items/:itemId - update item quantity, description, and cost

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.get('/api/todos', function(request, response){
  console.log('api/todos poop');
})