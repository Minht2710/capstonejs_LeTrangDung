var idEdited = null;

// Hàm tạo ID
function randomGenerateNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}
function taoID(typeProduct) {
  // Lấy thời gian hiện tại
  var ngayThangNam = new Date();
  var ngay = ngayThangNam.getDate();
  var thang = ngayThangNam.getMonth() + 1;
  var nam = ngayThangNam.getFullYear();
  var randomNumber = randomGenerateNumber();
  var maSanPham = "";

  // Tạo ID bằng cách kết hợp thông tin thời gian và mã sản phẩm
  switch (typeProduct) {
    case "1":
      maSanPham = "001";
      break;
    case "2":
      maSanPham = "002";
      break;
    case "3":
      maSanPham = "003";
      break;
    case "4":
      maSanPham = "004";
      break;
    case "5":
      maSanPham = "005";
      break;
  }

  var id = `${nam}${thang}${ngay}-${maSanPham}-${randomNumber}`;
  return id;
}

// Hàm tạo sản phẩm mới
function createProduct() {
  var productName = document.getElementById("proDuctName").value;
  var priceOfProduct = document.getElementById("priceOfProduct").value;
  var typeProduct = document.getElementById("typeProduct").value;
  var linkImageProduct = document.getElementById("linkImageProduct").value;
  var countOfProduct = document.getElementById("countOfProduct").value;
  var idProduct = taoID(typeProduct);

  var productInput = {
    productName: productName,
    type: typeProduct,
    price: priceOfProduct,
    image: linkImageProduct,
    count: countOfProduct,
    idProduct: idProduct,
  };

  axios({
    url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product",
    method: "POST",
    data: productInput,
  })
    .then((res) => {
      fetchListProduct();
      closeInput();
      alert("thêm thành công");
    })
    .catch((err) => {});
}

// Hàm render danh sách sản phẩm
function renderListProduct(productArr) {
  var contentHTML = "";
  productArr.forEach(function (item) {
    var trString = `<tr>
          <td>${item.id}</td>
          <td>${item.idProduct}</td>
          <td>${item.productName}</td>
          <td>${item.type}</td>
          <td>${item.price}</td>
          <td>${item.image}</td>
          <td>${item.count}</td>
          <td>
              <button class="btn btn-danger" onclick="deleteProduct('${item.id}')">Delete</button>
              <button class="btn btn-warning" onclick="editProduct('${item.id}')">Edit</button>
              <button class="btn btn-outline-success" onclick="importProductUICustomer('${item.id}')">Import</button>
          </td>
      </tr>`;
    contentHTML += trString;
  });
  document.getElementById("tableProductMn").innerHTML = contentHTML;
}
// Hàm render sản phẩm lên customer UI
function importProductUICustomer(product) {
  // Lấy phần HTML hiện tại của sản phẩm trên customer UI
  var currentHTML = document.getElementById("productBoxCotent").innerHTML;

  // Tạo chuỗi HTML cho sản phẩm mới
  var newProductString = `<div class="productItem" id="productItem">
    <div class="productItemImage col-4">
      <img
        id="productImage"
        src="${product.image}"
        alt=""
      />
    </div>
    <div class="productItemText col-4">
      <h4 id="productName">${product.productName}</h4>
      <div class="optionMemory">
        <button class="btnMemory" onclick="btnMemorySelected(this)">
          256GB
        </button>
        <button class="btnMemory" onclick="btnMemorySelected(this)">
          512GB
        </button>
        <button class="btnMemory" onclick="btnMemorySelected(this)">
          1 TB
        </button>
      </div>
      <ul>
        <li><p>Phần cứng mạnh mẽ đáp ứng tốc độ AI</p></li>
        <li>
          <p>
            Làm từ Titan. Cứng cáp bậc nhất bất chấp mọi thử thách
          </p>
        </li>
        <li><p>Siêu phân giải 200MP sắc nét và chân thực</p></li>
      </ul>
    </div>
    <div class="productItemPrice col-4">
      <small>Miễn phí vận chuyển</small>
      <h4 id="productPrice">${product.price}</h4>
      <ul>
        <li>Miễn phí 1 năm Samsung Care+ bảo vệ toàn diện</li>
        <li>Miễn Phí Vận Chuyển Toàn Quốc</li>
        <li>
          Đổi trả trong 14 ngày nếu phát sinh lỗi của nhà sản xuất
        </li>
        <li>Thu Cũ Đổi Mới Áp Dụng Cho Cả Thiết Bị Vỡ Màn</li>
      </ul>
      <div class="btnAddToCart">
        <!-- BUTTON ADD TO CART  -->
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
          onclick="addToCart(this)"
        >
          thêm vào giỏ hàng
        </button>

        <button class="btn">thanh toán</button>
      </div>
    </div>
  </div>`;

  // Thêm sản phẩm mới vào HTML hiện tại
  var updatedHTML = currentHTML + newProductString;
  document.getElementById("productBoxCotent").innerHTML = updatedHTML;
}

