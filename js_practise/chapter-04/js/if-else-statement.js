/**
 * Created by chris on 7/11/16.
 */
var pass = 50;
var score = 75;
var msg;

if (score >= pass) {
    msg = 'Congratulations, you passed!';
} else {
    msg = 'Have another go!';
}

var el = document.getElementById('answer');
el.textContent = msg;
