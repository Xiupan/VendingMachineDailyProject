// A customer should be able to get a list of the current items, their costs, and quantities of those items
// A customer should be able to buy an item using money
// A customer should be able to buy an item, paying more than the item is worth (imagine putting a dollar in a machine for a 65-cent item) and get correct change. This change is just an amount, not the actual coins.
// A customer should not be able to buy items that are not in the machine, but instead get an error
// A vendor should be able to see total amount of money in machine
// A vendor should be able to see a list of all purchases with their time of purchase
// A vendor should be able to update the description, quantity, and costs of items in the machine
// A vendor should be able to add a new item to the machine

const chai = require("chai");
const request = require("supertest");
const assert = chai.assert;
const app = require("./app");

describe('API Testing Suite!', function(){
  it('Tests displaying all items in vending machine.', function(done){
    request(app)
    .get("/api/customer/items")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .end(done);
  })
  it('Tests to see if money is displayed.', function(done){
    request(app)
    .get('/api/vendor/money')
    .expect(200)
    .expect(function(res){
      console.log(res.body[0].money);
      assert.equal(typeof res.body[0].money, 'number')
    })
    .end(done);
  })
  it('Tests to see if there is a list of all purchases and displays the time of purchase.', function(done){
    request(app)
    .get('/api/vendor/purchases')
    .expect(200)
    .expect(function(res){
      for (let i = 0; i < res.body[0].purchases.length; i++) {
        console.log(res.body[0].purchases[i].time);
        assert.equal(typeof res.body[0].purchases[i].time, 'string')
      }
    })
    .end(done);
  })
})
