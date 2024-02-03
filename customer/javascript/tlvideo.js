var video = document.getElementById("background-video");
var progressBar = document.querySelector(".progress-bar");

video.addEventListener("timeupdate", function () {
  var progress = (video.currentTime / video.duration) * 100;

  progressBar.style.transform = "scaleX(" + progress / 100 + ")";
});

// count down
document.addEventListener("DOMContentLoaded", function () {
  let countdownDate = getNextSundayAtNoon();
  let countdownInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "00:00:00:00";
    } else {
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown").innerHTML =
        formatTime(days) +":" +formatTime(hours) +":" +formatTime(minutes) +":" +formatTime(seconds);
    }
  }

  function formatTime(time) {
    return time < 10 ? "0" + time : time;
  }

  function getNextSundayAtNoon() {
    let now = new Date();
    let dayOfWeek = now.getDay();

    let daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;

    let nextSunday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysUntilSunday,
      12,
      0,
      0,
      0
    );

    return nextSunday;
  }
});





// button selected memory
function btnMemorySelected(){
  const btnMemory = document.querySelectorAll('btnMemory');
  document.querySelectorAll('.btnMemory').forEach(btnMemory => btnMemory.classList.remove('selected'));
  button.classList.add('selected');
}


// add to cart
  function addToCart() {
    var productName = document.getElementById('productName').innerText;
    var productPrice = document.getElementById('priceProduct').innerText;
    var productImage = document.getElementById('imageProduct').src;

    // Tạo đối tượng sản phẩm
    var product = {
      name: productName,
      price: productPrice,
      image: productImage,
    };
    var dataJson
  }







