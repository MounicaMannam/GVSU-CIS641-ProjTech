$(document).ready(function () {
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
    var user = JSON.parse(sessionStorage.getItem("user"));
    document.getElementsByName("Name")[0].value = user.firstName;
    document.getElementsByName("Email")[0].value = user.email;
    document.getElementsByName("Phone")[0].value = parseInt(user.phoneNumber);
    document.getElementsByName("City")[0].value = user.city;
    document.getElementsByName("State")[0].value = user.state;
    document.getElementsByName("Zip")[0].value = user.zip;
});
function addUser() {
    var isValid = SignupValidate();
    if (isValid == false)
        return false;
    else {
        AddProductAPI(isValid);
    }
}
function AddProductAPI(data) {
    $.ajax({
        url: "http://localhost:57987/user/update",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        success: function (result) {
            $("#signupmodal").modal("show");
            if (result != "User with this email id already exists") {
                sessionStorage.setItem("user", JSON.stringify(result));
            }
        },
        error: function (result) {
            alert(result.responseText);
        }
    });
}

function SignupValidate() {

    var isValid = true;

    var Name = document.getElementsByName("Name")[0].value;
    var Email = document.getElementsByName("Email")[0].value;
    var Phone = document.getElementsByName("Phone")[0].value;
    var City = document.getElementsByName("City")[0].value;
    var State = document.getElementsByName("State")[0].value;
    var Zip = document.getElementsByName("Zip")[0].value;

    if (Name.trim() == "") {
        $("#NameErr").html("Enter a Name");
        $("#NameErr").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#NameErr").html("");
        $("#NameErr").css('color', '#FFF');
    }

    if (Email.trim() == "") {
        $("#EmailErr").html("Enter an Email");
        $("#EmailErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (!CheckEmail(Email)) {
        $("#EmailErr").html("Enter a valid Email");
        $("#EmailErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#EmailErr").html("");
        $("#EmailErr").css('color', '#FFF');
    }

    if (State.trim() == "") {
        $("#StateErr").html("Enter State");
        $("#StateErr").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#StateErr").html("");
        $("#StateErr").css('color', '#FFF');
    }

    if (City.trim() == "") {
        $("#CityErr").html("Enter City");
        $("#CityErr").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#CityErr").html("");
        $("#CityErr").css('color', '#FFF');
    }

    if (Zip.trim() == "" || Zip.length == 0) {
        $("#ZipErr").html("Enter Zip");
        $("#ZipErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (Zip.length > 6) {
        $("#ZipErr").html("The length of Zip should be 6");
        $("#ZipErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#ZipErr").html("");
        $("#ZipErr").css('color', '#FFF');
    }

    if (Phone.trim() == "" || Phone.length == 0) {
        $("#PhoneErr").html("Enter Phone");
        $("#PhoneErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (Phone.length != 10) {
        $("#PhoneErr").html("The length of Phone should be 10");
        $("#PhoneErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#PhoneErr").html("");
        $("#PhoneErr").css('color', '#FFF');
    }
    debugger
    if (isValid == true) {
        var data = {
            Id: sessionStorage.getItem("userId"),
            FirstName: Name,
            Email: Email,
            PhoneNumber: Phone,
            State: State,
            City: City,
            Zip: Zip
        };
        return data;
    }

    return isValid;
}
function CheckEmail(Email) {
    var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,20})\.([a-z]{2,3}(?:\.[a-z]{2,3})?)$/i;
    if (reg.test(Email))
        return true;
    else
        return false;
}
