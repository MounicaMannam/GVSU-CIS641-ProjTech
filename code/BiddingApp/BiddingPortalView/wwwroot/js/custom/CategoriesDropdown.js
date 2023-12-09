$(document).ready(function () {
    loadCategoryinhome();
    wishlistcount();
});
function loadCategoryinhome() {
    $.ajax({
        url: "http://localhost:57987/category/allcategories",
        type: "GET",
        async: false,
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result[0]);
            var hreflinks = "";
            $.each(result, function (key, item) {
                hreflinks += '<button class="dropdown-item" onclick="return cat('+item.categoryId+');" style="text-decoration:none"> ' + item.categoryName + '</button>';
            });
            $('#categoryld').html(hreflinks);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function wishlistcount() {
    $.ajax({
        url: "http://localhost:57987/wishlist/getwishlist/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            var count = result.length;
            $("#WishlistCount").html(count);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function cat(catid) {
    if (sessionStorage.getItem("userId") == null) {
        
    }
    else {
        sessionStorage.setItem("catid", catid);
        location.replace("http://localhost:27311/product/categoryproduct/" + catid);
    }
}
