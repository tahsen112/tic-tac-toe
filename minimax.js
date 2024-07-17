let endscreen = document.querySelector(`.endScreen`);
let winer = document.querySelector(`.winer`);
let wins = document.querySelectorAll(`.wins p`);
let xWins = document.querySelector(`.xWins`);
let oWins = document.querySelector(`.oWins`);

let xWinsCount = 0;
let oWinsCount = 0;

xWins.innerText = `X: ${xWinsCount}`;
oWins.innerText = `O: ${oWinsCount}`;

let aiPlayer = `O`;
let huPlayer = `X`;

let cuPlayer = `X`;
let isWin = false;

const winCases = [
     [`00`, `01`, `02`],
     [`10`, `11`, `12`],
     [`20`, `21`, `22`],
     [`00`, `10`, `20`],
     [`01`, `11`, `21`],
     [`02`, `12`, `22`],
     [`00`, `11`, `22`],
     [`02`, `11`, `20`]
];

let board = [
     [`x`, ``, ``],
     [`x`, ``, ``],
     [``, ``, ``],
]

function getSpots() {
     let spots = [];
     for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
               let cell = document.getElementById(`cell${String(i) + String(j)}`);
               if (!cell.innerText) {
                    cell.innerText = aiPlayer;
                    let xResult = getScore();

                    cell.innerText = huPlayer;
                    let oResult = getScore();
                    spots.push({ x: i, y: j, xScore: xResult.score, oScore: oResult.score });
                    cell.innerText = ``;
               }
          }
     }
     console.log(spots);
     return spots;
}


let isFirst = true;

function minimax(player) {
     let spots = getSpots();

     let bestMove;

     if (spots.length != 0) {
          for (let i = 0; i < spots.length; i++) {
               if (spots[i].oScore < 0) {
                    bestMove = spots[i];
                    break
               }
               else if (spots[i].oScore === 0) {
                    bestMove = spots[i];
                    if (isFirst) {
                         let cell = document.getElementById(`cell11`);
                         if (!cell.innerText) {
                              bestMove = { x: 1, y: 1, xScore: 0, oScore: 0 };
                              isFirst = false;
                              break
                         }
                         else if (cell.innerText && isFirst) {
                              bestMove = { x: 0, y: 2, xScore: 0, oScore: 0 };
                              isFirst = false;
                              break
                         }
                    }
               }
          }
          for (let i = 0; i < spots.length; i++) {
               if (spots[i].xScore > 0) {
                    bestMove = spots[i];
               }
          }
          return bestMove;
     }

}

function getScore() {
     if (checkWinner(aiPlayer)) {
          return { score: 10 }
     }
     else if (checkWinner(huPlayer)) {
          return { score: -10 }
     }
     else {
          return { score: 0 }
     }
}

function checkWinner(player) {
     for (let i = 0; i < winCases.length; i++) {
          let condition = winCases[i];

          let cellA = document.getElementById(`cell${condition[0]}`);
          let cellB = document.getElementById(`cell${condition[1]}`);
          let cellC = document.getElementById(`cell${condition[2]}`);

          if (cellA.innerText === player && cellB.innerText === player && cellC.innerText === player) {
               return true;
          }
     }

     return false;

}

function makeBestMove() {
     if (!isWin) {
          let bestMove = minimax(aiPlayer);
          if (bestMove) {
               let cell = document.getElementById(`cell${String(bestMove.x) + String(bestMove.y)}`)
               setTimeout(() => { cell.innerText = aiPlayer; getSpots(); checkWin() }, 300)
               cuPlayer = huPlayer;
          }
     }
}

function getSquar(pos) {
     let cell = document.getElementById(`cell${pos}`);

     if (!isWin) {
          if (cuPlayer === huPlayer) {
               if (!cell.innerText) {
                    cell.innerText = huPlayer;
                    cuPlayer = aiPlayer;
                    checkWin();
                    makeBestMove();
                    checkWin();
               }

          }
     }

}



function checkWin() {

     if (!isWin) {
          for (let i = 0; i < winCases.length; i++) {
               let condition = winCases[i];

               let cellA = document.getElementById(`cell${condition[0]}`);
               let cellB = document.getElementById(`cell${condition[1]}`);
               let cellC = document.getElementById(`cell${condition[2]}`);

               if (cellA.innerText === `X` && cellB.innerText === `X` && cellC.innerText === `X`) {

                    isWin = true;

                    cellA.style.color = `#c10000`;
                    cellB.style.color = `#c10000`;
                    cellC.style.color = `#c10000`;

                    xWinsCount++;
                    xWins.innerText = `X: ${xWinsCount}`;

                    setTimeout(() => {
                         endscreen.style.display = `flex`;
                         winer.innerText = `x's win`;
                    }, 2000);

                    break
               }
               else if (cellA.innerText === `O` && cellB.innerText === `O` && cellC.innerText === `O`) {

                    isWin = true;

                    cellA.style.color = `#c10000`;
                    cellB.style.color = `#c10000`;
                    cellC.style.color = `#c10000`;

                    oWinsCount++;
                    oWins.innerText = `O: ${oWinsCount}`;

                    setTimeout(() => {
                         endscreen.style.display = `flex`;
                         winer.innerText = `o's win`;
                    }, 2000);


                    break
               }

          }
          let count = 0;
          for (let i = 0; i < 3; i++) {
               for (let j = 0; j < 3; j++) {
                    let cell = document.getElementById(`cell${String(i) + String(j)}`)
                    if (cell.innerText) {
                         count++;
                    }
               }

          }
          if (count === 9) {
               isWin = true;
               for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                         let cell = document.getElementById(`cell${String(i) + String(j)}`)
                         cell.style.color = `#c10000`;
                    }
               }

               setTimeout(() => {
                    endscreen.style.display = `flex`;
                    winer.innerText = `draw`;
               }, 2000);
          }
     }
}

function playAgin() {
     for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
               let cell = document.getElementById(`cell${String(i) + String(j)}`);
               cell.innerText = ``;
               cell.style.color = `white`;
          }
     }
     endscreen.style.display = `none`;
     isWin = false;
     isFirst = true;
     cuPlayer = huPlayer;

}
