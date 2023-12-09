var id = sessionStorage.getItem("userId");
if(id == null || id== ""){
    $('#logincontent').hide();
    $('#logoutcontent').show();
    $('#msg').hide();
    $('#cartshow').hide();
    $('#wishlistshow').hide();
}
else{
    $('#logoutcontent').hide();
    $('#logincontent').show();
    $('#msg').show();
    $('#cartshow').show();
    $('#wishlistshow').show();
}
function logout() {
    sessionStorage.clear();
    location.replace("http://localhost:27311/");
}