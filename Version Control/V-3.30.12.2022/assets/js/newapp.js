var jet = document.getElementById("jet");
var board = document.getElementById("board");
var coin=document.getElementById("coin");

/******************************************************************************/
                           //High Score Functionality.....

let hiscore = localStorage.getItem("hiscore"); 
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML =hiscore;
}

/******************************************************************************/

//..........................................................................................................

                                     //Further implemented Feature(Toggle Things)


// function myFunction() {
//     var element = document.body;
//   element.classList.toggle("dark-mode");
// }

// function myFunction(){
//   var element=document.body;
//   element.classList.toggle("change-board");
// }

// ............................................................................................................

                                  //Start Game Function                                            

document.addEventListener('DOMContentLoaded', function()
                           {
                              document.getElementById('clickMe').onclick = start_game;                                                                      
                           })
 document.addEventListener('DOMContentLoaded', function()
                           {
                                document.getElementById('mute').onclick = toggle_audio;
                           })

 document.addEventListener('DOMContentLoaded', function()
                           {
                                document.getElementById('pause').onclick = toggle_game;
                           })
                                 

// ............................................................................................................
                                        // Game Pause Function    //New Feature...


var  toggle_game = function(){  
    
    document.getElementById('pause').blur();
    if (game_paused){
        document.getElementById("pause").innerHTML = "Pause";   //game resumed... button shows pause
        document.querySelector(".pause_bg").remove();
        document.getElementById("audio").muted = false;  //If resume is clicked the sound will on... 
    }
    else{
        document.getElementById("pause").innerHTML = "Resume";   //game paused... button shows resume
        var bg = document.createElement("div");
        bg.classList.add("pause_bg");
        bg.innerHTML="PAUSED"
        board.appendChild(bg);
        document.getElementById("audio").muted = true;  //If pause is clicked the sound will off..
    }

    game_paused = !game_paused;   
}


// ............................................................................................................
                                          //  Audio On/Off      //New Feature...


var  toggle_audio = function(){  
    document.getElementById('mute').blur();
    var audios = ["audio", "bulletshoot", "cointouch", "failure", "destroy","life","star"];
    if (document.getElementById("audio").volume == 0){
        document.getElementById("mute").innerHTML = "Mute";
        for (i = 0; i < audios.length; i++)
            document.getElementById(audios[i]).volume = 1
    }
    else{
        document.getElementById("mute").innerHTML = "Unmute";
        for (i = 0; i < audios.length; i++)
            document.getElementById(audios[i]).volume = 0
    }
    
}

var game_paused = false;



// ............................................................................................................


var  start_game = function(){  
                              document.getElementById("clickMe").disabled = true;   //For control speed
                              document.getElementById("pause").disabled = false;   //pause/resume      //New Feature   
                              
gamer_name = prompt('Type Your Name:');   //Gamer Name ....
let myAudio = document.querySelector('#audio')  //Background Audio.....
 myAudio.play(); 


// ............................................................................................................

//...........................................................................................................

                                //Putting Star into Board Code

var star_list = [];


class Star{
    constructor(top, left, width, height, image, velocity, moving_area) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.image = image;
        this.velocity = velocity;
        this.moving_area = moving_area + this.left;
    }
}

const star_1 = new Star(130, 230,60, 60, "assets/image/star1.gif", 20, 50);
const star_2 = new Star(100, 100,60, 60, "assets/image/star2.gif", 20, 50);
const star_3 = new Star(250, 350,85,80, "assets/image/sun.jpg", 15, 50);
const star_5 = new Star(150, 450, 80, 80, "assets/image/star8.png", 15, 100);
const star_6 = new Star(25, 25,30,30, "assets/image/star4.gif", 25, 500);
const star_7 = new Star(60, 400,70, 70, "assets/image/star7.png", 40, 70);
const star_8 = new Star(30, 200,35, 35, "assets/image/star6.png", 40, 70);
const star_9 = new Star(200, 250,100, 100, "assets/image/Star9.gif", 20, 50);
const star_10 = new Star(150,600,95, 95, "assets/image/Star10.gif", 20, 50);
star_list.push(star_1);
star_list.push(star_2);
star_list.push(star_3);
star_list.push(star_5);
star_list.push(star_6);
star_list.push(star_7);
star_list.push(star_8);
star_list.push(star_9);
star_list.push(star_10);


// ............................................................................................................

                                   //Star Generation code

var generatestar  = function(){
    for(i=0 ; i < star_list.length ; i++){
        var star_ = document.createElement("div");
        star_.classList.add("stars");
        star_.innerHTML = "<img class='starimage' onclick='changeimage()' border='0' src=star_list[i].image width='35' height='35' />";
        star_.style.top = star_list[i].top + "px";
        star_.style.left = star_list[i].left + "px";
        
        var star_ = document.createElement('img');
        star_.src = star_list[i].image;
        star_.style.top = star_list[i].top + "px";
        star_.style.left = star_list[i].left + "px";
        star_.style.width = star_list[i].width +  "px";       
        star_.style.height = star_list[i].height+ "px";
        star_.style.moving_area=star_list.moving_area+ "px";
        star_.classList.add("stars");
        console.log(star_list[i].top, star_list[i].left, star_list[i].width, star_list[i].height);
        board.appendChild(star_);
        

    };

};
generatestar();  //Star Generation 

