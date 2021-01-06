const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const roulette = require("./sample.json");
const index = require('../index');

router.get('/', (req, res) => {
  res.json(roulette);
});

router.post('/', (req, res) => {
  const {name}= req.body;
  const id = roulette.length + 1;

  if(name && id)
  {
    const newRoulette = {...req.body, id};
    roulette.push(newRoulette);
    res.json(roulette);
  }
  else 
  {
    res.status(500).json({error: "Wrong Request!!!new create roulette"});
  }
});

// router.post('/:id', (req, res) =>{
//   const {id} = req.params;
//   const { title, director, year, rating } = req.body;
//   if(title && director && year && rating)
//   {
//     _.each(roulette, (roule, i) => {
//       if(roule.id == id)
//       {
//         roulette.title = title;
//         roulette.director = director;
//         roulette.year = year;
//         roulette.rating = rating;
//       }
//     });
//     res.json(roulette);
//   }
//   else 
//   {
//     res.status(500).json({error: "Wrong Request!!!"});
//   }
// });

router.delete('/:id', (req, res) =>{
  const {id} = req.params;
  _.each(roulette, (roule, i) => {
    if(roule.id == id)
    {
      roulette.splice(i,1);
    }
  });
  res.send(roulette);
});

module.exports = router;