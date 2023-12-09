function loadtimer(timerid, enddate, inc) {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    var displaytimer = '';
    const date = new Date(enddate);
    let offer = date.setDate(date.getDate() + inc),
        countDown = new Date(offer).getTime(),
        x = setInterval(function () {
            displaytimer = '';
            let now = new Date().getTime(),
                distance = countDown - now;
            if ((Math.floor(distance / (day))) != 0) {
                displaytimer += (Math.floor(distance / (day))) + 'd '
            }
            displaytimer += (Math.floor((distance % (day)) / (hour))) + 'h ',
                displaytimer += (Math.floor((distance % (hour)) / (minute))) + 'm ',
                displaytimer += (Math.floor((distance % (minute)) / second)) + 's ';
            document.getElementById(timerid).innerHTML = displaytimer;
        }, 0)

}
function checkproduct(bid) {
    //if (/*sessionStorage.getItem("userId") == null || */sessionStorage.getItem("userId") == "") {
    //    $("#homecheckproductmodal").modal("show");
    //}
    //else {
    sessionStorage.setItem("bid", bid);
    location.replace("http://localhost:27311/product/checkproduct/" + bid);

    /*  }*/
}