// ............................................................................................................
    
                                  //Jet Movement and Bullet Throwing Code



  window.addEventListener("keydown", (e) => {
    if (game_paused)
    return;
        var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
        if ((e.key == "ArrowLeft" ||e.code=="KeyA"||e.code=="Numpad4") && left > 0) {
          jet.style.left = left - 20 + "px";
        }
        //460  =>  board width - jet width
        else if ((e.key == "ArrowRight" || e.code=="KeyD" ||e.code=="Numpad6") && left <= 750) {
          jet.style.left = left + 20 + "px";
        }

        
    if(e.key == "ArrowUp" || e.code ==  "Space" || e.code=="KeyW" ||e.code=="Numpad8") {
      if (game_paused)
      return;
     
/*************************************************************************************************************/            
                           //  Bullet Count    New Feature.......

      var bullet_game_Over = parseInt(document.getElementById('bullet_count').innerHTML); //New Feature
      if(bullet_game_Over>0){ //If bullet_game_over>0 then the bullets will be fired......
        document.getElementById("bullet_count").innerHTML =parseInt(document.getElementById("bullet_count").innerHTML) -1;
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);
        bullet.style.left = left + "px";
        let myAudio_ = document.querySelector('#bulletshoot')   //Bullet Shoot Sound....
        myAudio_.play()
      }
     
/************************************************************************************************************/ 

        var movebullet = setInterval(function(){

            var rocks = document.getElementsByClassName("rocks");

            for (var i = 0; i < rocks.length; i++) {
              var rock = rocks[i];
              if (rock != undefined) {
                var rockbound = rock.getBoundingClientRect();
                var bulletbound = bullet.getBoundingClientRect();
      
                //Condition to check whether the rock/alien and the bullet are at the same position..!
                //If so,then we have to destroy that rock....
      
                if (
                  bulletbound.left >= rockbound.left &&
                  bulletbound.right <= rockbound.right &&
                  bulletbound.top <= rockbound.top &&
                  bulletbound.bottom <= rockbound.bottom
                ) {
                  rock.parentElement.removeChild(rock); //Just removing that particular rock.
                  bullet.parentElement.removeChild(bullet);//The bullet is also removed when it destroy a star or UFO.
                    //Sound 
                    let myAudio_ = document.querySelector('#destroy')
                    myAudio_.play()

                  //Scoreboard
                  document.getElementById("points").innerHTML =
                        parseInt(document.getElementById("points").innerHTML) + 1;
                }
              }
            }
            var stars = document.getElementsByClassName("stars");
            var bulletbottom = parseInt( window.getComputedStyle(bullet).getPropertyValue("bottom")
            );
            var bulletbottom = parseInt(
                window.getComputedStyle(bullet).getPropertyValue("bottom")
              );
            if (bulletbottom >= 500) {
                clearInterval(movebullet);
              }
            for(var i = 0; i < stars.length; i++) {
                var star_ = stars[i]
                if (star_ != undefined){
                    var starbound = star_.getBoundingClientRect();
                    var bulletbound = bullet.getBoundingClientRect();           
                    if(
                        bulletbound.left >= starbound.left &&
                        bulletbound.right <= starbound.right &&
                        bulletbound.top <= starbound.top && 
                        bulletbound.bottom <= starbound.bottom 
                    ){
                        star_.parentElement.removeChild(star_);
                        let myAudio = document.querySelector('#star')
                          myAudio.play()

 /************************************************************************************************************************/
                                   //Auto generate star...   New Feature......                        

                        var new_star = new Star(star_list[i].top, star_list[i].left, star_list[i].height, star_list[i].width, star_list[i].image, star_list[i].velocity, star_list[i].moving_area);
                        setTimeout(generate_newstar, 2000, new_star);

/************************************************************************************************************************/

                        bullet.parentElement.removeChild(bullet); 
                        document.getElementById("points").innerHTML =
                        parseInt(document.getElementById("points").innerHTML) + 2;
                    }                
                }
            }
             bullet.style.left = left + "px";
             bullet.style.bottom = bulletbottom + 1 + "px"; 
         })
      }   
    }, 1);
  
  
window.addEventListener('scroll', ()=>{
    console.log('scrolled');
})


// ........................................................................................................................
                                     //Coin Generation Functionality...

var generatecoins = setInterval(function(){
  if (game_paused)
      return;
    var coin_ = document.createElement("div");
    coin_.classList.add("coins");
    coin_.style.left = Math.floor(Math.random() * 750) + "px";  //Random generate coin.....
    board.appendChild(coin_);
}, 700);

