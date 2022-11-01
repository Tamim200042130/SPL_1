var generatecoins = setInterval(function()    // Create Coin /Coin generation
{
    var coin_ = document.createElement("div");
    coin_.classList.add("coins");

    // var rockleft = parseInt(
    //     window.getComputedStyle(coin).getPropertyValue("left")
    //   );

    coin_.style.left = Math.floor(Math.random() * border_right) + "px";
    board.appendChild(coin_);

}, 3000);


var movecoins = setInterval(function()
{
    var coins = document.getElementsByClassName("coins");

    if (coins != undefined)
    {
        for(var i = 0; i < coins.length; i++)
        {
            var coin = coins[i];
            var cointop = parseInt(
                              window.getComputedStyle(coin).getPropertyValue("top")
                          );

            coin.style.top = cointop + 25 + "px";
        }

    }
}, 1000);


var check_coin_touch = setInterval(function()
{
    var coins = document.getElementsByClassName("coins");
    if(coins != undefined)
    {
        for(var i = 0; i < coins.length; i++)
        {
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
