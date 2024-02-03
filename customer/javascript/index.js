// Hàm chuyển đổi productType thành container ID
function mapProductTypeToContainerId(productType) {
  switch (productType) {
    case "1":
      return "productBoxMobie";
    case "2":
      return "productBoxTablet";
    case "3":
      return "productBoxWatch";
    case "4":
      return "productBoxBuds";
    case "5":
      return "productBoxAccessory";
    default:
      return "";
  }
}

// Hàm render danh sách sản phẩm
function renderListProduct(productArr) {
  productArr.forEach(function (item) {
    // Chuyển đổi productType thành container ID
    var containerId = mapProductTypeToContainerId(item.productType);

    // Nếu không tìm thấy container, bỏ qua sản phẩm
    if (!containerId) {
      console.error(`Không tìm thấy container với productType ${item.type}.`);
      return;
    }
    var divString = `<div class="productItem col-3" id="${item.id}">
    <img src="${item.productImage}" alt="" id="imageProduct">
    <h4 id="productName">${item.productName}</h4>
    <div class="productItemPrice">
    <p id="priceProduct">${item.productPrice}</p>
    <button class="btn btnAddToCart"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" onclick="addToCart()">Thêm vào giỏ hàng</button>
    </div>
    
  </div>`;

    // Thêm sản phẩm mới 
    var containerElement = document.getElementById(containerId);
    if (containerElement) {
      containerElement.innerHTML += divString;
    } else {
      console.error(`Không tìm thấy container với ID ${containerId}.`);
    }
  });
}

axios({
  url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/user",
  method: "GET",
})
  .then(function (res) {
    renderListProduct(res.data);
  })
  .catch(function (err) {
    console.log("Lỗi", err);
  });

  