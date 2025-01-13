/*oriante player en fonction de la souris*/
document.addEventListener('mousemove', function(event) { 
    let player= document.querySelector(".player");
    playerCenter = player.offsetLeft + (player.offsetWidth / 2);
    let rotation=  event.pageX - playerCenter;
    player.style.rotate = rotation + "deg";
});

/*tire quand on click*/
document.addEventListener('mousedown', function(event){
    document.querySelector(".player").style.background = "orange";
    document.querySelector(".laser").style.animation = "shut linear 0.3s infinite";

} );

document.addEventListener('mouseup', function(event){
    document.querySelector(".player").style.background = "rgb(128, 0, 0)";
    setTimeout(function(){
        document.querySelector(".laser").style.animation = "";
    }, 150);



} );

/* pnj touché */
function die(){
    let shutLaser = document.querySelector(".laser").getBoundingClientRect();
    let pnjDie = document.querySelector(".pnj").getBoundingClientRect();

    return !(shutLaser.top > pnjDie.bottom ||
        shutLaser.bottom < pnjDie.top ||
        shutLaser.left > pnjDie.right ||
        shutLaser.right < pnjDie.left
    );
}


document.addEventListener('DOMContentLoaded', (event) => {
    setInterval(function(){
        if(die()){
            document.querySelector(".pnj").style.display = "none";
        }
    },10);
});