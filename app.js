/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, isGamePlaying, previousRoll1, previousRoll2,scoreRequested;

intGame();
//Gets and changes score to win
document.querySelector('.btn-roll').addEventListener('click', function()
    {
        if(isGamePlaying) {
            document.getElementById('form').style.display = 'none';
            //Random number
            let dice1 = Math.floor(Math.random() * 6 + 1);
            let dice2 = Math.floor(Math.random() * 6 + 1);

                //Display the result
                let diceDom1 = document.getElementById('whiteDice-1');
                let diceDom2 = document.getElementById('whiteDice-2');
                diceDom1.style.display = 'block';
                diceDom1.src = 'dice-' + dice1 + '.png';
                diceDom2.style.display = 'block';
                diceDom2.src = 'dice-' + dice2 + '.png';
                console.log(dice1);
                console.log(dice2);
            //Update the round score if the rolled number was Not a 1 using type coercion "==="
                if (dice1 === 1 &&  dice2 === 1 )
                {
                    alert('Snake Eyes!!!!');
                    document.querySelector('.btn-roll').style.display = 'none';
                    document.querySelector('.btn-hold').style.display = 'none';



                    window.setTimeout(nextPlayer, 1000);


                } else {
                    //add score
                    roundScore += dice1;
                    roundScore += dice2;

                    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
                }
            }
            else {
                //Reset Score if player rolls double 6s
                scores[activePlayer] = 0;
                document.getElementById('name-' + activePlayer).textContent = 'LOSER';
            }

    });
document.querySelector('.btn-hold').addEventListener('click', function ()
    {
        if (isGamePlaying) {
            document.getElementById('form').style.display = 'none';
            //Add Current score to Global score
            scores[activePlayer] += roundScore;

            scoreRequested = document.getElementById('scoreTxtBox').value;

            //Update the UI
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

            //Check if player won the game
            if (scores[activePlayer] >= scoreRequested) {
                document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!';
                document.getElementById('whiteDice-1').style.display = 'none';
                document.getElementById('whiteDice-2').style.display = 'none';
                //if css class you must use a "." at the beginning
                document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
                document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
                isGamePlaying = false;
            } else {
                //Next Player
                nextPlayer();
            }
        }

    });

function intGame()
    {
        //set variables
        scores = [0,0];
        activePlayer = 0;
        roundScore = 0;
        isGamePlaying = true;
        scoreRequested = 100;
        document.getElementById('form').style.display = 'block';


        //interacts with CSS
        document.querySelector('.dice-1').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';

        //get element by ID is faster than querySelector
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1!';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');

    }

document.querySelector('.btn-new').addEventListener('click',intGame);

function nextPlayer()
    {
        document.querySelector('.btn-roll').style.display = 'block';
        document.querySelector('.btn-hold').style.display = 'block';
        //Next player (ternary operator)
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        //sets the text of Current play score
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        //toggle active player  fromm css (.active .player-name::after)
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        //hide dice by id
        document.getElementById('whiteDice-1').style.display = 'none';
        document.getElementById('whiteDice-2').style.display = 'none';
        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');
    }



//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);
