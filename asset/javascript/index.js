// Hàm tạo ID
function taoID(typeProduct) {
  // Lấy thời gian hiện tại
  var ngayThangNam = new Date();
  var ngay = ngayThangNam.getDate();
  var thang = ngayThangNam.getMonth() + 1;
  var nam = ngayThangNam.getFullYear();
  var maSanPham = '';

  // Tạo ID bằng cách kết hợp thông tin thời gian và mã sản phẩm
  switch (typeProduct) {
      case "1":
          maSanPham = '001';
          break;
      case "2":
          maSanPham = '002';
          break;
      case "3":
          maSanPham = '003';
          break;
  }

  var id = `${nam}${thang}${ngay}-${maSanPham}`;
  return id;
}

// Hàm tạo sản phẩm mới
function createProduct() {
  var productName = document.getElementById("proDuctName").value;
  var priceOfProduct = document.getElementById("priceOfProduct").value;
  var typeProduct = document.getElementById("typeProduct").value;
  var linkImageProduct = document.getElementById("linkImageProduct").value;
  var countOfProduct = document.getElementById("countOfProduct").value;

  // Tạo ID
  var idProduct = taoID(typeProduct);

  var productInput = {
      productName: productName,
      type: typeProduct,
      price: priceOfProduct,
      image: linkImageProduct,
      count: countOfProduct,
      idProduct: idProduct,
  };

  console.log(productInput);

  axios({
      url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product",
      method: "POST",
      data: productInput,
  })
      .then((res) => {
          fetchListProduct();
          closeInput();
          alert("thêm thành công")
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
              <button class="btn btn-warning">Edit</button>
              <button class="btn btn-outline-success">Import</button>
          </td>
      </tr>`;
      contentHTML += trString;
  });
  document.getElementById("tableProductMn").innerHTML = contentHTML;
}

// Hàm lấy danh sách sản phẩm
function fetchListProduct() {
  axios({
      url: "https://65b1f3e29bfb12f6eafc70fd.mockapi.io/product",
      method: "GET",
  })
      .then(function (res) {
          console.log("Kết quả", res);
          products = res.data;
          renderListProduct(res.data);
          console.log(products);
      })
      .catch(function (err) {
          console.log("error", err);
      });
}
function closeInput(){
  var closeInput = document.getElementById('inputProductInfo');
  closeInput.classList.remove('show');
}
// Gọi hàm lấy danh sách sản phẩm khi trang web được tải
fetchListProduct();
