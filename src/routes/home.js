const { Router } = require('express');
const router = Router();
const style = '../css/style';
const script = '../module/script';
const img = '../assets/roulette.jpg';

router.get('/', (req, res) => {
  const body_home =`<body>
    <header>
      <span class="menu"><i class="fas fa-bars"></i></span>
      <h1>roulette game</h1>
    </header>
    <nav class="nav_menu">
      <ul class="list">
        <li id="open">
          close bets
        </li>
      </ul>
    </nav>
    <section>
      <div class="img_roulette">
        <img src=${img}>
      </div>
      <div class="betting_board">
        <h1 class="title_bets">bets</h1>
        <div class="container">
    </section>
    
    <script src="./module/script.js"></script>
  </body>`;
  res.send(body_home);
});

router.post('/:name', (req, res) => {
  const {name} = req.params;
  console.log(name);
  // res.json({'title': 'Hello world'});
});

module.exports = router;