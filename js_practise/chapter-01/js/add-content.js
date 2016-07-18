/**
 * Created by chris on 7/6/16.
 */
/* This script displays a greeting to the user based upon the current
* time. It is an example from JavaScript & jQuery book */
var today = new Date();             // Creat a new date object
var hourNow = today.getHours();     // Find the current hour
var greeting;

// Display the appropriate greeting based on the current time
if (hourNow > 18) {
    greeting = 'Good evening!';
} else if (hourNow > 12) {
    greeting = 'Good afternoon!';
} else if (hourNow > 0) {
    greeting = 'Good morning!';
} else {
    greeting = 'Welcome!';
}

document.write('<h3>' + greeting + '</h3>');

