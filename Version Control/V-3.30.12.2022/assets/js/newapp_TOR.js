var gamer_name = "";
var final_score = 0;
var total_coins = 0;
//var total_length = 455;
const highest_length_for_bullet = 425;
var highest_length_for_gamer = 425;
var light_velocity = 3;

document.addEventListener('DOMContentLoaded', function(){


document.getElementById('clickMe').onclick = start_game;

// document.getElementById('end').onclick =  alert(` ${gamer_name}'s, Score is ${final_score}`);

})
document.addEventListener('DOMContentLoaded', function()
                           {
                                document.getElementById('mute').onclick = toggle_audio;
                           }) 

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




// ............................................................................................................


                           



 
var  start_game = function(){
document.getElementById("clickMe").disabled = true;
gamer_name = prompt('Type here');
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

const star_2 = new Star(100, 100,50, 50, "assets/image/star2.gif", 20, 50);
const star_3 = new Star(350, 350,75,75, "assets/image/sun.jpg", 15, 50);
const star_4 = new Star(700, 700, 75, 75, "assets/image/star8.png",14, 50);
const star_5 = new Star(200, 500, 75, 75, "assets/image/star4.gif", 15, 100);
const star_6 = new Star(25, 25,30,30, "assets/image/star4.gif", 25, 500);
const star_7 = new Star(60, 400,70, 70, "assets/image/star7.png", 40, 70);
const star_8 = new Star(30, 200,35, 35, "assets/image/star6.png", 40, 70);
const star_9 = new Star(200, 250,100, 100, "assets/image/Star9.gif", 20, 50);
const star_10 = new Star(150,600,95, 95, "assets/image/Star10.gif", 20, 50);

star_list.push(star_2);
star_list.push(star_3);
star_list.push(star_4);
star_list.push(star_5);
star_list.push(star_6);
star_list.push(star_7);
star_list.push(star_8);
star_list.push(star_9);
star_list.push(star_10);

var border_left = 0;
var border_right = 460;
var jet_position_left = 150;

window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    jet_position_left = left;
    
    if ((e.key == "ArrowLeft" ||e.code=="KeyA"||e.code=="Numpad4") && left <= border_left) {

        jet.style.left = left - 20 + "px";
        
            document.getElementById("board").style.overflow = "auto";
            border_right -= 20;
            border_left -= 20;
    
    }

    else if ((e.key == "ArrowLeft" ||e.code=="KeyA"||e.code=="Numpad4") && left > border_left) {
        jet.style.left = left - 20 + "px";
        document.getElementById("board").style.overflow = "hidden";
        // border_right -= 10;
        
      }

    //460  =>  board width - jet width
    else if ((e.key == "ArrowRight" || e.code=="KeyD" ||e.code=="Numpad6")  && left < border_right) {

        jet.style.left = left + 20 + "px";
        document.getElementById("board").style.overflow = "hidden";

       
  }
    else if((e.key == "ArrowRight" || e.code=="KeyD" ||e.code=="Numpad6") && left + 25 >= border_right){
        document.getElementById("board").style.overflow = "auto";
        jet.style.left = left + 20 + "px";
        border_right += 20;
        border_left += 20;
        document.getElementById("board").style.left = border_left;
        document.getElementById("board").style.right = border_right;
        
    }

  if(e.key == "ArrowUp" || e.code ==  "Space" || e.code=="KeyW" ||e.code=="Numpad8") {
    var bullet = document.createElement("div");
    var crossed_length = 0;
    var elapsed_time = 0
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
                    let myAudio_ = document.querySelector('#destroy')
                    myAudio_.play()
                    document.getElementById("points").innerHTML =
                    parseInt(document.getElementById("points").innerHTML) + 1;
                    final_score += 1;
                    bullet.parentElement.removeChild(bullet);
                }
            }
        }
        var temp_highest_length_for_gamer = highest_length_for_gamer-left ;
               
        console.log(temp_highest_length_for_gamer);
        if (crossed_length < temp_highest_length_for_gamer){
            bullet.style.bottom = bulletbottom + 3 + "px";
            elapsed_time += 1;
            crossed_length += 3;
        }
        else{
            bullet.parentElement.removeChild(bullet);
            
        }
        
        

    }, 1)
  }

});


window.addEventListener('scroll', ()=>{
    // console.log('scrolled');
})

var generatecoins = setInterval(function(){
    var coin_ = document.createElement("div");
    coin_.classList.add("coins");
    coin_.style.left = Math.floor(Math.random() * border_right) + "px";
    board.appendChild(coin_);

}, 1000);


var movecoins = setInterval(function(){
    var coins = document.getElementsByClassName("coins");

    if (coins != undefined) {
        for(var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            var cointop = parseInt(
                window.getComputedStyle(coin).getPropertyValue("top")
            );
            
            coin.style.top = cointop + 25 + "px";
        }

    }
}, 500);


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
                total_coins += 1;
                light_velocity = light_velocity * 0.99;
                highest_length_for_gamer = highest_length_for_gamer / ((1 - (.5**2 / light_velocity ** 2)) ** .5)
                console.log(jet_rect.top, jet_rect.bottom);
                console.log(total_coins);
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



var generatestar  = function(){
    for(i=0 ; i < star_list.length ; i++){
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

var stars = document.getElementsByClassName("stars");
// var moving_stars = setInterval( function(){
//     for(var i=0; i< star_list.length; i++){
//         star_ = stars[i]
//         var star_left = parseInt(
//             window.getComputedStyle(star_).getPropertyValue("left")
//         );
//         console.log(star_left, star_.style.left);
//         if(star_.style.left < (star_list[i].moving_area)){
//             star_list[i].left = star_left + star_list[i].velocity + "px";
//             console.log(star_list[i].left)
//         }
//         else{
//             star_.style.left = star_left - star_.style.velocity + "px";
//         }
//     }

// }, 1000);

generatestar();
//moving_stars();



let myAudio = document.querySelector('#audio')
myAudio.play()
score = document.getElementById('points').innerHTML;
 document.getElementById('end').onclick = function(){
    // console.log(gamer_name);
    score3=total_coins+final_score;
    alert(`${gamer_name}'s score: ${score3}`)
    window.location.reload();

}
// document.getElementById('end').onclick =  alert(` ${gamer_name}'s, Score is ${final_score}`);


}


