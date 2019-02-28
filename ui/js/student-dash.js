$(document).ready(function(){

    function processForm(){
        var param = location.search.substring(1).split("&");
        var temp = param[0].split("=");
        var user = unescape(temp[1]);
        alert("welcome "+user);
    }
    processForm();
});