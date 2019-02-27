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
                    alert("user is there");
                    // document.location = "save_ss.php?user_login="+user;
                }else{
                    $("#student-login").sliderUp('slow').slideDown('slow');
                    $('#student').val('');
                }
            }
        });
        return false;
    });
});