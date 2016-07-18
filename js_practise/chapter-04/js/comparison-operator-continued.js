/**
 * Created by chris on 7/11/16.
 */

var score1 = 90;
var score2 = 95;
var highScore1 = 75;
var highScore2 = 95;

// check if scores are higher than current high scores
var comparison = (score1 + score2) > (highScore1 + highScore2);

// write the message into the page
var elComparison = document.getElementById('comparison');
elComparison.textContent = 'New high score: ' + comparison;
