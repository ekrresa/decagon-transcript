$(document).ready(function(){

    function processForm(){
        var param = location.search.substring(1).split("&");
        var temp = param[0].split("=");
        var user = unescape(temp[1]);
        alert("welcome "+user);
    }
    processForm();

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/students",
        success: function(data){
            $.each(data,function(key,value){
                if(user == value.email || user == value.matric_number){
                    var firstName = value.firstname;
                    var lastname = value.lastname;
                }
            });
            
        },
        error: function(){
            alert("something is wrong please reload the page");
        }
    });
});