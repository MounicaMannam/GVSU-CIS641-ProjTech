$(document).ready(function () {
    cartcount();
});
function cartcount() {

    $.ajax({
        url: "http://localhost:57987/message/wonmsgcount/" + sessionStorage.getItem("userId"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (result) {
            $('#CartCount').html(result);
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}
function cartpayment() {
    sessionStorage.setItem("payment", "yes");
    location.replace("http://localhost:27311/user/profile");
}