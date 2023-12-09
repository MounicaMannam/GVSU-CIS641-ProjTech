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
        url: "http://localhost:57987/user/register",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        success: function (result) {
            $("#signupmodal").modal("show");
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
    var Pass1 = document.getElementsByName("Pass1")[0].value;
    var Pass2 = document.getElementsByName("Pass2")[0].value;
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

    if (Pass1.trim() == "" || Pass1.length == 0) {
        $("#Pass1Err").html("Enter Password");
        $("#Pass1Err").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#Pass1Err").html("");
        $("#Pass1Err").css('color', '#FFF');
    }

    if (Pass2.trim() == "" || Pass2.length == 0) {
        $("#Pass2Err").html("Enter Password");
        $("#Pass2Err").css('color', '#FF6363');
        isValid = false;
    }

    else if (Pass1 != Pass2) {
        $("#Pass2Err").html("Password does not match");
        $("#Pass2Err").css('color', '#FF6363');
        isValid = false;
    }

    else if (!CheckPassword(Pass2)) {
        $("#Pass2Err").html("Min 8 Chars with One Digit, One Upper Case Letter & a Special Char");
        $("#Pass2Err").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#Pass2Err").html("");
        $("#Pass2Err").css('color', '#FFF');
    }

    if (document.getElementsByName("TermsCon")[0].checked) {
        $("#TermsConErr").html("");
        $("#TermsConErr").css('color', '#FFF');
    }
    else {
        $("#TermsConErr").html("Please accept the terms and conditions");
        $("#TermsConErr").css('color', '#FF6363');
        isValid = false;
    }
    debugger
    if (isValid == true) {
        var data = {
            FirstName: Name,
            Email: Email,
            PhoneNumber: Phone,
            State: State,
            City: City,
            Zip: Zip,
            Password: Pass1
        };
        return data;
    }

    return isValid;
}

function CheckPassword(Pass1) {
    var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
    if (reg.test(Pass1))
        return true;
    else
        return false;
}
function CheckEmail(Email) {
    var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,20})\.([a-z]{2,3}(?:\.[a-z]{2,3})?)$/i;
    if (reg.test(Email))
        return true;
    else
        return false;
}