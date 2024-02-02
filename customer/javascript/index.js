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
      var containerId = mapProductTypeToContainerId(item.type);
  
      // Nếu không tìm thấy container, bỏ qua sản phẩm
      if (!containerId) {
        console.error(`Không tìm thấy container với productType ${item.type}.`);
        return;
      }
  
      // Tạo chuỗi HTML cho sản phẩm mới
      var divString = `<div class="productItem col-3" id="${item.id}">
        <img src="${item.image}" alt="">
        <h4>${item.productName}</h4>
        <div class="productItemPrice">
        <p>${item.productPrice}</p>
        <!-- Thêm các thông tin sản phẩm khác -->
        <button class="btn btnAddToCart"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" onclick="btnAddToCart(this)">Thêm vào giỏ hàng</button>
        </div>
        
      </div>`;
  
      // Thêm sản phẩm mới vào container tương ứng
      var containerElement = document.getElementById(containerId);
      if (containerElement) {
        containerElement.innerHTML += divString;
      } else {
        console.error(`Không tìm thấy container với ID ${containerId}.`);
      }
    });
  }
  
  // Fetch product data and render
  axios({
    url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      // Render products into corresponding containers
      renderListProduct(res.data);
    })
    .catch(function (err) {
      console.log("Lỗi", err);
    });
  




    function searchFunction() {
        var searchText = document.getElementById("searchProduct1").value.toLowerCase();
    
        axios({
            url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/user",
            method: "GET",
        })
        .then(function (res) {
            var filteredProducts = res.data.filter(function (item) {
                return item.productName.toLowerCase().includes(searchText);
            });
    
            renderListProduct(filteredProducts, "searchResults");
        })
        .catch(function (err) {
            console.log("Lỗi", err);
        });
    }
    


    // thêm sản phẩm
    // Thêm vào giỏ hàng
function btnAddToCart(button) {
    // Lấy thông tin sản phẩm từ phần tử cha
    var productItem = button.closest(".productItem");
    var productName = productItem.querySelector("h4").innerText;
    var productPrice = productItem.querySelector(".productItemPrice p").innerText;

    // Tạo đối tượng sản phẩm
    var product = {
        name: productName,
        price: productPrice,
    };

    // Lấy danh sách sản phẩm từ LocalStorage
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    var existingProduct = cartItems.find(function (item) {
        return item.name === product.name;
    });

    if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingProduct.quantity++;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
        product.quantity = 1;
        cartItems.push(product);
    }

    // Lưu danh sách sản phẩm mới vào LocalStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Hiển thị thông báo hoặc cập nhật giao diện khác nếu cần
    alert("Đã thêm sản phẩm vào giỏ hàng!");

    // Cập nhật số lượng sản phẩm trong giỏ hàng (nếu có)
    updateCartCount();
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    var cartCountElement = document.getElementById("cartItemCount");

    if (cartCountElement) {
        cartCountElement.innerText = cartItems.reduce(function (total, item) {
            return total + item.quantity;
        }, 0);
    }
}
