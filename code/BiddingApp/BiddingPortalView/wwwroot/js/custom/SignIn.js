function checkSignin(data) {
    $.ajax({
        url: "http://localhost:57987/user/login",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        success: function (result) {
            debugger
            if (result == "Invalid EmailId or password") {
                    $("#PassErr").text("Email or Password is incorrect");
                    $("#PassErr").css('color', '#FF6363');
                }
            else {
                sessionStorage.setItem("jwt", result);
                sessionStorage.setItem('user', JSON.stringify(result.ur));
                sessionStorage.setItem("userId", result.userId);
                location.replace("http://localhost:27311/");
                }
            },

            error: function (result) {
                $("#PassErr").text("Email or Password is incorrect");
                $("#PassErr").css('color', '#FF6363');
            }

    });
}    

function SigninValidate() {
    var isValid = true;
    var Email = document.getElementsByName("Email")[0].value;
    var Password = document.getElementsByName("Password")[0].value;
    var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,20})\.([a-z]{2,3}(?:\.[a-z]{2,3})?)$/i;

    if (Email.trim() == "") {
        $("#EmailErr").html("Enter an Email");
        $("#EmailErr").css('color', '#FF6363');
        isValid = false
    }

    else if (reg.test(Email)) {
        $("#EmailErr").html("");
        $("#EmailErr").css('color', '#FFF');
        
    }

    else {
        $("#EmailErr").html("Enter a valid email address");
        $("#EmailErr").css('color', '#FF6363');
        isValid = false;
    }

    if (Password == "") {
        $("#PassErr").html("Enter a Password");
        $("#PassErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#PassErr").html("");
        $("#PassErr").css('color', '#FFF');
        
    }

    if(isValid==true){
            var data = {
                Email: Email,
                Password: Password
        }
        if (Email.toLowerCase() == "admin@biddingportal.com" && Password == "Admin@123") {
            sessionStorage.setItem("admin", "admin");
            location.replace("http://localhost:27311/admin");
        }
        else {
            checkSignin(data);
        }
        /*lsRememberMe();*/
        
    }
    else
            return isValid;
}