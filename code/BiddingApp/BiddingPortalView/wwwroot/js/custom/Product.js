$(document).ready(function () {
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
    loadProduct();
    msgCount();
    topbids();
    similarproducts();
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });
    init_carousel();
});
function loadProduct() {
    $.ajax({
        url: "http://localhost:57987/user/checkproduct/" + sessionStorage.getItem("bid"),
    type: "GET",
        dataType: "json",
            async: false,
        success: function (result) {
            debugger
                    var img1 = '<img class="card-img-top" style="height:35vw;" src="http://localhost:27311/Pimages/' + result.image1 + ' " alt="Image" />';
                    var img2 = '<img class="card-img-top" style="height:35vw;" src="http://localhost:27311/Pimages/' + result.image2 + ' " alt="Image" />';
                    var img3 = '<img class="card-img-top" style="height:35vw;" src="http://localhost:27311/Pimages/' + result.image3 + ' " alt="Image" />';
                    var sEmail = '<a href="mailto:' + result.email + '">' + result.email + '</a>';
                    $('#pic-1').html(img1);
                    $('#pic-2').html(img2);
                    $('#pic-3').html(img3);
                    $('#sellerName').html(result.sellerName);
                    $('#product-name').html(result.productName);
                    $('#product-price').html('<span style="font-family:Roboto; margin-right:3px;">$</span>' + result.price);
                    $('#productDescription').html(result.description);
                    $('#productLdescription').html(result.lDescription);
                    $('#phone').html(result.phone);
                    $('#sellerEmail').html(sEmail);
                    $('#startdate').html(result.startDate);
                    $('#enddate').html(result.endDate);
                    var biddate = new Date(result.startDate);
                    if (biddate > new Date()) {
                        $('#bidbutton').hide();
                        $('#timetxt').html('Bid Starts In');
                        producttimer(result.startDate,0);
                    }

                    else{
                        $('#bidbutton').show();
                        $('#timetxt').html('Time Left');
                        producttimer(result.endDate,1);
                    }
                },
    error: function (result) {
        alert(result.responseText);
    }
});

}

function bidnow() {
    var dataobj = {
        Buyerid: sessionStorage.getItem("userId"),
        BidId: sessionStorage.getItem("bid")
};
$.ajax({
    url: "http://localhost:57987/bid/updatebid",
    type: "POST",
    data: dataobj,
    dataType: "json",
    async: false,
    success: function (result) {
        $('#currentpricepopup').html("Next Bid Price: $" + result);
        $("#checkproductModal").modal("show");
    },
    error: function (result) {
        alert(result.responseText);
    }

}); 
    }
function wishlist() {
    var dataobj = {
        Buyerid: sessionStorage.getItem("userId"),
        BidId: sessionStorage.getItem("bid")
    };
$.ajax({
    url: "http://localhost:57987/bid/addwishlist",
    type: "POST",
    data: dataobj,
    dataType: "json",
    async: false,
    success: function (result) {
        if (result == 'The Product is already in your WishList') {
            
            $('#cpWishlist').hide();
            $('#cpWishlist1').show();
        }

        else {
            $('#cpWishlist1').hide();
            $('#cpWishlist').show();
        }

    },
    error: function (result) {
        $('#wishlistmsg').html(result);
        $("#wishlistmodal").modal("show");
    }
});
  }
function producttimer(enddate,type) {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    const date = new Date(enddate);
        let offer = date.setDate(date.getDate() + parseInt(type)),
        countDown = new Date(offer).getTime(),
        x = setInterval(function () {
            let now = new Date().getTime(),
                distance = countDown - now;
            if ((Math.floor(distance / (day)) != 0))
                document.getElementById("proddays").innerText = Math.floor(distance / (day));
            else {
                document.getElementById("proddays").innerText = "";
                $('#proddays1').hide();
            }

                document.getElementById("prodhours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("prodmins").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("prodsecs").innerText = Math.floor((distance % (minute)) / second);

        }, 0)
}

function topbids() {
    
    $.ajax({
        url: "http://localhost:57987/bid/topbidders/" +sessionStorage.getItem("bid"),
        type: "GET",
       
        dataType: "json",
        async: false,
        success: function (result) {
            var displayhtml = "";
            $.each(result, function (key, item) {
                displayhtml += '<tr >';
                displayhtml += '<td>' + item.sellerName + '</td>';
                displayhtml += '<td>' + item.mobileNo + '</td>';
                displayhtml += '<td style="color:blue">' + item.price + '</td>';
                displayhtml += '</tr>';
            });
            $('#topbidders').html(displayhtml);
        },
        error: function (result) {
          
        }
    });
}
function similarproducts() {
    $.ajax({
        url: "http://localhost:57987/product/getSimilarProducts/" + sessionStorage.getItem("bid"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
                var displayhtml = '<div class="owl-carousel related-carousel" >';
                var timerId = "";
                var wishlist = sessionStorage.getItem("wish");
                $.each(result, function (key, item) {
                    displayhtml += '<div class="card product-item border-0" style="max-width:65%!important; margin-right:-50px;">';
                    displayhtml += '<div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">';
                    displayhtml += '<img class="card-img-top img-fluid" src="http://localhost:27311/Pimages/' + item.displayImage + '" alt="">';
                    /*displayhtml += '<span id="timerid' + item.bidId + '" class="HomeEnddate"></span>';*/
                    displayhtml += '</div>';
                    displayhtml += '<div class="card-body border-left border-right text-center p-0 pt-4 pb-3" >';
                    displayhtml += '<h6 class="text-truncate mb-3">' + item.productName + '</h6>';
                    displayhtml += '<div class="d-flex justify-content-center">';
                    displayhtml += '<h6><span style="font-family:Roboto; margin-right:3px;">$</span>' + item.price + '</h6>';
                    displayhtml += '</div>';
                    displayhtml += '<div><h6>End Date : ' + item.endDate + '</h6></div>';
                    displayhtml += '</div>';
                    displayhtml += '<div id="pbuttons' + item.bidId + '" class="card-footer d-flex justify-content-between bg-light border">';
                    displayhtml += '<button class="btn btn-sm text-dark p-0" style="decoration:none" onclick="checkproduct(' + item.bidId + ')"><i class="fas fa-eye text-primary mr-1"></i>Check Product</button>';

                    if (wishlist != null && wishlist.includes(item.bidId + '')) {
                        displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return removeWishlist(' + item.bidId + ');"><i class="fa-solid fa-heart-crack text-danger mr-1"></i>Unfavourite</button>';
                    }
                    else {
                        displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return wishlist(' + item.bidId + ');"><i class="fas fa-heart text-primary mr-1"></i>Favourite</button>';
                    }
                    displayhtml += '</div>';
                  
                    displayhtml += '</div>';
                    //timerId = 'timerid' + item.bidId;
                    //loadtimer(timerId, item.endDate, 1);
                });
            displayhtml += '</div>';
            $("#similarproducts").html(displayhtml);
            }
        ,
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function init_carousel() {
    $('.owl-carousel').owlCarousel();
}; 

