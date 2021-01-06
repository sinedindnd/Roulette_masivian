
const division = document.querySelector(".container");
let btn = document.getElementById('open');
let content = ``;

btn.onclick = function()
{
  if(btn.classList.contains('neon'))
  {
    btn.classList.remove('neon');
    btn.innerHTML = "closed bets";
  }
  else
  {
    btn.classList.add('neon');
    btn.innerHTML = "open bets";
  }
}

for(i = 0; i <= 36; i++ )
{

  if( i === 0)
  {
    content += `<div class="bet_1 green">
                  <input type="number" id="bet_${i}" min="0" max="10000" maxlength="5">
                  <span>${i}</span>
                </div>`;
  } else if(((i+1)% 2) !== 0)
  {
    content += `<div class="bet_1 black">
                  <input type="number" id="bet_${i}" min="0" max="10000" maxlength="5">
                  <span>${i}</span>
                </div>`;
  } else
  {
    content += `<div class="bet_1 red">
                  <input type="number" id="bet_${i}" min="0" max="10000" maxlength="5">
                  <span>${i}</span>
                </div>`;
  }
  
  
}
division.innerHTML = content;

const btn_close_bets = document.querySelector(".close_bets");
const inputs = document.querySelectorAll("input");
function eventFlow(e)
{
  if(e.target.className === 'new')
  {
    const url = "http://localhost:3000/api/roulette";

    // fetch(url, {
      // method: 'POST',
      // headers: {
      //   'Content-type': 'application/json'
      // },
      // body: {
      //   "name": "test three"
      // }

    // })
    // .then(resp => resp.json())
    // .then(data => {
    //   console.log("data: ",data);
    // })
    
  }else if(e.target.className === 'open')
  {

  }else if(e.target.className === 'close')
  {

  }else
  {
    console.error("Upps.. something went wrong. If the error persists when reloading the page, do not hesitate to contact support.");
  }
}

const $menuEvents = document.querySelectorAll("li");
$menuEvents.forEach(li => 
{
  li.addEventListener('click', eventFlow);

});

// class Roulette {
//   public function constructor()
//   {
    
//   }

//   // endpiont one creation of new roulette

//   public function creationRoulette()
//   {

//   }

//   // endpoint two roulette opening
//   public function rouletteOpening(id_roulette)
//   {

//     return true;
//   }

//   public function close_bets(params)
//   {
    
//   }
// }
// console.log("contenido: ", content);
