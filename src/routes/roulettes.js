const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const roulette = require("./roulette.json");
const bets = require('./bets.json');
const users = require('./users.json');
const { default: fetch } = require('node-fetch');

router.get('/', (req, res) => {
  res.json(roulette);
});

router.get('/getBets', (req, res) => {
  res.json(bets);
});

router.post('/', (req, res) => {
  const {name}= req.body;
  const {id}= req.body;
  const state = "close";
  if(name)
  {
    const id = roulette.length + 1;
    const newRoulette = {...req.body, id,state};
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
        values.state = "open";
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
  else
  {
    res.status(500).json({error: "Wrong Request!!! I failed to open bets on roulette."});
  }
});

router.post('/close', async (req, res) => {
  const {id_roulette} = req.body;
  const response = await fetch('http://localhost:3000/api/roulette/getBets');
  const users = await response.json();
  let data = {}, count = 0, money_gain = 0;
  if(Number(id_roulette))
  {
    roulette.forEach((e, i) => {
    if(e.id === id_roulette)
      {
        if(e.state == "open")
        {
          e.state = "close";
        }
      }
    });
    const winner_number = Math.floor(Math.random()*(36))+1;
    if(winner_number >= 0 && winner_number <= 36)
    {
      winner_color = winner_number % 2 === 0? 'rojo': 'negro';
    }
    bets.forEach(e => 
    {
      if(e.number === winner_number && parseInt(e.id_roulette) === id_roulette)
      {
        count = 1;
        data =
        {
          "id_user": e.id_user,
          "bet_value": e.bet_value,
          "number": e.number,
          "color": e.color,
          "bet_on": e.bet_on
        }
      }
    });
    if(count)
    {
      if(data.bet_on.color)
      {
        money_gain = data.bet_value * 1.8
      }
      if(data.bet_on.valor)
      {
        money_gain += data.bet_value * 5;
      }
      res.json({winner_number: winner_number,winner_color:winner_color,winner: count,money_gain: money_gain,data: data});
    }
    else
    {
      res.json({winner_number: winner_number,winner_color:winner_color,winners: count,msm: "ronda sin ganadores."});
    }
  }
  else
  {
    res.status(500).json({error: "Wrong Request!!! invalid id."});
  }
});

router.put('/:id', (req, res)=>{
  const id_roulette = req.params.id;
  let state, validate_user = [],bet__status = [],array_result = [], array_Outcome=[];
  req.body.forEach((elem, index)=>
  {
    if(elem.bet_value > 0 && elem.bet_value <= 10000 && elem.number >= 0 && elem.number <=36)
    {
      elem.bet_status = true;
    }
    else
    {
      elem.bet_status = false;
      array_Outcome = req.body.splice(index,1);
    }
  });

  if(id_roulette)
  {
    roulette.forEach((vals,i)=>
    {
      if(vals.id == id_roulette)
      {
        state = vals.state === "open" ? true : false;
      }
    });
    if(!state)
    {
      res.status(500).json({error: "Wrong Request!!! Roulette close."});
    }
    req.body.forEach((val, i)=>
    {
      users.forEach(values => 
      {
        if(val.id_user === values.id_user && parseFloat(val.bet_value) <= parseFloat(values.credit))
        {
          validate_user.splice(validate_user.length,0,val.id_user);
        }
      });
    });
    validate_user.forEach(val1 =>
    {
      req.body.forEach((val2,i) =>
      {
        if(val2.id_user == val1)
        {
          array_result.splice(array_result.length*5,0,val2);
        }
      });
    });
    if(array_result.length > 0)
    {
      bet__status = true;
      bets.push(array_result);
    }
    res.json({N_roulette: id_roulette, bet_status: bet__status,roulette: roulette, array_result: array_result, all_bets: bets});
  }
  else
  {
    res.status(500).json({error: "Wrong Request!!! invalid table."});
  }
});

module.exports = router;