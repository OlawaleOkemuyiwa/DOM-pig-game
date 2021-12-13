/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player loses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM1 = document.querySelector('#dice-1');
        var diceDOM2 = document.querySelector('#dice-2');
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        // if ( dice === 6 && lastDice === 6) { //for 2nd challenge, we had no dice1, dice 2 then
        //     //Player loses score
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     nextPlayer();
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
       
        // lastDice = dice;
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        console.log(roundScore);
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if there is any input for the winning score
        var inputValue = parseInt(document.querySelector('.final-score').value);
        
        var winningScore = (inputValue && inputValue > 0) ? inputValue : 20;


        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    var dices = document.querySelectorAll('.dice'); /*we cant use just querySelector here cuz we are selecting more than 1 node (element) at a time, so we use querySelectorAll which returns a node list to be converted to an array (by Array.from(nodelist)) if we need other methods of array aside forEach e.g map*/
    
    dices.forEach(dice => {
       dice.style.display = 'none'; 
    }); 
    

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


