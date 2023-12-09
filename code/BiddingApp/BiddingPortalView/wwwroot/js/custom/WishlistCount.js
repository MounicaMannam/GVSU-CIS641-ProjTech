function wishlistcount() {
    $.ajax({
        url: "http://localhost:57987/wishlist/getwishlistbidids/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            var count = result.length;
            sessionStorage.setItem("wish", JSON.stringify(result));
            $("#WishlistCount").html(count);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function wishlist(bid) {
    if (sessionStorage.getItem("userId") != null) {
        var dataobj = {
            Buyerid: sessionStorage.getItem("userId"),
            BidId: bid
        };
        $.ajax({
            url: "http://localhost:57987/bid/addwishlist",
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
                    displayhtml += '<button class="btn btn-sm text-dark p-0" onclick="return removeWishlist(' + bid + ');"><i class="fa-solid fa-heart-crack text-danger mr-1"></i>Unfavourite</button>';
                    $("#pbuttons" + bid).html(displayhtml);
                    wishlistcount();
                }
            },
            error: function (result) {
                alert(result.responseText);
            }
        });
    }
}

function removeWishlist(bid) {
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
            }
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}