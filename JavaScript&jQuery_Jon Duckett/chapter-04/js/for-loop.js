/**
 * Created by chris on 7/12/16.
 */
var scores = [24, 32, 17];
var arrayLength = scores.length;
var roundNumber = 0;
var msg = '';
var i;

// loop through the items in the array
for (i = 0; i < arrayLength; i++) {
    // arrays are zero based (so 0 is round 1)
    // add 1 to the current round
    roundNumber = (i + 1);

    // write the current round to message
    msg += 'Round ' + roundNumber + ': ';

    // get the score from the scores array
    msg += scores[i] + '<br>';
}

document.getElementById('answer').innerHTML = msg;
