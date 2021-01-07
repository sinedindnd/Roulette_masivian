const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const roulette = require("./roulette.json");
const bets = require('./bets.json');
const users = require('./users.json');

function deleteBet(params) {
  
}

router.get('/', (req, res) => {
  res.json(roulette);
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

router.put('/:id', (req, res)=>{
  const id_roulette = req.params.id;
  let state, validate_user = [],bet__status = [], array_delete_bet = [], array_Outcom =[];
  req.body.forEach((elem, index)=>
  {
    if(elem.bet_value > 0 && elem.bet_value <= 10000)
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
    console.log(req.body);
    req.body.forEach((val, i)=>
    {
      users.forEach(values => 
      {
        if(val.id_user === values.id_user )
        {
          // console.log('numbers: ',val.bet_value, values.credit);
          // console.log('i: ',i);
          let bet_status = parseFloat(val.bet_value) <= parseFloat(values.credit) ? true: false;
          bet__status.push()
          // console.log('bet__status: ', bet__status);
        }
        else
        {
          // console.log('index: ',i);
          // console.log('error: ',val.id_user);
        }
        // bet_status
      })
    });
    res.json({resp: "true", state_roulete: state, bet_status: bet__status});
  }
  else
  {
    res.status(500).json({error: "Wrong Request!!! invalid table."});
  }
});

module.exports = router;