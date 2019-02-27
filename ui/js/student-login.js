$(document).ready(function(){
    $("#login").click(function(){
        var user = $('#student').val();
        var error = true;

        $("#loading").html('<img src="../decagon-transcript/ui/images/giphy.gif" width="40px">').fadeIn('fast');

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/students",
            dataType: "json",
            success: function(data){
                $('#loading').fadeOut('fast');

                $.each(data,function(key,value){
                    if(user == value.email || user == value.matric){
                        error = false;
                    }
                });
                if(error == false){
                    document.location = "save_ss.php?user_login="+user;
                }else{
                    $(#)
                }
            }
        });
    });
});