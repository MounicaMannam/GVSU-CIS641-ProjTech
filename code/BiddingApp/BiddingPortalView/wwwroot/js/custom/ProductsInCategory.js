$(document).ready(function () {
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
    categoryproducts();
    msgCount();
});

function categoryproducts() {
    var id = sessionStorage.getItem("userId");
    var obj = {
        Buyerid: id,
        CategoryId: sessionStorage.getItem("catid")
    };
    $.ajax({
        url: "http://localhost:57987/bid/getproductsbycatid/",
        type: "GET",
        async: false,
        data: obj,
        dataType: "json",
        success: function (result) {
            $("#categoryname").html(result[0].categoryName);
            var displayhtml = '';
            var timerId = "";
            $.each(result, function (key, item) {
                displayhtml += '<div class="col-lg-3 col-md-6 col-sm-12 pb-1">';
                displayhtml += '<div class="card product-item border-0 mb-4">';
                displayhtml += '<div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0" style="border:1px solid #d2d2d2!important; border-bottom:0px!important; border-top-left-radius:1rem;">';
                displayhtml += '<img class="card-img-top img-fluid w-100" src="http://localhost:27311/Pimages/'+ item.displayImage + '" alt="">';
                displayhtml += '<span id="cattimerid' + item.bidId + '" class="HomeEnddate"></span>';
                displayhtml += '</div>';
                displayhtml += '<div class="card-body border-left border-right text-center p-0 pt-4 pb-3" style="border: 1px solid #d2d2d2!important; border-bottom:0px!important;">';
                displayhtml += '<h6 class="text-truncate mb-3">' + item.productName + '</h6>';
                displayhtml += '<div class="d-flex justify-content-center">';
                displayhtml += '<h6>Rs. ' + item.price + '</h6>';
                displayhtml += '</div>';
                displayhtml += '<div><h6>' + item.endDate + '</h6></div>';
                displayhtml += '</div>';
                displayhtml += '<div class="card-footer d-flex justify-content-between bg-light border" style="border: 1px solid #d2d2d2!important; border-bottom-right-radius:1rem;">';
                displayhtml += '<button class="btn btn-sm text-dark p-0" style="decoration:none" onclick="checkproduct(' + item.bidId + ')"><i class="fas fa-eye text-primary mr-1"></i>View Detail</button>';
                displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return wishlist(' + item.bidId + ');"><i class="fas fa-heart text-primary mr-1"></i>Add To Wishlist</button>';
                displayhtml += '</div>';
                displayhtml += '</div>';
                displayhtml += '</div>';
                timerId = 'cattimerid' + item.bidId;
                loadtimer(timerId, item.endDate);
            });
            $("#catproducts").html(displayhtml);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadtimer(timerid, enddate) {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    var displaytimer = '';
    const date = new Date(enddate);
    let offer = date.setDate(date.getDate() + 1),
        countDown = new Date(offer).getTime(),
        x = setInterval(function () {
            displaytimer = '';
            let now = new Date().getTime(),
                distance = countDown - now;
            displaytimer += (Math.floor(distance / (day))) + 'D ',
                displaytimer += (Math.floor((distance % (day)) / (hour))) + 'h ',
                displaytimer += (Math.floor((distance % (hour)) / (minute))) + 'm ',
                displaytimer += (Math.floor((distance % (minute)) / second)) + 's ';
            document.getElementById(timerid).innerHTML = displaytimer;
        }, 0)

}