function loaderStart(image, ibgcolor) {

    $('body, html').css({
        overflow: 'hidden',
        height: '100vh'
    });

    if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
        jQuery('body').append('<div id = "resultLoading" style = "display:none" > <div><img id="loadImg" src='+image+' alt="loading"><div></div></div><div class="bg"></div></div>');
    }

    jQuery('#resultLoading').css({
        'height': '100%',
        'width': '100%',
        'position': 'fixed',
        'z-index': '10000000',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto'
    });

    jQuery('#resultLoading .bg').css({
        'height': '100%',
        'width': '100%',
        'background': ibgcolor,
        'opacity': '1.0',
        'position': 'fixed',
        'top': '0'
    });

    jQuery('#resultLoading>div:first').css({
        'height': '40%',
        'width': '40%',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': '100px auto auto auto',
        'z-index': '10',
    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(1);
    jQuery('body').css('cursor', 'wait');
}
function loaderStop() {
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');  
    $('body, html').css({
        overflow: 'auto',
        height: 'auto'
    });
}

function loaderMain(type) {
    var image = "";
    var ibgcolor = "";
    
    if (type == "Preloader") {
       image = "http://localhost:27311/img/preloader.gif";
       ibgcolor = '#18181F';
    }


    else if (type == "Card Payment") {
        image = "http://localhost:27311/img/card_payment.gif";
        ibgcolor = "#FFF";
    }


    else if (type == "UPI Payment") {
        image = "http://localhost:27311/img/upi_payment.gif";
        ibgcolor = "#202020"; 
    }


    else if (type == "Net Banking") {
        image = "http://localhost:27311/img/net_banking.gif";
        ibgcolor = "#002549";
    }

    else if (type == "Payment Success") {
        image = "http://localhost:27311/img/payment_success.gif";
        ibgcolor = "#FFF";
    }


    else if (type == "Payment Failed") {
        image = "http://localhost:27311/img/payment_failed.gif";
        ibgcolor = "#FFF";
    }


    else if (type == "Random Process") {
        image = "http://localhost:27311/img/random_process.gif";
        ibgcolor = "#FFF";
    }
        
    loaderStart(image,ibgcolor);
}


