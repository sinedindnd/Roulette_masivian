const { Router } = require('express');
const router = Router();

const roulette = require("./roulette.json");
const bets = require('./bets.json');
const users = require('./users.json');
const index = require('../index');
const newroulette = require('../controller/roulette/rouletteController');

router.get('/', (req, res) => {
  res.json(roulette);
});

router.post('/', (req, res) => {
  console.log('bets: ',bets);
  const {name}= req.body;
  const {id}= req.body;
  const {id_user, id_roulette, bet_value, color, number, type_of_currency}= req.body;
  console.log(typeof req.body);
  
  if(name)
  {
    const id = roulette.length + 1;
    const newRoulette = {...req.body, id};
    roulette.push(newRoulette);
    res.json(roulette);
  }
  else if(id)
  {
    let reply = false, name = '';
    roulette.forEach((values,i)=>
    {
      if(values.id == id)
      {
        reply = true;
        name = values.name;
      }
    });
    if(reply)
    {
      res.json({resp: reply, name: name});
    }
    else
    {
      res.status(500).json({error: "Wrong Request!!! invalid id."});
    }
  }
  else if(typeof(id_user) != "undefined" && typeof(id_roulette) != "undefined" && typeof(bet_value) != "undefined" && typeof(color) != "undefined" && typeof(number) != "undefined" && typeof(type_of_currency) != "undefined")
  {
    console.log(bets);
    res.json(bets);
  }
  else
  {
    res.status(500).json({error: "Wrong Request!!! I failed to open bets on roulette."});
  }
});

module.exports = router;