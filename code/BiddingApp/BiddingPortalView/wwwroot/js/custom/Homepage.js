$(document).ready(function () {
    loaderMain("Preloader");
    wishlistcount();
    justarrivedproducts();
    trendyproducts();
    upcomingproducts();
    setInterval(function () {
        loaderStop();
    }, 500);
});

function justarrivedproducts() {
    $.ajax({
        url: "http://localhost:57987/bid/getBidsByUserId/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            var c = result.length;
            if (c == 0) {
                $("#justarrivedproductstitle").hide();
            }
            else {
            var displayhtml = '';
            var timerId = "";
            var wishlist = sessionStorage.getItem("wish");
            $.each(result, function (key, item) {
                displayhtml += '<div class="col-lg-3 col-md-6 col-sm-12 pb-1">';
                displayhtml += '<div class="card product-item border-0 mb-4">';
                displayhtml += '<div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style="border:1px solid #d2d2d2!important; border-bottom:0px!important; border-top-left-radius:1rem;">';
                displayhtml += '<img class="card-img-top img-fluid w-100" src="Pimages/' + item.displayImage + '" alt="">';
                displayhtml += '<span id="timerid' + item.bidId + '" class="HomeEnddate"></span>';
                displayhtml += '</div>';
                displayhtml += '<div class="card-body border-left border-right text-center p-0 pt-4 pb-3" style="border: 1px solid #d2d2d2!important; border-bottom:0px!important;">';
                displayhtml += '<h6 class="text-truncate mb-3">' + item.productName + '</h6>';
                displayhtml += '<div class="d-flex justify-content-center">';
                displayhtml += '<h6><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h6>';
                displayhtml += '</div>';
                displayhtml += '<div><h6>End Date : ' + item.endDate + '</h6></div>';
                displayhtml += '</div>';
                displayhtml += '<div id="pbuttons' + item.bidId + '" class="card-footer d-flex justify-content-between bg-light border" style="border: 1px solid #d2d2d2!important; border-bottom-right-radius:1rem;">';
                displayhtml += '<button class="btn btn-sm text-dark p-0" style="decoration:none" onclick="checkproduct(' + item.bidId + ')"><i class="fas fa-eye text-primary mr-1"></i>Check Product</button>';

                if (wishlist != null && wishlist.includes(item.bidId + '')) {
                    displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return removeWishlist(' + item.bidId + ');"><i class="fa-solid fa-heart-crack text-danger mr-1"></i>Unfavourite</button>';
                }
                else {
                    displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return wishlist(' + item.bidId + ');"><i class="fas fa-heart text-primary mr-1"></i>Favourite</button>';
                }
                displayhtml += '</div>';
                displayhtml += '</div>';
                displayhtml += '</div>';
                displayhtml += '<br>';
                timerId = 'timerid' + item.bidId;
                loadtimer(timerId, item.endDate, 1);
            });
            $("#justarrivedproducts").html(displayhtml);

        }
    },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function trendyproducts() {

    $.ajax({
        url: "http://localhost:57987/bid/gettrendingbids/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            var c = result.length;
            if (c == 0) {
                $("#trendyproductstitle").hide();
            }
            else {
                var displayhtml = '';
                var timerId = "";
                var wishlist = sessionStorage.getItem("wish");
                $.each(result, function (key, item) {
                    displayhtml += '<div class="col-lg-3 col-md-6 col-sm-12 pb-1">';
                    displayhtml += '<div class="card product-item border-0 mb-4">';
                    displayhtml += '<div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style="border:1px solid #d2d2d2!important; border-bottom:0px!important; border-top-left-radius:1rem;">';
                    displayhtml += '<img class="card-img-top img-fluid w-100" src="Pimages/' + item.displayImage + '" alt="">';
                    displayhtml += '<span id="trtimerid' + item.bidId + '" class="HomeEnddate"></span>';
                    displayhtml += '</div>';
                    displayhtml += '<div class="card-body border-left border-right text-center p-0 pt-4 pb-3" style="border: 1px solid #d2d2d2!important; border-bottom:0px!important;">';
                    displayhtml += '<h6 class="text-truncate mb-3">' + item.productName + '</h6>';
                    displayhtml += '<div class="d-flex justify-content-center">';
                    displayhtml += '<h6><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h6>';
                    displayhtml += '</div>';
                    displayhtml += '<div><h6>End Date : ' + item.endDate + '</h6></div>';
                    displayhtml += '</div>';
                    displayhtml += '<div id="pbuttons' + item.bidId + '" class="card-footer d-flex justify-content-between bg-light border" style="border: 1px solid #d2d2d2!important; border-bottom-right-radius:1rem;">';
                    displayhtml += '<button class="btn btn-sm text-dark p-0" style="decoration:none" onclick="checkproduct(' + item.bidId + ')"><i class="fas fa-eye text-primary mr-1"></i>Check Product</button>';

                    if (wishlist != null && wishlist.includes(item.bidId + '')) {
                        displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return removeWishlist(' + item.bidId + ');"><i class="fa-solid fa-heart-crack text-danger mr-1"></i>Unfavourite</button>';
                    }
                    else {
                        displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return wishlist(' + item.bidId + ');"><i class="fas fa-heart text-primary mr-1"></i>Favourite</button>';
                    }
                    displayhtml += '</div>';
                    displayhtml += '</div>';
                    displayhtml += '</div>';
                    timerId = 'trtimerid' + item.bidId;
                    loadtimer(timerId, item.endDate, 1);
                });

                $("#trendyproducts").html(displayhtml);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function upcomingproducts() {

    $.ajax({
        url: "http://localhost:57987/bid/getupcomingbids/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            var c = result.length;
            if (c == 0) {
                $("#upcomingproductstitle").hide();
            }
            else {
                var displayhtml = '';
                var timerId = '';
                var wishlist = sessionStorage.getItem("wish");
                $.each(result, function (key, item) {
                    displayhtml += '<div class="col-lg-3 col-md-6 col-sm-12 pb-1">';
                    displayhtml += '<div class="card product-item border-0 mb-4">';
                    displayhtml += '<div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style="border:1px solid #d2d2d2!important; border-bottom:0px!important; border-top-left-radius:1rem;">';
                    displayhtml += '<img class="card-img-top img-fluid w-100" src="Pimages/' + item.displayImage + '" alt="">';
                    displayhtml += '<span id="timerid' + item.bidId + '" class="HomeEnddate"></span>';
                    displayhtml += '</div>';
                    displayhtml += '<div class="card-body border-left border-right text-center p-0 pt-4 pb-3" style="border: 1px solid #d2d2d2!important; border-bottom-right-radius:1rem!important;">';
                    displayhtml += '<h6 class="text-truncate mb-3">' + item.productName + '</h6>';
                    displayhtml += '<div class="d-flex justify-content-center">';
                    displayhtml += '<h6><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h6>';
                    displayhtml += '</div>';
                    displayhtml += '<div><h6> Start Date : ' + item.startDate + '</h6></div>';
                    displayhtml += '</div>';
                    
                    displayhtml += '</div>';
                    displayhtml += '</div>';
                    timerId = 'timerid' + item.bidId;
                    loadtimer(timerId, item.startDate, 0);
                });

                $("#upcomingproducts").html(displayhtml);
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}