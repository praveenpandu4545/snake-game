let inputdir = { x: 0, y: 0 };
let speed = 7;
let lastpainttime = 0;
let score = 0;
let snakearray = [{ x: 2, y: 1 }];
let food = { x: 2, y: 4 };

let blocks=[{x:9,y:9},{x:11,y:9},{x:5,y:6},{x:11,y:11},{x:6,y:2},{x:3,y:16},{x:8,y:14},{x:16,y:14},{x:12,y:10},{x:17,y:12},{x:14,y:14},{x:3,y:14}];

let highscore=document.getElementById("cscore");
let hscore=document.getElementById("highscore");
let localhighscore=parseInt(localStorage.getItem("hs"),10);
hscore.textContent=`High score : ${localhighscore}`;

let wanted=document.getElementById("dropdown");
wanted.addEventListener("change",()=>{
  speed=wanted.value;
  console.log(speed);
});


function mymain(currenttime) {
  window.requestAnimationFrame(mymain);
  // console.log(currenttime);
  if ((currenttime - lastpainttime) / 1000 < 1/speed) {
    return;
  }
  lastpainttime = currenttime;
  startgame();
}

function isCollide(snakearray) {
  for (let i = 1; i < snakearray.length; i++) {
    if (
      snakearray[i].x === snakearray[0].x &&
      snakearray[i].y === snakearray[0].y
    ) {
      return true;
    }
  }
  if (
    snakearray[0].x > 18 ||
    snakearray[0].x < 0 ||
    snakearray[0].y > 18 ||
    snakearray[0].y < 0
  ) {
    return true;
  }
  if(wanted.value==25){
    for(let i of blocks){
      if(snakearray[0].x===i.x && snakearray[0].y===i.y){
        return true;
      }    
    }
  }
  
}
let count=0;
function startgame() {
  if (isCollide(snakearray)) {
    localhighscore=parseInt(localStorage.getItem("hs"),10);
    if(count>localhighscore){
      localStorage.setItem("hs",count);
      // console.log(localhighscore);
      localhighscore=count;
      hscore.textContent=`High score : ${localhighscore}`
    }
    inputdir = { x: 0, y: 0 };
    alert("Game over.Press any key to play again");
    snakearray = [{ x: 2, y: 1 }];
    highscore.textContent=`Score : 0`;
    score = 0;
    count=0;
    speed=wanted.value;
  }

  // sanke eats the food
  if (snakearray[0].x === food.x && snakearray[0].y === food.y) {
    snakearray.unshift({
      x: snakearray[0].x + inputdir.x,
      y: snakearray[0].y + inputdir.y,
    });
    // console.log(snakearray);
    food = {
      x: Math.round(Math.random() * 16) + 1,
      y: Math.round(Math.random() * 16) + 1,
    };
    if(wanted.value==25){
    for(let j of blocks){
      if (j.x===food.x && j.y===food.y){
        food.x+=1;
      }
    }
  }
    count++;
    speed++;
    console.log(speed);
    highscore.textContent=`Score : ${count}`;
  }
  // move the snake
  for (let i = snakearray.length - 1; i >= 1; i--) {
    snakearray[i] = { ...snakearray[i - 1] };
  }
  snakearray[0].x += inputdir.x;
  snakearray[0].y += inputdir.y;

  box.innerHTML = "";
  snakearray.forEach((ele, index) => {
    snakeele = document.createElement("div");
    snakeele.style.gridRowStart = ele.y;
    snakeele.style.gridColumnStart = ele.x;
    if (index === 0) {
      snakeele.classList.add("shead");
    } else {
      snakeele.classList.add("sbody");
    }
    box.append(snakeele);
  });
  if(wanted.value==25){
    blocks.forEach((ele) => {
      blockele = document.createElement("div");
      blockele.style.gridRowStart = ele.y;
      blockele.style.gridColumnStart = ele.x;
      blockele.classList.add("block");
      box.append(blockele);
    });
  }

  foodele = document.createElement("div");
  foodele.style.gridRowStart = food.y;
  foodele.style.gridColumnStart = food.x;
  foodele.classList.add("food");
  box.append(foodele);
}

window.addEventListener("keydown", (evt) => {
  //inputdir = { x: 1, y: 0 };
  switch (evt.key) {
    case "ArrowUp":
    case "8":  
      if (inputdir.y !== 1) {
        inputdir = { x: 0, y: -1 };
      }
      break;
    case "ArrowDown":
    case "5":  
      if (inputdir.y !== -1) {               
        inputdir = { x: 0, y: 1 };
      }
      break;
    case "ArrowLeft":
    case "4":   
      if (inputdir.x !== 1) {
        inputdir = { x: -1, y: 0 };
      }
      break;
    case "ArrowRight":
    case "6":   
      if (inputdir.x !== -1) {
        inputdir = { x: 1, y: 0 };
      }
      break;
    default:
      break;
  }
});

window.requestAnimationFrame(mymain);