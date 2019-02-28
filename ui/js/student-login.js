$(document).ready(function(){
    $("#login").click(function(){
        var user = $('#student').val();
        var error = true;

        $("#loading").html('<img src="../decagon-transcript/ui/images/giphy.gif" width="40px">').fadeIn('fast');

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/students",
            success: function(data){
                $('#loading').fadeOut('fast');
                $.each(data,function(key,value){
                    if(user == value.email || user == value.matric_number){
                        error = false;
                    }
                });
                if(error == false){
                    window.location = "../decagon-transcript/ui/student/student-dashboard.html?user-login="+user;
                    alert("You have successfull login to your dashboard !");
                    return false;
                }else{
                    $(".student-login").slideUp('slow').slideDown('slow');
                    $(".login-text#student").val('');
                    
                }
            }
        });
        return false;
    });
});