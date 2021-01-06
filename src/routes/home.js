const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({'title': 'Hello world'});
});

router.post('/:name', (req, res) => {
  const {name} = req.params;
  console.log(name);
  // res.json({'title': 'Hello world'});
});

module.exports = router;