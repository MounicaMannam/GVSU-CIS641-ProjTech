$(document).ready(function () {
    if (sessionStorage.getItem("admin") != "admin") {
        location.replace("http://localhost:27311/");
    }
    productsloadData();
    auctionloadData();
    paymentloadData();
});
function productsloadData() {
    $.ajax({
        url: "http://localhost:57987/bid/getBidsByUserId/2",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.sellerName + '</td>';
                html += '<td><img style="height:10vw;width:10vw;" src="http://localhost:27311/Pimages/' + item.displayImage + ' " alt="Image" /></td>';
                html += '<td>' + item.startDate + '</td>';
                html += '<td>' + item.endDate + '</td>';
                html += '<td>' + item.startPrice + '</td>';
                html += '<td>' + item.previousPrice + '</td>';
                html += '<td><a href="#" onclick="view(' + item.bidId + ')">View</a></td>';
                html += '</tr>';
            });
            $('#productsloaddata').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function auctionloadData() {
    $.ajax({
        url: "http://localhost:57987/report/auction",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.sellerName + '</td>';
                html += '<td>' + item.productName + '</td>';
                html += '<td><img style="height:10vw;width:10vw;" src="http://localhost:27311/Pimages/' + item.displayImage + ' " alt="Image" /></td>';
                html += '<td>' + item.startPrice + '</td>';
                html += '<td>' + item.price + '</td>';
                html += '<td>' + item.endDate + '</td>';
                html += '<td>' + item.status + '</td>';
                html += '<td>' + item.buyerName + '</td>';
                html += '</tr>';
            });
            $('#auctionloaddata').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function paymentloadData() {
    $.ajax({
        url: "http://localhost:57987/transact/getreport",
        type: "GET",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.sellerName + '</td>';
                html += '<td>' + item.productName + '</td>';
                html += '<td><img style="height:10vw;width:10vw;" src="http://localhost:27311/Pimages/' + item.displayImage + ' " alt="Image" /></td>';
                html += '<td>' + item.buyerName + '</td>';
                html += '<td>' + item.endDate + '</td>';
                html += '<td>' + item.price + '</td>';
                html += '<td><a href="#" onclick="view(' + item.bidId + ')">View</a></td>';
                html += '</tr>';
            });
            $('#paymentloaddata').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function view(bid) {
    location.replace("http://localhost:27311/admin/checkproduct/" + bid);
    sessionStorage.setItem("bidId", bid);
}
function logout() {
    sessionStorage.clear();
    location.replace("http://localhost:27311/");
}