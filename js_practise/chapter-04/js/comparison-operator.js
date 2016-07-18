/**
 * Created by chris on 7/11/16.
 */
var pass = 50;
var score = 90;

var hasPassed = score >= pass;

// write the message into the page
var el = document.getElementById('answer');
el.textContent = 'Level passed: ' + hasPassed;

