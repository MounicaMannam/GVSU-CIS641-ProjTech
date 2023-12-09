$(document).ready(function () {
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
    msgCount();
    loadeditproduct();
});
function loadeditproduct() {

    $.ajax({
        url: "http://localhost:57987/user/checkproduct/" + sessionStorage.getItem("bidid"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            var startd = new Date(result.startDate);
            startd.setDate(startd.getDate() + 1);
            var endd = new Date(result.endDate);
            endd.setDate(endd.getDate() + 1);
            $("#ProductName").val(result.productName);
            $("#BasePrice").val(result.price);
            $("#BiddingStartDate").val(startd.toISOString().slice(0, 10));
            $("#SDescription").val(result.description);
            $("#LDescription").val(result.lDescription);
            $("#BiddingEndDate").val(endd.toISOString().slice(0, 10));
            if (new Date(result.startDate) < new Date()) {
                $("#ProductName").val(result.productName);
                $("#BasePrice").val(result.price);
                $("#BiddingStartDate").val(startd.toISOString().slice(0, 10));
                document.getElementById("ProductName").disabled = true;
                document.getElementById("BasePrice").disabled = true;
                document.getElementById("BiddingStartDate").disabled = true;
            }
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}
function Update() {
    var ProductName = $("#ProductName").val();
    var SDescription = $("#SDescription").val();
    var LDescription = $("#LDescription").val();
    var BiddingStartDate = $("#BiddingStartDate").val();
    var BiddingEndDate = $("#BiddingEndDate").val();
    var BasePrice = $("#BasePrice").val();
    var data = {
        ProductName: ProductName,
        SDescription: SDescription,
        LDescription: LDescription,
        BidStartDate: BiddingStartDate,
        BidEndDate: BiddingEndDate,
        Price: BasePrice,
        BidId: sessionStorage.getItem("bidid")
    }
    debugger
    $.ajax({
        url: "http://localhost:57987/product/editproduct/",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        success: function (result) {
            sessionStorage.removeItem("bidid");
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}
function charCount() {
    var chars = $("#SDescription").val().length;
    $('#chars').html(chars + '/100');
}
function productValidate() {
    var isValid = true;
    var ProductName = $("#ProductName").val();
    var SDescription = $("#SDescription").val();
    var LDescription = $("#LDescription").val();
    var BiddingStartDate = $("#BiddingStartDate").val();
    var BiddingEndDate = $("#BiddingEndDate").val();
    var Price = $("#BasePrice").val();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
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

    if (SDescription == "") {
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

    if (isValid == true) {
        Update()
    }

    return isValid;
}