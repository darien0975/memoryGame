const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const control = document.querySelector(".control-container");
let cards;
let interval = null;
let firstCard = false;
let secondCard = false;


// 所有圖片的陣列
const item = [
    { name: "蜜蜂", image: "bee.png" },
    { name: "鱷魚", image: "crocodile.png" },
    { name: "金剛鸚鵡", image: "macaw.png" },
    { name: "猩猩", image: "gorilla.png" },
    { name: "老虎", image: "tiger.png" },
    { name: "猴子", image: "monkey.png" },
    { name: "變色龍", image: "chameleon.png" },
    { name: "食人魚", image: "piranha.png" },
    { name: "蟒蛇", image: "anaconda.png" },
    { name: "樹懶", image: "sloth.png" },
    { name: "鳳頭鸚鵡", image: "cockatoo.png" },
    { name: "巨嘴鳥", image: "toucan.png" }
];

let seconds = 0;
let minutes = 0;

let movesCount = 0;
let winCount = 0;

// 計時器
const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }

    // 時間顯示
    let secondsCount = seconds < 10 ? `0${seconds}` : seconds;
    let minutesCount = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>時間:</span>${minutesCount}:${secondsCount}`;
}

// 計算移動次數
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>移動次數:</span>${movesCount}`;
}

// 陣列抽8個洗牌
const generateRandom = (size = 4) => {
    let tempArray = [...item];
    let cardValue = [];

    size = Math.pow(size, 2) / 2;

    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValue.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }

    return cardValue;
}

// 陣列排列
const matrixGenerator = (cardValue, size = 4) => {
    gameContainer.innerHTML = "";
    cardValue = [...cardValue, ...cardValue];
    cardValue.sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.pow(size, 2); i++) {
        gameContainer.innerHTML += `
      <div class="card-container" data-card-value="${cardValue[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
          <img src="${cardValue[i].image}" class="image"/>
        </div>
      </div> `;
    }

    gameContainer.style.gridTemplateColumns = `repeat(${size}, 5.05em)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;

                        if (winCount == Math.floor(cardValue.length / 2)) {
                            result.innerHTML = `<h2>你贏了!!!</h2>
                           <h4>移動步數:${movesCount}</h4>`;
                           setTimeout(()=>{
                            stopGame();
                           } , 1000)
                            
                        }
                    } else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        } , 600);
                    }
                }
            }
        });
    });
};

const stopGame = () =>{
  control.classList.remove("hide");
  stopBtn.classList.add("hide");
  startBtn.classList.remove("hide");
  startBtn.innerHTML = "繼續遊戲";
  clearInterval(interval);
  interval = null;
}

//開始遊戲
startBtn.addEventListener("click" , ()=>{
  movesCount = 0;
  time = 0;

  control.classList.add("hide");
  stopBtn.classList.remove("hide");
  startBtn.classList.add("hide");

  interval  = setInterval(timeGenerator , 1000);
  moves.innerHTML = `<span>移動步數:</span>${movesCount}`;
  
  initializer();
})

//停止遊戲

stopBtn.addEventListener("click" , stopGame );



// 初始化
const initializer = () => {
   seconds = 0;
   minutes = 0;
    result.innerHTML = "";
    winCount = 0;
    let cardValue = generateRandom();
    matrixGenerator(cardValue);
    
}


