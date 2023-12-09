$(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip({
            placement: 'bottom',
        });
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
    profileLoader();
    myProductsLoader();
    myBidsLoader()
    myIntrestsLoader();
    mySoldProductsLoader();
    myPurchasesLoader();
    myTransactionsLoader();
    if (sessionStorage.getItem("payment") == "yes") {
        myTransactionsdisplay();
        sessionStorage.removeItem("payment");
    }
    else {
        myProductsdisplay();
    }
});

function profileLoader() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    $('#UName').html(user.firstName);
    $('#UEmail').html(user.email);
    $('#UPhone').html(user.phoneNumber);
    $('#ULocation').html(user.city + ", " +user.state + " - " +user.zip);
    debugger
}

function myProductsLoader() {
    $.ajax({
        url: "http://localhost:57987/bid/myproducts/"+sessionStorage.getItem("userId"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            var product = "";
            if (result.length > 0) {
                product += '<div class="text-center mb-4 col-md-11" style="margin-left:70px;">';
                product += '<h2 class="section-title px-5"><span class="px-2" style="color:#1C1C1C">My Products</span></h2>';
                product += '</div>';
                
            }
            else {
               /* No product Image*/
            }
            $('#UPCount').html(result.length);
            $.each(result, function (key, item) {
                product += '<div class="col-lg-3 pb-5" style="padding-left:2%!important; padding-right:2%!important;">';
                product += '<div class="card p-0">';
                product += '<div class="card-image">';
                product += '<img class="card-img-top" src="http://localhost:27311/Pimages/'+item.displayImage+'" alt="">';
                product += '</div>';
                product += '<div class="card-content d-flex flex-column align-items-center">';
                product += '<h4 class="pt-2">' + item.productName +'</h4>';
                product += '<h5 style="font-size:large;"><span style="font-family:Roboto; margin-right:3px;">$</span>'+item.price+'</h5>';

                product += '<ul class="social-icons d-flex justify-content-center">';
                product += '<li style="--i:1">';
                product += '<button class="btn" onclick="checkproductpa(' + item.bidId +')" style="font-size:large; padding:0!important;">';
                product += '<span class="fa-solid fa-eye text-white" data-toggle="tooltip" data-original-title="View"></span>';
                product += '</button>';
                product += '</li>';
                product += '<li style="--i:2">';
                product += '<button class="btn" onclick="editproduct(' + item.bidId +');" style="font-size:large; padding:0!important;">';
                product += '<span class="fa-solid fa-pencil text-white" data-toggle="tooltip" data-original-title="Edit"></span>';
                product += '</button>';
                product += '</li>';
                product += '<li style="--i:3">';
                product += '<button class="btn" onclick="deleteproduct(' + item.bidId +');" style="font-size:large; padding:0!important;">';
                product += '<span class="fa-solid fa-trash text-white" data-toggle="tooltip" data-original-title="Delete"></span>';
                product += '</button>';
                product += '</li>';
                product += '</ul>';
                product += '</div>';
                product += '</div>';
                product += '</div>';
                
            });
            $('#myProducts').html(product);
            
        },

        error: function (result) {
            alert(result.responseText);
        }

    });
}
function myIntrestsLoader() {
    $.ajax({
        url: "http://localhost:57987/bid/getUSerBids/" + sessionStorage.getItem("userId"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            var product = "";
            if (result.length > 0) {
                product += '<div class="text-center mb-4 col-md-11" style="margin-left:70px;">';
                product += '<h2 class="section-title px-5"><span class="px-2" style="color:#1C1C1C">My Intrests</span></h2>';
                product += '</div>';
            }
            else {
                /* No product Image*/
            }
            $('#UICount').html(result.length);
            $.each(result, function (key, item) {
                product += '<div class="col-lg-3 pb-5" style="padding-left:2%!important; padding-right:2%!important;">';
                product += '<div class="card p-0">';
                product += '<div class="card-image">';
                product += '<img class="card-img-top" src="http://localhost:27311/Pimages/' + item.displayImage + '" alt="">';
                product += '</div>';
                product += '<div class="card-content d-flex flex-column align-items-center">';
                product += '<h4 class="pt-2">' + item.productName + '</h4>';
                product += '<h5 style="font-size:large;"><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h5>';

                product += '<ul class="social-icons d-flex justify-content-center">';
                product += '<li style="--i:1">';
                product += '<button class="btn" onclick="checkproduct(' + item.bidId + ')" style="font-size:large; padding:0!important;">';
                product += '<span class="fa-solid fa-eye text-white" data-toggle="tooltip" data-original-title="View"></span>';
                product += '</button>';
                product += '</li>';
                product += '</ul>';
                product += '</div>';
                product += '</div>';
                product += '</div>';

            });
            $('#myIntrests').html(product);
  
        },

        error: function (result) {
            alert(result.responseText);
        }

    });
}
function myBidsLoader() {
    $.ajax({
        url: "http://localhost:57987/bid/getmybids/" + sessionStorage.getItem("userId"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            var product = "";
            if (result.length > 0) {
                product += '<div class="text-center mb-4 col-md-11" style="margin-left:70px;">';
                product += '<h2 class="section-title px-5"><span class="px-2" style="color:#1C1C1C">My Bids</span></h2>';
                product += '</div>';
            }
            else {
                /* No product Image*/
            }
            $('#UBCount').html(result.length);
            $.each(result, function (key, item) {
                product += '<div class="col-lg-3 pb-5" style="padding-left:2%!important; padding-right:2%!important;">';
                product += '<div class="card p-0">';
                product += '<div class="card-image">';
                product += '<img class="card-img-top" src="http://localhost:27311/Pimages/' + item.displayImage + '" alt="">';
                product += '</div>';
                product += '<div class="card-content d-flex flex-column align-items-center">';
                product += '<h4 class="pt-2">' + item.productName + '</h4>';
                product += '<h5 style="font-size:large;"><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h5>';
                product += '</div>';
                product += '</div>';
                product += '</div>';

            });
            $('#myBids').html(product);

        },

        error: function (result) {
            alert(result.responseText);
        }

    });
}
function mySoldProductsLoader() {
    
    $.ajax({
        url: "http://localhost:57987/user/yourhistory/" + sessionStorage.getItem("userId"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            var product = "";
            if (result.length > 0) {
                product += '<div class="text-center mb-4 col-md-11" style="margin-left:70px;">';
                product += '<h2 class="section-title px-5"><span class="px-2" style="color:#1C1C1C">My Sold Products</span></h2>';
                product += '</div>';
            }
            else {
                /* No product Image*/
            }
            $('#USPCount').html(result.length);
            $.each(result, function (key, item) {
                product += '<div class="col-lg-3 pb-5" style="padding-left:2%!important; padding-right:2%!important;">';
                product += '<div class="card p-0">';
                product += '<div class="card-image">';
                product += '<img class="card-img-top" src="http://localhost:27311/Pimages/' + item.displayImage + '" alt="">';
                product += '</div>';
                product += '<div class="card-content d-flex flex-column align-items-center">';
                product += '<h4 class="pt-2">' + item.productName + '</h4>';
                product += '<h5 style="font-size:large;"><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h5>';
                product += '</div>';
                product += '</div>';
                product += '</div>';

            });
            $('#soldProducts').html(product);

        },

        error: function (result) {
            alert(result.responseText);
        }

    });
}
function myPurchasesLoader() {
  
    $.ajax({
        url: "http://localhost:57987/user/yourpurchases/" + sessionStorage.getItem("userId"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            var product = "";
            if (result.length > 0) {
                product += '<div class="text-center mb-4 col-md-11" style="margin-left:70px;">';
                product += '<h2 class="section-title px-5"><span class="px-2" style="color:#1C1C1C">My Purchases</span></h2>';
                product += '</div>';
            }
            else {
                /* No product Image*/
            }
            $('#UPPCount').html(result.length);
            $.each(result, function (key, item) {
                product += '<div class="col-lg-3 pb-5" style="padding-left:2%!important; padding-right:2%!important;">';
                product += '<div class="card p-0">';
                product += '<div class="card-image">';
                product += '<img class="card-img-top" src="http://localhost:27311/Pimages/' + item.displayImage + '" alt="">';
                product += '</div>';
                product += '<div class="card-content d-flex flex-column align-items-center">';
                product += '<h4 class="pt-2">' + item.productName + '</h4>';
                product += '<h5 style="font-size:large;"><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h5>';
                product += '</div>';
                product += '</div>';
                product += '</div>';

            });
            $('#myPurchases').html(product);
            
        },

        error: function (result) {
            alert(result.responseText);
        }

    });
}
function myTransactionsLoader() {

    $.ajax({
        url: "http://localhost:57987/bid/mytransactions/" + sessionStorage.getItem("userId"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            var product = "";
            if (result.length > 0) {
                product += '<div class="text-center mb-4 col-md-11" style="margin-left:70px;">';
                product += '<h2 class="section-title px-5"><span class="px-2" style="color:#1C1C1C">My Transactions</span></h2>';
                product += '</div>';
            }
            else {
                /* No product Image*/
            }
            $('#UTCount').html(result.length);
            $.each(result, function (key, item) {
                product += '<div class="col-lg-3 pb-5" style="padding-left:2%!important; padding-right:2%!important;">';
                product += '<div class="card p-0">';
                product += '<div class="card-image">';
                product += '<img class="card-img-top" src="http://localhost:27311/Pimages/' + item.displayImage + '" alt="">';
                product += '</div>';
                product += '<div class="card-content d-flex flex-column align-items-center">';
                product += '<h4 class="pt-2">' + item.productName + '</h4>';
                product += '<h5 style="font-size:large;"><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h5>';

                product += '<ul class="social-icons d-flex justify-content-center">';
                product += '<li style="--i:3">';
                product += '<button class="btn" onclick="paynow(' + item.bidId + ',' + item.price + '); " style="font - size: large; padding: 0!important; ">';
                product += '<span class="text-white" data-toggle="tooltip" data-original-title="Delete">Pay Now</span>';
                product += '</button>';
                product += '</li>';
                product += '</ul>';
                product += '</div>';
                product += '</div>';
                product += '</div>';

            });
            $('#myTransactions').html(product);

        },

        error: function (result) {
            alert(result.responseText);
        }

    });
}
function paynow(bid,price) {
    sessionStorage.setItem("bidId", bid);
    sessionStorage.setItem("price", price);
    location.replace("http://localhost:27311/user/payment");
}
function myProductsdisplay() {
    $('#myProducts').show();
    $('#myBids').hide();
    $('#myIntrests').hide();
    $('#soldProducts').hide();
    $('#myPurchases').hide();
    $('#myTransactions').hide();
}
function myIntrestsdisplay() {
    $('#myProducts').hide();
    $('#myBids').hide();
    $('#myIntrests').show();
    $('#soldProducts').hide();
    $('#myPurchases').hide();
    $('#myTransactions').hide();
}
function myBidsdisplay() {
    $('#myBids').show();
    $('#myProducts').hide();
    $('#myIntrests').hide();
    $('#soldProducts').hide();
    $('#myPurchases').hide();
    $('#myTransactions').hide();
}
function mySoldProductsdisplay() {
    $('#myProducts').hide();
    $('#myBids').hide();
    $('#myIntrests').hide();
    $('#soldProducts').show();
    $('#myPurchases').hide();
    $('#myTransactions').hide();
}
function myPurchasesdisplay() {
    $('#myProducts').hide();
    $('#myBids').hide();
    $('#myIntrests').hide();
    $('#soldProducts').hide();
    $('#myPurchases').show();
    $('#myTransactions').hide();
}
function myTransactionsdisplay() {
    $('#myProducts').hide();
    $('#myBids').hide();
    $('#myIntrests').hide();
    $('#soldProducts').hide();
    $('#myPurchases').hide();
    $('#myTransactions').show();
}

function editproduct(bid) {
    sessionStorage.setItem("bidid", bid);
    location.replace("http://localhost:27311/product/editproduct/" + bid);
}
function deleteproduct(bid) {
    sessionStorage.setItem("bidid", bid);
    $('#editproductmodal').modal('show');
}
function deletepro() {
    $.ajax({
        url: "http://localhost:57987/bid/delete/" + sessionStorage.getItem("bidid"),
        type: "POST",
        dataType: "json",
        async: false,
        success: function (result) {
            sessionStorage.removeItem("bidid");
            $('#editproductmodal').modal('hide');
            myProductsLoader();
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}
function checkproductpa(bid) {
    //if (/*sessionStorage.getItem("userId") == null || */sessionStorage.getItem("userId") == "") {
    //    $("#homecheckproductmodal").modal("show");
    //}
    //else {
    sessionStorage.setItem("bid", bid);
    location.replace("http://localhost:27311/product/usercheckproduct/" + bid);

    /*  }*/
}