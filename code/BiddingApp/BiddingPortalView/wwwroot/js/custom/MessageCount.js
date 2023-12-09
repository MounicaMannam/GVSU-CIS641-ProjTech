if (sessionStorage.getItem("userId") != null) {
    msgCount();
    setInterval(function () {
        msgCount();
    }, 10000); 
}
if (sessionStorage.getItem("userId") != null && sessionStorage.getItem("gotmsg") == null) {
    msgcongrats();
    cartcount();
}
function msgCount() {
    $.ajax({
        url: "http://localhost:57987/message/getcount/" + sessionStorage.getItem("userId"),
        type: "GET",

        dataType: "json",
        async: false,
        success: function (result) {
            if (parseInt(result.result) > 99)
                $('#msgs').html("99+");

            else if (parseInt(result.result) > 0)
                $('#msgs').html(result.result);
        },
        error: function (result) {
        }
    });
}
function msgcongrats() {
    $.ajax({
        url: "http://localhost:57987/message/wonmsg/" + sessionStorage.getItem("userId"),
        type: "POST",
        dataType: "json",
        async: false,
        success: function (result) {
            sessionStorage.setItem("gotmsg", "yes");
        },
        error: function (result) {
        }
    });
}
