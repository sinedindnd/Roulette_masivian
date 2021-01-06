const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  const albums = await response.json();
  res.json(albums);
});

module.exports = router;