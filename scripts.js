var newGameBtn = document.getElementById('js-newGameButton');	
var pickRock = document.getElementById('js-playerPick_rock');
var	pickPaper = document.getElementById('js-playerPick_paper');
var	pickScissors = document.getElementById('js-playerPick_scissors');
var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');
var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');	
var playerPickElem = document.getElementById('js-playerPick');
var	computerPickElem = document.getElementById('js-computerPick');
var	playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');
var gameState = 'notStarted'; //started // ended
var player = {
        name: '',
        score: 0
    };
var computer = {
        score: 0
    };

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
    
function setGameElements() {
	switch(gameState) {
  		case 'started':
        	newGameElem.style.display = 'none';
       		pickElem.style.display = 'block';
        	resultsElem.style.display = 'block';
    	break;
		case 'ended':
        	newGameBtn.innerText = 'Jeszcze raz';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

function newGame() {
	player.name = prompt('Please enter your name', 'imię gracza');
	if (player.name) {
	player.score = computer.score = 0;
	gameState = 'started';
	setGameElements();
	playerNameElem.innerHTML = player.name;
	}
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;
	checkRoundWinner(playerPick, computerPick);
	console.log(playerPick);
}

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
	var winnerIs = 'player';
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';
	if (playerPick === computerPick) {
		winnerIs = 'noone'; // remis
	} else if (
		(computerPick === 'rock' &&  playerPick === 'scissors') ||
		(computerPick === 'scissors' &&  playerPick === 'paper') ||
		(computerPick === 'paper' &&  playerPick === 'rock')) {
		winnerIs = 'computer';
	}
	if (winnerIs === 'player') {
		playerResultElem.innerHTML = "Win!";
		player.score++;
	} else if (winnerIs === 'computer') {
		computerResultElem.innerHTML = "Win!";
		computer.score++;
	}
	setGamePoints();
	gameOver();
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function gameOver() {
	if  (computer.score === 3) {
		gameState = 'ended';
		setTimeout(setGameElements, 100);
        
		setTimeout(computerWin, 100);
			function computerWin() {
			alert('Computer scored ' + computer.score + ' points! Computer wins!');
		}
    
	} else if (player.score === 3) {
		gameState = 'ended';
		setTimeout(setGameElements, 100);
       
		setTimeout(playerWin, 100);
			function playerWin() {
			alert('Player scored ' + player.score + ' points! ' + player.name + ' is the winner ');
			}
	}
}
setGameElements ();