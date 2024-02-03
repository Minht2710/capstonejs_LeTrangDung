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

    // Lấy giỏ hàng từ Local Storage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Thêm sản phẩm vào giỏ hàng
    cartItems.push(product);

    // Lưu giỏ hàng mới vào Local Storage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Cập nhật hiển thị giỏ hàng (có thể gọi hàm hiển thị giỏ hàng ở đây)
    updateCartDisplay();
  }

  // Hàm cập nhật hiển thị giỏ hàng
  function updateCartDisplay() {
    // Code để cập nhật hiển thị giỏ hàng ở đây
    // Ví dụ: hiển thị số lượng sản phẩm trong giỏ hàng
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartCount = cartItems.length;

    document.getElementById('cartCount').innerText = 'Cart Count: ' + cartCount;
  }






    // Hàm cập nhật hiển thị giỏ hàng trong offcanvas
    function updateCartDisplay() {
      var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      var offCanvasBody = document.getElementById('offCanvasBody');
      offCanvasBody.innerHTML = '';
  
      cartItems.forEach(function(item) {
        var cartItem = ``;
        cartItem.innerHTML = `<div>
        <img src="${item.image}" alt="Product Image">
        <p>${item.name} - ${item.price}</p>
        </div>
        `;
        offCanvasBody.appendChild(cartItem);
      });
    }
  