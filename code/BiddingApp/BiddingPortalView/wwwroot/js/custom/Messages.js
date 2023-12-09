$(document).ready(function () {
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
    unreadmessages();
    readmessages();
    unreadmsgdisplay();
});
function unreadmessages() {
    var html = '';
    $.ajax({
        url: "http://localhost:57987/message/getmesseageunread/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td><span class="mb-0 text-muted">' + item.message + '</span></td>';
                html += '</tr>';
            });
            $("#unread").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function readmessages() {
    var html = '';
    $.ajax({
        url: "http://localhost:57987/message/getmesseageread/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td><span class="mb-0 text-muted">' + item.message + '</span></td>';
                html += '</tr>';
            });
            $("#read").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function deletemessages() {
    var html = '';
    $.ajax({
        url: "http://localhost:57987/message/deleteread/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            readmessages();
            msgCount();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function selectallmessages() {
    var html = '';
    $.ajax({
        url: "http://localhost:57987/message/updateread/" + sessionStorage.getItem("userId"),
        type: "GET",
        async: false,
        dataType: "json",
        success: function (result) {
            unreadmessages();
            readmessages();
            msgCount();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function unreadmsgdisplay() {
    $("#unread").show();
    $("#read").hide();
}
function readmsgdisplay() {
    $("#read").show();
    $("#unread").hide();
}
