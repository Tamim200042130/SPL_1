var jet = document.getElementById("jet");
var board = document.getElementById("board");
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

// const star_1 = new Star(25, 25,22,20, "rocket.png", 20, 500);
const star_2 = new Star(100, 100,50, 50, "star2.gif", 20, 50);
const star_3 = new Star(350, 350,75,75, "sun.jpg", 15, 50);
const star_4 = new Star(700, 700, 75, 75, "sun.jpg",14, 50);
const star_5 = new Star(150, 250, 60, 75, "star2.gif", 15, 100);
const star_6 = new Star(25, 25,20,25, "star4.gif", 25, 500);
const star_7 = new Star(60, 400,30, 40, "star3.gif", 40, 70);
const star_8 = new Star(30, 200,25, 50, "star4.gif", 40, 70);

// star_list.push(star_1);
star_list.push(star_2);
star_list.push(star_3);
star_list.push(star_4);
star_list.push(star_5);
star_list.push(star_6);
star_list.push(star_7);
star_list.push(star_8);



var border_left = 0;
var border_right = 800;
var jet_position_left = 150;

window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    jet_position_left = left;
    
    if(e.key == "ArrowLeft" && left <= border_left) {

        jet.style.left = left - 10 + "px";
        if (left > 0){
            document.getElementById("board").style.overflow = "auto";
            border_right -= 10;
            border_left -= 10;
        }
        else{
            document.getElementById("board").style.overflow = "hidden";

        }
    }

    else if (e.key == "ArrowLeft" && left > border_left) {
        jet.style.left = left - 10 + "px";
        document.getElementById("board").style.overflow = "hidden";
        // border_right -= 10;
        
      }

    //460  =>  board width - jet width
    else if (e.key === "ArrowRight" && left < border_right) {

        jet.style.left = left + 10 + "px";
        document.getElementById("board").style.overflow = "hidden";

        // console.log(jet.style.right);
  }
    else if(e.key === "ArrowRight" && left + 25 >= border_right){
        document.getElementById("board").style.overflow = "auto";
        jet.style.left = left + 10 + "px";
        border_right += 10;
        border_left += 10;
        document.getElementById("board").style.left = border_left;
        document.getElementById("board").style.right = border_right;
        console.log("border_left"+border_left);
        console.log(border_right);
    }

  if(e.key == "ArrowUp" || e.code ==  "Space") {
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);
    bullet.style.left = left + "px";
    let myAudio_ = document.querySelector('#bulletshoot')
    myAudio_.play()
    var movebullet = setInterval(function(){
        var stars = document.getElementsByClassName("stars");
        var bulletbottom = parseInt(
            window.getComputedStyle(bullet).getPropertyValue("bottom")
        );

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
                    parseInt(document.getElementById("points").innerHTML) + 1;
                }
            }
        }

        bullet.style.bottom = bulletbottom + 1 + "px";
        

    })
  }

}, 1);


window.addEventListener('scroll', ()=>{
    console.log('scrolled');
})

var generatecoins = setInterval(function(){
    var coin_ = document.createElement("div");
    coin_.classList.add("coins");

    // var rockleft = parseInt(
    //     window.getComputedStyle(coin).getPropertyValue("left")
    //   );

    coin_.style.left = Math.floor(Math.random() * border_right) + "px";
    board.appendChild(coin_);

}, 3000);


var movecoins = setInterval(function(){
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
}, 900);


var check_coin_touch = setInterval(function(){
    var coins = document.getElementsByClassName("coins");
    if(coins != undefined){
        for(var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            coin_rect = coin.getBoundingClientRect();
            jet_rect = jet.getBoundingClientRect();
            
            if(coin_rect.left <= jet_rect.left &&
                coin_rect.right >= jet_rect.left &&
                coin_rect.bottom >= jet_rect.top) 
                {
                document.getElementById("coin_count").innerHTML =
                parseInt(document.getElementById("coin_count").innerHTML) + 1;
                coin.parentElement.removeChild(coin);
                console.log(jet_rect.top, jet_rect.bottom);
            }

        }
        
    }

}, 1);



var generatestar  = function(){
    for(i=0 ; i < star_list.length ; i++){
        // var star_ = document.createElement("div");
        // star_.classList.add("stars");
        // star_.innerHTML = "<img class='starimage' onclick='changeimage()' border='0' src=star_list[i].image width='35' height='35' />";
        // star_.style.top = star_list[i].top + "px";
        // star_.style.left = star_list[i].left + "px";
        
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

stars = document.getElementsByClassName("stars");
var moving_stars = setInterval( function(){
    for(var i=0; i< star_list.length; i++){
        star_ = stars[i]
        var star_left = parseInt(
            window.getComputedStyle(star_).getPropertyValue("left")
        );
        console.log(star_left, star_.style.left);
        if(star_.style.left < (star_list[i].moving_area)){
            star_list[i].left = star_left + star_list[i].velocity + "px";
            console.log(star_list[i].left)
        }
        else{
            star_.style.left = star_left - star_.style.velocity + "px";
        }
    }

}, 1000);

generatestar();
//moving_stars();

let myAudio = document.querySelector('#audio')
myAudio.play()




