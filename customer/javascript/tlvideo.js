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
        formatTime(days) +
        ":" +
        formatTime(hours) +
        ":" +
        formatTime(minutes) +
        ":" +
        formatTime(seconds);
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
function btnMemorySelected() {
  const btnMemory = document.querySelectorAll("btnMemory");
  document
    .querySelectorAll(".btnMemory")
    .forEach((btnMemory) => btnMemory.classList.remove("selected"));
  button.classList.add("selected");
}

var dssp = [];
var dataJson2 = localStorage.getItem("DSSP");
dssp = JSON.parse(dataJson2);

renderListcart();
totalPrice()

function removeItem(index) {
  dssp.splice(index, 1); 
  var dataJson = JSON.stringify(dssp);
  localStorage.setItem("DSSP", dataJson);
  renderListcart();
  totalPrice()
}
// add to cart
function addToCart() {
  var productName = document.getElementById("productName").innerText;
  var productPrice = document.getElementById("priceProduct").innerText;
  var productImage = document.getElementById("imageProduct").src;

  // Tạo đối tượng sản phẩm
  var product = {
    name: productName,
    price: productPrice,
    image: productImage,
    quantity: 1
  };
  dssp.push(product);
  console.log(dssp);
  var dataJson = JSON.stringify(dssp);
  localStorage.setItem("DSSP", dataJson);
  localStorage.getItem("DSSP");
  renderListcart();
  totalPrice()
}

function renderListcart() {
  var contentHTML = "";
  for (var i = 0; i < dssp.length; i++) {
    var data = dssp[i];
    var divString = `
      <div class="offCanvasItem">
          <h6>${data.name}</h6>
          <div class="gioHang">
            <div class="imageProduct">
              <img
                src="${data.image}"
                alt=""
              />
            </div>
            <!-- số lượng  -->
            <div class="soLuong">
              <span class="fa-solid fa-chevron-up" id="chevronUp"></span>
              <span id="soLuong">1</span>
              <span class="fa-solid fa-chevron-down" id="chevronDown"></span>
            </div>
            <!-- tên và giá sản phẩm  -->
            <div class="textProduct">
              <span>Giá: 
                <p id="priceOfProduct">${data.price}</p>
              </span>
              <button type="button" class="btn btnDeleteProduct col-2" onclick="removeItem(this)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    contentHTML += divString;
  }
  document.getElementById("offCanvasBody").innerHTML = contentHTML;
}

// tăng/giảm số lượng sản phẩm
document.addEventListener("DOMContentLoaded", function () {
  // Lấy ra các phần tử cần thiết
  var soLuongElement = document.getElementById("soLuong");
  var chevronUpElement = document.getElementById("chevronUp");
  var chevronDownElement = document.getElementById("chevronDown");

  // Định nghĩa hàm tăng giảm giá trị
  function updateSoLuong(index, increment) {
    var currentValue = parseInt(soLuongElement.textContent);
    var newValue = Math.max(currentValue + increment, 0);
    soLuongElement.textContent = newValue;

    // Cập nhật số lượng thực tế trong mảng dssp
    dssp[index].quantity = newValue;

    // Cập nhật lại giá trị tổng tiền
    totalPrice();
  }

  chevronUpElement.addEventListener("click", function () {
    updateSoLuong(0, 1);
  });

  chevronDownElement.addEventListener("click", function () {
    updateSoLuong(0, -1);
  });

  function totalPrice() {
    var totalPrice = 0;
    for (var i = 0; i < dssp.length; i++) {
      totalPrice += parseFloat(dssp[i].price) * dssp[i].quantity;
    }
    document.getElementById('tongTien').textContent = totalPrice;
    console.log(totalPrice);
  }

});
function totalPrice() {
  var totalPrice = 0;
  for (var i = 0; i < dssp.length; i++) {
    totalPrice += parseFloat(dssp[i].price) * dssp[i].quantity;
  }
  document.getElementById('tongTien').textContent = totalPrice;
  console.log(totalPrice);
}
function clearCart() {
  dssp = []; // Xóa toàn bộ sản phẩm khỏi mảng
  var dataJson = JSON.stringify(dssp);
  localStorage.setItem("DSSP", dataJson);
  renderListcart();
  totalPrice();
}