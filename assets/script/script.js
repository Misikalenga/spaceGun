/*oriante player en fonction de la souris*/
document.addEventListener('mousemove', function(event) { 
    let player = document.querySelector(".player");
    let playerCenter = player.offsetLeft + (player.offsetWidth / 2);
    let rotation = (event.pageX - playerCenter) / 4; /*diminue la sensibilité*/
    player.style.transform = "rotate(" + rotation +"deg)"; 


    /* le tire s'arrête au curser*/
    laserJ = document.querySelector(".laser").getBoundingClientRect();
//     if (event.pageY <= laserJ.bottom){
//         document.querySelector(".laser").style.background = "yellow";
//         document.querySelector(".laser").style.display = "block";
//     }else{
//         document.querySelector(".laser").style.display = "none";
//     }
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
function mort(){
    let shutLaser = document.querySelector(".laserE").getBoundingClientRect();
    let playerMort = document.querySelector(".player").getBoundingClientRect();

    return !(shutLaser.top > playerMort.bottom ||
        shutLaser.bottom < playerMort.top ||
        shutLaser.left > playerMort.right ||
        shutLaser.right < playerMort.left
    );
}


document.addEventListener('DOMContentLoaded', (event) => {
    setInterval(function(){
        if(mort()){
            document.querySelector(".player").style.display = "none";
        }
    },10);
});

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

/* se déplace à gauche*/
document.addEventListener('keydown', function(event){
    if (event.key === 'ArrowLeft'){
        let playerM = document.querySelector(".player");
        let positionPlayer = document.querySelector(".player").getBoundingClientRect();
        let deplacement = positionPlayer.left -15;
   
        playerM.style.left = deplacement + "px";
    };    
});

/* se déplace à droite*/
document.addEventListener('keydown', function(event){
    if (event.key === 'ArrowRight'){
        let playerM = document.querySelector(".player");
        let positionPlayer = document.querySelector(".player").getBoundingClientRect();
        let deplacement = positionPlayer.left +15;
   
        playerM.style.left = deplacement + "px";
    };    
});


/* deplacement ennemi */

document.addEventListener('DOMContentLoaded', (event) => {/*positoin possible de ennemi */
    const ennemiJ = document.querySelector(".pnj");
    const jouer = document.querySelector(".player");
    let positionEnnemi = [-100,-90,-80,-70,-60,-50,-40,-30,-20,-10, 0, 10, 20, 30, 40, 50, 30, 70, 80, 90, 100,];
    let animEnCours = false;

    function changerPositionEnnemi() {
        let aleatoire = Math.floor(Math.random() * positionEnnemi.length);
        let ennemiLieu = positionEnnemi[aleatoire];
        let eCoulisse = parseInt(getComputedStyle(ennemiJ).left, 10);

        let animEnnemi = setInterval(() => { /*detecte quand il changer de position*/
            let jouerRect = jouer.getBoundingClientRect();
            let ennemiRect = ennemiJ.getBoundingClientRect();
            
            if (ennemiRect.bottom <= jouerRect.top - 300) {
                clearInterval(animEnnemi); /*stop l'annim*/
                document.querySelector(".pnj").style.display = "flex";
                eCoulisse = ennemiLieu; 
                ennemiJ.style.left = eCoulisse + "px";
                animEnCours = false; 
            } else {
                if (eCoulisse > ennemiLieu) {
                    eCoulisse -= 5;
                } else if (eCoulisse < ennemiLieu) {
                    eCoulisse += 5;
                }
                ennemiJ.style.left = eCoulisse + "px";
            }
        }, 100); /*vitesse*/ 
    }

    setInterval(() => {
        if (!animEnCours) {
            animEnCours = true;
            changerPositionEnnemi();
        }
    }, 10); /* quand sa recommence*/
});
