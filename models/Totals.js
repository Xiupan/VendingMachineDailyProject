const mongoose = require('mongoose');

const totalSchema = new mongoose.Schema({
  money: {type: Number, required: true},
  purchases: [{
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    time: {type: Date, required: true}
  }]
})

const Total = mongoose.model('Total', totalSchema);

// const total = new Total({
//   money: 5000,
//   purchases: [{
//     description: "Doritos",
//     quantity: 2,
//     time: Date.now()
//   }]
// })
// total.save()
// .then(function(total){
//   console.log(total);
// })
// .catch(function(validationError){
//   console.log("Haha nope!")
// })

module.exports = Total;
