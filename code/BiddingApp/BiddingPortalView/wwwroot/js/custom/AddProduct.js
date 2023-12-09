
$(document).ready(function () {
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
    msgCount();
    loadCategory();
});
function Add() {
    var CategoryId = $("#CategoryId").val()
    var ProductName = $("#ProductName").val();
    var SDescription = $("#SDescription").val();
    var LDescription = $("#LDescription").val();
    var BasePrice = $("#BasePrice").val();
    var BiddingStartDate = $("#BiddingStartDate").val();
    var BiddingEndDate = $("#BiddingEndDate").val();
    var image = "";

    var data = new FormData();
    var fileupload1 = $("#ProductImage1").get(0);
    var file1 = fileupload1.files[0];
    data.append("fromFile", file1);
    var fileupload2 = $("#ProductImage2").get(0);
    var file2 = fileupload2.files[0];
    data.append("fromFile", file2);
    var fileupload3 = $("#ProductImage3").get(0);
    var file3 = fileupload3.files[0];
    data.append("fromFile", file3);
    var fileupload4 = $("#copyrights").get(0);
    var file4 = fileupload4.files[0];
    data.append("fromFile", file4);

    debugger

    $.ajax({
        url: "http://localhost:27311/product/upload",
        type: "POST",
        data: data,
        async: false,
        contentType: false,
        processData: false,
        success: function (result) {
            image += result;
        },
        error: function (result) {
            alert(result.responseText);
        }
    });


    var userid = sessionStorage.getItem("userId");
    var data = {
        CategoryId: CategoryId,
        ProductName: ProductName,
        Description: LDescription,
        SDescription: SDescription,
        Images: image,
        sellerid: userid,
        Price: BasePrice,
        BidStartDate: BiddingStartDate,
        BidEndDate: BiddingEndDate
    };
    AddProductAPI(data)
}
function AddProductAPI(data) {
    $('#datepopup').html("Start Date: " + $('#BiddingStartDate').val() + "  Time: 12:00 AM<br>End Date: " + $('#BiddingEndDate').val() + "  Time: 12:00 AM");
    $("#addproductmodal").modal("show");
    $.ajax({
        url: "http://localhost:57987/product/addproduct",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        success: function (result) {
            $("#exampleModal1").hide();
        },
        error: function (result) {

            alert(result.responseText);
            $("#exampleModal1").hide();
        }
    });
}
function AddCategory() {
    var data = {
        CategoryName: $('#CategoryName').val()
    };
    $.ajax({
        url: "http://localhost:57987/category/addcategory",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        success: function (result) {
            loadCategory();
            location.reload();
            $('#myModal').hide();
        },
        error: function (result) {

            alert(result.responseText);
        }
    });
}
function loadCategory() {
    $.ajax({
        url: "http://localhost:57987/category/allcategories",
        type: "GET",
        async: false,
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result[0]);
            var options = '';
            options += '<option value="0">Select Category</option>';
            $.each(result, function (key, item) {
                options += '<option value="' + item.categoryId + '">' + item.categoryName + '</option>';
            });
            $('#CategoryId').html(options);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function charCount() {
    var chars = $("#SDescription").val().length;
    $('#chars').html(chars + '/100');
}

function productValidate() {
    var isValid = true;
    var CategoryId = $("#CategoryId").val()
    var ProductName = $("#ProductName").val();
    var SDescription = $("#SDescription").val();
    var LDescription = $("#LDescription").val();
    var BasePrice = $("#BasePrice").val();
    var BiddingStartDate = $("#BiddingStartDate").val();
    var BiddingEndDate = $("#BiddingEndDate").val();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var data = new FormData();
    var fileupload1 = $("#ProductImage1").get(0);
    var file1 = fileupload1.files[0];
    data.append("fromFile", file1);
    var fileupload2 = $("#ProductImage2").get(0);
    var file2 = fileupload2.files[0];
    data.append("fromFile", file2);
    var fileupload3 = $("#ProductImage3").get(0);
    var file3 = fileupload3.files[0];
    data.append("fromFile", file3);
    var fileupload4 = $("#copyrights").get(0);
    var file4 = fileupload4.files[0];
    data.append("fromFile", file4);



    today = yyyy + '-' + mm + '-' + dd;

    if (CategoryId == "0") {
        $("#CatNameErr").html("Select a Category from the List");
        $("#CatNameErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#CatNameErr").html("");
        $("#CatNameErr").css('color', '#FFF');
    }

    if (ProductName == "") {
        $("#ProdNameErr").html("Enter Product Name");
        $("#ProdNameErr").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#ProdNameErr").html("");
        $("#ProdNameErr").css('color', '#FFF');
    }

    if (BasePrice == "" || BasePrice.length == 0) {
        $("#PriceErr").html("Enter Base Price");
        $("#PriceErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (BasePrice < 0) {
        $("#PriceErr").html("The Price is too Small");
        $("#PriceErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#PriceErr").html("");
        $("#PriceErr").css('color', '#FFF');
    }

    if (BiddingStartDate == "") {
        $("#StartDateErr").html("Select Start Date of Bid");
        $("#StartDateErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (BiddingStartDate < today) {
        $("#StartDateErr").html("Bid Start Date Should be Today or Greater");
        $("#StartDateErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#StartDateErr").html("");
        $("#StartDateErr").css('color', '#FFF');
    }

    if (BiddingEndDate == "") {
        $("#EndDateErr").html("Select End Date of Bid");
        $("#EndDateErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (BiddingStartDate > BiddingEndDate) {
        $("#StartDateErr").html("Bid Start Date is Greater End Date");
        $("#StartDateErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#EndDateErr").html("");
        $("#EndDateErr").css('color', '#FFF');
    }

    if(SDescription == "") {
        $("#SDescErr").html("Enter Short Product Description");
        $("#SDescErr").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#SDescErr").html("");
        $("#SDescErr").css('color', '#FFF');
    }

    if (LDescription == "") {
        $("#LDescErr").html("Enter Long Product Description");
        $("#LDescErr").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#LDescErr").html("");
        $("#LDescErr").css('color', '#FFF');
    }

    if (file1 == undefined) {
        $("#img1Err").html("Choose Product Image 1");
        $("#img1Err").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#img1Err").html("");
        $("#img1Err").css('color', '#FFF');
    }

    if (file2 == undefined) {
        $("#img2Err").html("Choose Product Image 2");
        $("#img2Err").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#img2Err").html("");
        $("#img2Err").css('color', '#FFF');
    }

    if (file3 == undefined) {
        $("#img3Err").html("Choose Product Image 3");
        $("#img3Err").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#img3Err").html("");
        $("#img3Err").css('color', '#FFF');
    }

    if (file4 == undefined) {
        $("#crimgErr").html("Choose Product Copyrights");
        $("#crimgErr").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#crimgErr").html("");
        $("#crimgErr").css('color', '#FFF');
    }



    debugger
    if (isValid == true) {
        Add()
    }

    return isValid;
}
function CategoryValidate() {
    var isValid = true;
    var CategoryName = $("#CategoryName").val();

    if (CategoryName == "") {
        $("#CatErr").html("Enter Category Name");
        $("#CatErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#CatErr").html("");
        $("#CatErr").css('color', '#FFF');
    }

    if (isValid == true) {
        AddCategory();
    }

    return isValid;
}