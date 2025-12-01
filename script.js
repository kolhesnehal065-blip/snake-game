const board = document.querySelector('.board');
//console
const startButton = document.querySelector('.btn-start');
//console.log()
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');

//console.log(gameOverModal)
const restartButton = document.querySelector('.btn-restart');

const highsScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');

const blockHeight = 50
const blockWidth = 50

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = '00:00';

highsScoreElement.innerText = highScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;
let timeIntervalId = null;


let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

const blocks = [];
const snake = [{
    x:1, y:3
 }   //, {
//     x:1, y:4
// }, {
//     x:1, y:5
// }

]

let direction = 'down';


 for(let row= 0; row<rows; row++){
    for(let col=0;col<cols; col++){
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        // block.innerText = `${row},${col}`;
        blocks[ `${row},${col}` ] = block;

    }
 }

 // direction of snake towards food
 function render(){

    let head = null;

    blocks[ `${food.x},${food.y}` ].classList.add('food');

    if(direction === 'left'){
        head = {
            x: snake[0].x,
            y: snake[0].y - 1
        }

    } else if(direction === 'right'){
        head = {
            x: snake[0].x,
            y: snake[0].y + 1
        }
    }else if(direction === 'up'){
        head = {
            x: snake[0].x - 1,
            y: snake[0].y
        }
    }else if(direction === 'down'){
        head = {
            x: snake[0].x + 1,
            y: snake[0].y
        }
    }

    if( head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols ){
        // alert('Game Over')
        clearInterval(intervalId)

        modal.style.display = 'flex';
        gameOverModal.style.display = 'block';
        startGameModal.style.display = 'none';
        return;

    }
// food consume logic 
    if( head.x === food.x && head.y === food.y ){
        blocks[ `${food.x},${food.y}` ].classList.remove('food');
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        blocks[ `${food.x},${food.y}` ].classList.add('food');

        snake.unshift(head);


        score += 10;
        scoreElement.innerText = score;
        if(score > highScore){
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highsScoreElement.innerText = highScore; // exrtra part
        }
    }

    snake.forEach( segment => {
        blocks[ `${segment.x},${segment.y}` ].classList.remove('fill');
    }); 

    snake.unshift(head);
    snake.pop();

    
    snake.forEach( segment => {
        blocks[ `${segment.x},${segment.y}` ].classList.add('fill');
    
 });
 }


// intervalId = setInterval( () => {

//    render()
//     }, 300); 
    
    startButton.addEventListener('click', () => {
        modal.style.display = 'none';
        intervalId = setInterval( () => {

            render()
             }, 300);

        timerIntervalId = setInterval(()=>{
            let [min,sec] = time.split(":").map(Number);
            if(sec==59){
                min+=1;
                sec=0;
            } else{
                sec+= 1;
            }

            const mm = String(min).padStart(2,'0');
            const ss = String(sec).padStart(2,'0');

             time = `${mm}:${ss}`;
            // time = '00-00';
            timeElement.innerText = time;
        },1000);
    });

    restartButton.addEventListener('click', restartGame);

    function restartGame(){
        location.reload(); //no need only for checking
        // one more using random function 
        score = 0;
        time = `00-00`;

        scoreElement.innerText = score;
        timeElement.innerText = time;
        highsScoreElement.innerText = highScore;

    }

// keyboard ke buttons kam karne ke liye
    addEventListener('keydown', (event) => {
        console.log(event.key)
        if(event.key === 'ArrowLeft'){
            direction = 'left';
        } else if(event.key === 'ArrowRight'){
            direction = 'right';
        } else if(event.key === 'ArrowUp'){
            direction = 'up';
        } else if(event.key === 'ArrowDown'){
            direction = 'down';
        }   
    })