/*************************************************************************************************************************/
                              //Moving Coins Functionality...

var movecoins = setInterval(function(){
  if (game_paused)
      return;
      
    var coins = document.getElementsByClassName("coins");
    if (coins != undefined) {
        for(var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            var cointop = parseInt(
                window.getComputedStyle(coin).getPropertyValue("top")            
            );      
            coin.style.top = cointop + 15 + "px";
             
              
        }
    }
}, 200);

/************************************************************************************************************************/


// ........................................................................................................................
  
                                      //Coin Touching Functionality........

var check_coin_touch = setInterval(function(){
  if (game_paused)
      return;
    var coins = document.getElementsByClassName("coins");
    if(coins != undefined){
        for(var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            var cointop = parseInt(
                window.getComputedStyle(coin).getPropertyValue("top")
                
            );
            coin_rect = coin.getBoundingClientRect();
            jet_rect = jet.getBoundingClientRect();
            if(coin_rect.left <= jet_rect.left &&
                coin_rect.right >= jet_rect.left &&
                coin_rect.bottom >= jet_rect.top) 
                {
                document.getElementById("bullet_count").innerHTML =
                parseInt(document.getElementById("bullet_count").innerHTML) +1;      //It increases bullets...     //New Feature
                document.getElementById("coin_count").innerHTML =
                parseInt(document.getElementById("coin_count").innerHTML) +1;        //It increases coin count.....
                coin.parentElement.removeChild(coin);
                console.log(jet_rect.top, jet_rect.bottom);
                let myAudio_ = document.querySelector('#cointouch')
                myAudio_.play()
            }
            var cointop = parseInt(window.getComputedStyle(coin).getPropertyValue("top"));
            if (cointop >= 480) {    //When coins passed the bottom line then it will be removed...
              coin.parentElement.removeChild(coin);       
            }            
        }      
    }    
}, 1);


// ............................................................................................................
                                            //Alien Generation Code

var generaterocks = setInterval(() => {
  if (game_paused)
      return;
    var rock = document.createElement("div");
    rock.classList.add("rocks");
    //generate value between 0 to 450 where 450 => board width - rock width
    rock.style.left = Math.floor(Math.random() * 450) + "px";
    board.appendChild(rock);
    document.getElementById("alien_count").innerHTML =parseInt(document.getElementById("alien_count").innerHTML)+0; //Alien count... Life  //New feature..
  }, 3000);
  

/*****************************************************************************************************************/
                                        //Moving Aliens Functionality.......  

  var moverocks = setInterval(() => {
    if (game_paused)
      return;
    var rocks = document.getElementsByClassName("rocks");
    if (rocks != undefined) {
      for (var i = 0; i < rocks.length; i++) {
        //Now I have to increase the top of each rock,so that the rocks can move downwards..
        var rock = rocks[i]; //getting each rock
        var rocktop = parseInt(window.getComputedStyle(rock).getPropertyValue("top"));
         var score1 = parseInt(document.getElementById('points').innerHTML);    //Score count....
        //  var score2 = parseInt(document.getElementById('coin_count').innerHTML);

/****************************************************************************************************************/ 



/*****************************************************************************************************************/
                                 //High Score Store.... New Feature..

        //  var score=score1+score2; 
        var score=score1;
         if(score>hiscoreval)    //New Feature
         {
          hiscoreval = score;
          localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
          hiscoreBox.innerHTML =hiscoreval;
        }

/*****************************************************************************************************************/



/*****************************************************************************************************************/
                                     //Game Over Functionality.......
  
         var alien_game_over=parseInt(document.getElementById('alien_count').innerHTML);
              //Alien Count...   //New feature..
         if(rocktop>=470){
          rock.parentElement.removeChild(rock);
          let myAudio = document.querySelector('#life')
            myAudio.play() 
          document.getElementById("alien_count").innerHTML = parseInt(document.getElementById("alien_count").innerHTML)-1;
         }
    
        if (alien_game_over===0 ) {
          
          let myAudio = document.querySelector('#failure')
            myAudio.play() 
            document.getElementById("audio").muted = true;
          alert("Game Over 😭");
          if(score===hiscoreval)
         {
          alert(`${gamer_name}'s score: ${score} .Congratulations 🎉 !This is your highest score.`); 
          alert("Click The 'Start' Button to Play Again");
        }
        if(score<hiscoreval)
         {
          alert(`${gamer_name}'s score: ${score} . O,No 🥺 ! You need ${hiscoreval-score} to beat the previous record.`); 
          alert("Click The 'Start' Button to Play Again");
        }  
          clearInterval(moverocks);
          window.location.reload();
         }

/*****************************************************************************************************************/

        rock.style.top = rocktop + 25 + "px";
      }
    }
  }, 400);

  
//.................................................................................................................

 }

 
