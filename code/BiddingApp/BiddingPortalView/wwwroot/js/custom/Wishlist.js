$(document).ready(function () {
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
    wishlistloader();
    msgCount();
});
function wishlistloader() {

    $.ajax({
        url: "http://localhost:57987/wishlist/getwishlist/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            var displayhtml = '';
            var timerId = "";
            $.each(result, function (key, item) {
                displayhtml += '<div class="col-lg-3 col-md-6 col-sm-12 pb-1">';
                displayhtml += '<div class="card product-item border-0 mb-4">';
                displayhtml += '<div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style="border:1px solid #d2d2d2!important; border-bottom:0px!important; border-top-left-radius:1rem;">';
                displayhtml += '<img class="card-img-top img-fluid w-100" src="http://localhost:27311/Pimages/' + item.displayImage + '" alt="">';
                displayhtml += '<span id="timerid' + item.bidId + '" class="HomeEnddate"></span>';
                displayhtml += '</div>';
                displayhtml += '<div class="card-body border-left border-right text-center p-0 pt-4 pb-3" style="border: 1px solid #d2d2d2!important; border-bottom:0px!important;">';
                displayhtml += '<h6 class="text-truncate mb-3">' + item.productName + '</h6>';
                displayhtml += '<div class="d-flex justify-content-center">';
                displayhtml += '<h6><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h6>';
                displayhtml += '</div>';
                displayhtml += '<div><h6>' + item.endDate + '</h6></div>';
                displayhtml += '</div>';
                displayhtml += '<div class="card-footer d-flex justify-content-between bg-light border" style="border: 1px solid #d2d2d2!important; border-bottom-right-radius:1rem;">';
                displayhtml += '<button class="btn btn-sm text-dark p-0" style="decoration:none" onclick="checkproduct(' + item.bidId + ')"><i class="fas fa-eye text-primary mr-1"></i>Check Product</button>';
                displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return removeWishlist1(' + item.bidId + ');"><i class="fa-solid fa-heart-crack text-danger mr-1"></i>Unfavourite</button>';
                displayhtml += '</div>';
                displayhtml += '</div>';
                displayhtml += '</div>';
                timerId = 'timerid' + item.bidId;
                loadtimer(timerId, item.endDate,1);
            });
            $("#Wishlist").html(displayhtml);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadtimer(timerid, enddate, inc) {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    var displaytimer = '';
    const date = new Date(enddate);
    let offer = date.setDate(date.getDate() + inc),
        countDown = new Date(offer).getTime(),
        x = setInterval(function () {
            displaytimer = '';
            let now = new Date().getTime(),
                distance = countDown - now;
            if ((Math.floor(distance / (day))) != 0) {
                displaytimer += (Math.floor(distance / (day))) + 'd '
            }
            displaytimer += (Math.floor((distance % (day)) / (hour))) + 'h ',
                displaytimer += (Math.floor((distance % (hour)) / (minute))) + 'm ',
                displaytimer += (Math.floor((distance % (minute)) / second)) + 's ';
            document.getElementById(timerid).innerHTML = displaytimer;
        }, 0)

}
function checkproduct(bid) {
    //if (/*sessionStorage.getItem("userId") == null || */sessionStorage.getItem("userId") == "") {
    //    $("#homecheckproductmodal").modal("show");
    //}
    //else {
    sessionStorage.setItem("bid", bid);
    location.replace("http://localhost:27311/product/checkproduct/" + bid);

    /*  }*/
}
function removeWishlist1(bid) {
    var dataobj = {
        Buyerid: sessionStorage.getItem("userId"),
        BidId: bid
    };
    $.ajax({
        url: "http://localhost:57987/bid/deletewishlist/",
        type: "POST",
        data: dataobj,
        dataType: "json",
        async: false,
        success: function (result) {
            if (result == 'The Product is already in your WishList') {
            }

            else {
                var displayhtml = '';
                var wishlist = sessionStorage.getItem("wish");
                displayhtml += '<button class="btn btn-sm text-dark p-0" style="decoration:none" onclick="checkproduct(' + bid + ')"><i class="fas fa-eye text-primary mr-1"></i>Check Product</button>';
                displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return wishlist(' + bid + ');"><i class="fas fa-heart text-primary mr-1"></i>Favourite</button>';
                $("#pbuttons" + bid).html(displayhtml);
                wishlistcount();
                wishlistloader();
            }
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}
