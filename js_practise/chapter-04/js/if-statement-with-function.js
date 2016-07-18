/**
 *
 * Created by chris on 7/11/16.
 */
var score = 75;
var msg = '';

function congratulation() {
    msg += 'Congratulation! ';


}

if (score >= 50) {
    congratulation();
    msg += 'Proceed to the next round.';

}
var el = document.getElementById('answer');
el.innerHTML = msg;
