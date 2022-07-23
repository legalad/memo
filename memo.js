var cards = ["c1.png", "c2.png", "c3.png", "c4.png", "c5.png", "c6.png", "c7.png","c8.png","c9.png","c10.png","c11.png","c12.png","c13.png","c14.png","c15.png","c16.png","c17.png","c18.png","c19.png","c20.png"];
var deck;
const very_easy = 4;
const easy = 6;
const medium = 12;
const hard = 16;


$('#diff').click(function () {
    let very_easy_div = '<div class="difficulty" id="diff0" onclick="startGame(very_easy)">very_easy</div>';
    let easy_div = '<div class="difficulty" id="diff1" onclick="startGame(easy)">easy</div>';
    let medium = '<div class="difficulty" id="diff2" onclick="startGame(medium)">medium</div>';
    let hard = '<div class="difficulty" id="diff3" onclick="startGame(hard)">hard</div>';
    $('#category').html(very_easy_div + easy_div + medium + hard);
});


var oneVisible = false;
var turnCounter;
var firstCardNr;
var lockCards = false;
var pairsLeft;



function startGame(difficulty){
    //randomizer
    deck = [];
    let i = 0;
    let tmp = 0;
    if (difficulty == very_easy){
        fillArray(very_easy);
    }
    if (difficulty == easy){
        fillArray(easy);
    }
    if (difficulty == medium){
        fillArray(medium);
    }
    if (difficulty == hard){
        fillArray(hard);
    }
    shuffle(deck);

    oneVisible = false;
    turnCounter = 0;
    firstCardNr = -1;
    $('.score').html('Turn counter: '+(turnCounter));
    lockCards = false;
    pairsLeft = difficulty / 2;

    if (difficulty >= 12){
        $('#board').addClass('boardM');
        $('#board').removeClass('board');
    }
    else {
        $('#board').addClass('board');
        $('#board').removeClass('boardM');
    }


    let content_div = "";
    for (let i = 0; i < difficulty; i++){
        let tmp = "#c" + i;
        content_div += '<div class="card" id="c'+ i +'" onclick="revealCard('+i+')"></div>';
    };
    $('#board').html(content_div);


}
function fillArray(difficulty){
    let i = 0;
    while (i != difficulty / 2){
        tmp = cards[Math.floor(Math.random()*cards.length)];
        if(!deck.includes(tmp)){
            deck.push(tmp);
            deck.push(tmp);
            i++;
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function revealCard(nr){
    let opacityValue = $('#c'+nr).css('opacity');
    if (opacityValue != 0 && lockCards == false){
        lockCards = true;

        let img = "url(img/" + deck[nr] + ")";
        $('#c' + nr).css('background-image', img);
        $('#c' + nr).addClass('cardA');
        $('#c' + nr).addClass('card');

        if(!oneVisible){
            oneVisible = true;
            firstCardNr = nr;
            lockCards = false;
        }
        else {
            if(deck[firstCardNr] == deck[nr]){
                setTimeout(function () {hideCards(firstCardNr, nr)}, 750);
                lockCards = false;
            }
            else {
                setTimeout(function () {restoreCards(firstCardNr, nr)}, 750);
            }

            $('.score').html('Turn counter: '+(++turnCounter));
            oneVisible = false;
            }
    }
}
function hideCards(c1, c2){
    $('#c'+c1).css('opacity', 0);
    $('#c'+c2).css('opacity', 0);

    if (--pairsLeft == 0){

        $('.board').html('<h1>You win!</h1>');
        $('.boardM').html('<h1>You win!</h1>');
    }
    lockCards = false;
}
function restoreCards(c1, c2){
    $('#c' + c1).css('background-image', 'url(img/c0.png');
    $('#c' + c1).addClass('card');
    $('#c' + c1).addClass('cardA');

    $('#c' + c2).css('background-image', 'url(img/c0.png');
    $('#c' + c2).addClass('card');
    $('#c' + c2).addClass('cardA');

    lockCards = false;
}