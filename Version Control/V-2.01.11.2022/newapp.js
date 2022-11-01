var jet = document.getElementById("jet");
var board = document.getElementById("board");

// ............................................................................................................

                                       //Putting Star into Board Code

var star_list = [];

class Star{
    constructor(top, left, width, height, image, velocity, moving_area) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = width;
        this.image = image;
        this.velocity = velocity;
        this.moving_area = moving_area + this.left;
    }
}

const star_2 = new Star(100, 100,50, 50, "star2.gif", 20, 50);
const star_3 = new Star(350, 350,75,75, "sun.jpg", 15, 50);
const star_5 = new Star(150, 300, 80, 75, "star8.png", 15, 100);
const star_6 = new Star(25, 25,20,25, "star4.gif", 25, 500);
const star_7 = new Star(60, 400,70, 40, "star7.png", 40, 70);
const star_8 = new Star(30, 200,25, 50, "star6.png", 40, 70);

star_list.push(star_2);
star_list.push(star_3);
star_list.push(star_5);
star_list.push(star_6);
star_list.push(star_7);
star_list.push(star_8);

// ............................................................................................................
    
                                           //Jet Movement and Bullet Throwing Code

  window.addEventListener("keydown", (e) => {
        var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
        if (e.key == "ArrowLeft" && left > 0) {
          jet.style.left = left - 10 + "px";
        }
        //460  =>  board width - jet width
        else if (e.key == "ArrowRight" && left <= 750) {
          jet.style.left = left + 10 + "px";
        }

    if(e.key == "ArrowUp" || e.code ==  "Space") {
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);
        bullet.style.left = left + "px";
        let myAudio_ = document.querySelector('#bulletshoot')
        myAudio_.play()
        var movebullet = setInterval(function(){

            var rocks = document.getElementsByClassName("rocks");

            for (var i = 0; i < rocks.length; i++) {
              var rock = rocks[i];
              if (rock != undefined) {
                var rockbound = rock.getBoundingClientRect();
                var bulletbound = bullet.getBoundingClientRect();
      
                //Condition to check whether the rock/alien and the bullet are at the same position..!
                //If so,then we have to destroy that rock
      
                if (
                  bulletbound.left >= rockbound.left &&
                  bulletbound.right <= rockbound.right &&
                  bulletbound.top <= rockbound.top &&
                  bulletbound.bottom <= rockbound.bottom
                ) {
                  rock.parentElement.removeChild(rock); //Just removing that particular rock;
                  //Scoreboard
                  document.getElementById("points").innerHTML =
                        parseInt(document.getElementById("points").innerHTML) + 1;
                }
              }
            }
            var stars = document.getElementsByClassName("stars");
            var bulletbottom = parseInt(
                window.getComputedStyle(bullet).getPropertyValue("bottom")
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
                        document.getElementById("points").innerHTML =
                        parseInt(document.getElementById("points").innerHTML) + 5;
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


// ............................................................................................................

                                        //Coin Generation Code

var generatecoins = setInterval(function(){
    var coin_ = document.createElement("div");
    coin_.classList.add("coins");
    coin_.style.left = Math.floor(Math.random() * 750) + "px";
    board.appendChild(coin_);
}, 1500);

var movecoins = setInterval(function(){
    var coins = document.getElementsByClassName("coins");
    if (coins != undefined) {
        for(var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            var cointop = parseInt(
                window.getComputedStyle(coin).getPropertyValue("top")            
            );      
            coin.style.top = cointop + 15 + "px";
            let myAudio = document.querySelector('#audio')
            myAudio.play()    
        }
    }
}, 850);


// ............................................................................................................
  
                                      //Coin Touching Code

var check_coin_touch = setInterval(function(){
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
                document.getElementById("coin_count").innerHTML =
                parseInt(document.getElementById("coin_count").innerHTML) +1;
                coin.parentElement.removeChild(coin);
                
                console.log(jet_rect.top, jet_rect.bottom);
                let myAudio_ = document.querySelector('#cointouch')
                myAudio_.play()

            }
            

        }
        
    }
    
}, 1);


// ............................................................................................................

                                            //Alien Generation Code

var generaterocks = setInterval(() => {
    var rock = document.createElement("div");
    rock.classList.add("rocks");
    //Just getting the left of the rock to place it in random position...
    var rockleft = parseInt(
      window.getComputedStyle(rock).getPropertyValue("left")
    );
    //generate value between 0 to 450 where 450 => board width - rock width
    rock.style.left = Math.floor(Math.random() * 450) + "px";
  
    board.appendChild(rock);
  }, 3500);
  
  var moverocks = setInterval(() => {
    var rocks = document.getElementsByClassName("rocks");
  
    if (rocks != undefined) {
      for (var i = 0; i < rocks.length; i++) {
        //Now I have to increase the top of each rock,so that the rocks can move downwards..
        var rock = rocks[i]; //getting each rock
        var rocktop = parseInt(
          window.getComputedStyle(rock).getPropertyValue("top")
        );
         var score1 = parseInt(document.getElementById('points').innerHTML);
         var score2 = parseInt(document.getElementById('coin_count').innerHTML);
         var score=score1+score2; 
        if (rocktop >= 475) {
          alert("Game Over 😒");
          alert(`Your score: ${score}`);
          alert("Play Again");
          clearInterval(moverocks);
          window.location.reload();
        }
  
        rock.style.top = rocktop + 25 + "px";
      }
    }
  }, 300);


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
        
        star_.classList.add("stars");
        console.log(star_list[i].top, star_list[i].left, star_list[i].width, star_list[i].height);
        board.appendChild(star_);

    };

};
generatestar();  //Star Generation 

// ............................................................................................................






