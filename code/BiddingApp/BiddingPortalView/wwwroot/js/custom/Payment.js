$(document).ready(function () {
    $('#upipaybtn').hide();
    if (sessionStorage.getItem("userId") == null) {
        location.replace("http://localhost:27311/");
    }
});
function cardpayment() {
    var data = {
        TransactionType: 'Card',
        BidId: sessionStorage.getItem('bidId'),
        Buyerid: sessionStorage.getItem('userId')
    };
    loaderMain("Card Payment");
    datasend(data);
    setTimeout(function () {
        loaderStop();     
    }, 3000);
}

function upipayment() {
    var data = {
        TransactionType: 'UPI',
        BidId: sessionStorage.getItem('bidId'),
        Buyerid: sessionStorage.getItem('userId')
    };
    loaderMain("UPI Payment");
    datasend(data);
    setTimeout(function () {
        loaderStop();
    }, 3000);
}

function netbankingpayment() {
    var data = {
        TransactionType: 'Net Banking',
        BidId: sessionStorage.getItem('bidId'),
        Buyerid: sessionStorage.getItem('userId')
    };
    loaderMain("Net Banking");
    datasend(data);
    setTimeout(function () {
        loaderStop();
    }, 3000);
    
}

function paymentSuccess() {
    loaderMain("Payment Success");
    setTimeout(function () {
        loaderStop();
    },5000);
}

function paymentFailed() {
    loaderMain("Payment Failed");
    setTimeout(function () {
        loaderStop();
    }, 5000);
}

function datasend(data) {
    $.ajax({
        url: "http://localhost:57987/transact/addtransact",
        type: "POST",
        data: data,
        dataType: "json",
        async: false,
        success: function (result) {
            paymentSuccess();
            cartcount();
            location.replace("http://localhost:27311/user/invoice");
        },
        error: function (result) {
            alert(result.responseText);
            paymentFailed();
        }
    });
}


function banksel(bank) {
    var bank = $('#bank').val();

    if (bank != null) {
        $('#netbankingmodal').modal('show');
    }

    if (bank == 'Axis Bank')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/axis.png" height="100%" width="100%">');

    else if (bank == 'HDFC Bank')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/hdfc.png" height="100%" width="100%">');

    else if (bank == 'ICICI Bank')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/icici.png" height="100%" width="100%">');

    else if (bank == 'Kotak Mahindra Bank')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/kotak.png" height="100%" width="100%">');

    else if (bank == 'State Bank of India (SBI)')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/sbi.png" height="100%" width="100%">');

    else if (bank == 'IndusInd Bank')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/indusind.png" height="100%" width="100%">');

    else if (bank == 'Bank of Baroda (BOB)')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/bob.png" height="100%" width="100%">');

    else if (bank == 'Bank of India (BOI)')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/boi.png" height="100%" width="100%">');

    else if (bank == 'Yes Bank')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/yes.png" height="100%" width="100%">');

    else if (bank == 'Punjab National Bank (PNB)')
        $('#bankname').html('<img src="http://localhost:27311/img/banks/pnb.png" height="100%" width="100%">');
}

function CardValidate() {

    var isValid = true;

    var cardholdername = $('#cardholdername').val();
    var cardnumber = $('#cardnumber').val();
    var cardmm = $('#cardmm').val();
    var cardyy = $('#cardyy').val();
    var cardcvv = $('#cardcvv').val();
    
    if (cardholdername.trim() == "") {
        $("#CHNameErr").html("Enter Card Holder Name");
        $("#CHNameErr").css('color', '#FF6363');
        isValid = false;
    }
    else {
        $("#CHNameErr").html("");
        $("#CHNameErr").css('color', '#FFF');
    }

    if (cardnumber.trim() == "" || cardnumber.length == 0) {
        $("#CardNumErr").html("Enter Card Number");
        $("#CardNumErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (cardnumber.length < 12) {
        $("#CardNumErr").html("Card Number should be 12 digits");
        $("#CardNumErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#CardNumErr").html("");
        $("#CardNumErr").css('color', '#FFF');
    }

    if (cardmm == null) {
        $("#CardMMErr").html("Select Month");
        $("#CardMMErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#CardMMErr").html("");
        $("#CardMMErr").css('color', '#FFF');
    }

    if (cardyy == null) {
        $("#CardYYErr").html("Select Year");
        $("#CardYYErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#CardYYErr").html("");
        $("#CardYYErr").css('color', '#FFF');
    }

    if (cardcvv.trim() == "" || cardcvv.length == 0) {
        $("#CardCVVErr").html("Enter CVV");
        $("#CardCVVErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (cardcvv.length < 3) {
        $("#CardCVVErr").html("CVV must be 3 digits");
        $("#CardCVVErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#CardCVVErr").html("");
        $("#CardVVErr").css('color', '#FFF');
    }
    
    if (isValid == true) {
        cardpayment();
    }
    return isValid;
}

function UPIValidate() {
    var isValid = true;
    var upiid = $('#upiId').val();
    var upi = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;

    if (upiid.trim() == "") {
        $("#UpiErr").html("Enter UPI ID");
        $("#UpiErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (upi.test(upiid) == false) {
        $("#UpiErr").html("Enter a Valid UPI ID");
        $("#UpiErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#UpiErr").html("UPI ID Verified!");
        $("#UpiErr").css('color', '#4BB543');
        $('#upiverifybtn').hide();
        $('#upipaybtn').show();
    }

    return isValid;
    
}

function NetbankingValidate() {
    var isValid = true;
    var bankname = $('#bank').val();

    debugger;
    
    if (bankname == null) {
        $("#BankErr").html("Select Bank");
        $("#BankErr").css('color', '#FF6363');
        isValid = false;
    }

    else if (isValid == true)
        banksel(bankname);

    return isValid;
}

function SelBankValidate() {
    var username = $('#Username').val();
    var passcode = $('#Passcode').val();
    var isValid = true;

    if (username.trim() == "") {
        $("#NBNameErr").html("Enter Username");
        $("#NBNameErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#NBNameErr").html("");
        $("#NBNameErr").css('color', '#FFF');
    }

    if (passcode.trim() == "") {
        $("#NBPassErr").html("Enter Passcode");
        $("#NBPassErr").css('color', '#FF6363');
        isValid = false;
    }

    else {
        $("#NBPassErr").html("");
        $("#NBPassErr").css('color', '#FFF');
    }

    if (isValid == true)
        netbankingpayment();

    return isValid;

}
