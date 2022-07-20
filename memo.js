var cards = ["c1.png", "c2.png", "c3.png", "c4.png", "c5.png", "c6.png", "c7.png","c8.png","c9.png","c10.png","c11.png","c12.png","c13.png","c14.png","c15.png","c16.png","c17.png","c18.png","c19.png","c20.png"];

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
        content_div += '<div class="card" id="c'+ i +'"></div>';
        $(document).on('click',tmp,function(){
            revealCard(i);
        });
    };
    $('#board').html(content_div);


}


function revealCard(nr){
    let opacityValue = $('#c'+nr).css('opacity');
    if (opacityValue != 0 && lockCards == false){
        lockCards = true;

        let img = "url(img/" + cards[nr + 1] + ")";
        $('#c' + nr).css('background-image', img);
        $('#c' + nr).addClass('cardA');
        $('#c' + nr).addClass('card');

        if(!oneVisible){
            oneVisible = true;
            firstCardNr = nr;
            lockCards = false;
        }
        else {
            alert(firstCardNr);
            alert(nr);
            if(cards[firstCardNr] == cards[nr]){
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
        $('.board').html('<h1>You win!<br>Done in ' + turnCounter + 'turns</h1>');
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