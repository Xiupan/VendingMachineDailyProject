const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  description: {type: String, required: true},
  cost: {type: Number, required: true},
  quantity: {type: Number, required: true}
})

const Item = mongoose.model('Item', itemSchema);

// const item = new Item() // initially creates false data into Items
// item.description = "Fritos";
// item.cost = 50;
// item.quantity = 10;
// item.save()
// .then(function(item){
//   console.log(item);
// })
// .catch(function(validationError){
//   console.log("Haha nope!")
// })

module.exports = Item;