// Hàm lấy danh sách sản phẩm
function fetchListProduct() {
  axios({
    url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      renderListProduct(res.data);
    })
    .catch(function (err) {
      console.log("error", err);
    });
}

// Gọi hàm lấy danh sách sản phẩm khi trang web được tải

  axios({
    url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product",
    method: "GET",
  })
  .then(function (res) {
    renderListProduct(res.data);
  })
  .catch(function (err) {
    console.log("error", err);
  });

// xóa sản phẩm
function deleteProduct(id) {
  axios({
    url: `https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      fetchListProduct();
      alert("xóa thành công");
    })
    .catch((err) => {});
}

// edit product
// edit sản phẩm
function editProduct(id) {
  idEdited = id;
  axios({
    url: `https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then((res) => {
      var productEdit = res.data;
      // Populate the input fields with existing data
      document.getElementById("proDuctName").value = productEdit.productName;
      document.getElementById("priceOfProduct").value = productEdit.price;
      document.getElementById("typeProduct").value = productEdit.type;
      document.getElementById("linkImageProduct").value = productEdit.image;
      document.getElementById("countOfProduct").value = productEdit.count;

      // Show the input form
      addProductBtn();
    })
    .catch((err) => {
      console.log("error", err);
    });
}
function updateProduct() {
  var productName = document.getElementById("proDuctName").value;
  var priceOfProduct = document.getElementById("priceOfProduct").value;
  var typeProduct = document.getElementById("typeProduct").value;
  var linkImageProduct = document.getElementById("linkImageProduct").value;
  var countOfProduct = document.getElementById("countOfProduct").value;

  var productInput = {
    productName: productName,
    type: typeProduct,
    price: priceOfProduct,
    image: linkImageProduct,
    count: countOfProduct,
  };

  axios({
    url: `https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product/${idEdited}`,
    method: "PUT",
    data: productInput,
  })
    .then((res) => {
      fetchListProduct();
      closeInput();
      alert("Update thành công");
    })
    .catch((err) => {});
}

// render lên customerUI
function importProductUICustomer(id) {
  axios({
    url: `https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then((res) => {
      var productEdit = res.data;
      importProductToUserAPI(productEdit); // Thêm dòng này để gọi hàm xử lý import vào API người dùng
      // Populate the input fields with existing data
      document.getElementById("proDuctName").value = productEdit.productName;
      document.getElementById("priceOfProduct").value = productEdit.price;
      document.getElementById("typeProduct").value = productEdit.type;
      document.getElementById("linkImageProduct").value = productEdit.image;
      document.getElementById("countOfProduct").value = productEdit.count;
      // Show the input form
    })
    .catch((err) => {
      console.log("error", err);
    });
}

function importProductToUserAPI(product) {
  axios({
    url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/user", 
    method: "POST",
    data: {
      productName: product.productName,
      productPrice: product.price,
      productImage: product.image,
      productType: product.type,
      // ... (Thêm các thuộc tính khác của sản phẩm cần thiết)
    },
  })
    .then((response) => {
      alert("Thêm vào giao diện người dùng thành công");
    })
    .catch((error) => {
      console.log("Lỗi khi thêm vào giao diện người dùng:", error);
    });
}

// đóng mở thẻ input
function closeInput() {
  var closeInput = document.getElementById("inputProductInfo");
  closeInput.classList.remove("show");
}
function addProductBtn() {
  var openInput = document.getElementById("inputProductInfo");
  openInput.classList.add("show");
}

fetchListProduct();
