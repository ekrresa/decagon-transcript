$(document).ready(function(){

    var selectedPurpose = 'personal';
    var nos = 1;
    $("span#email_error_message").hide();
    var error_email = false;

    $("select.purpose").change(function(){
        selectedPurpose = $(this).children("option:selected").val();
        if(selectedPurpose == 'academic'){
            nos=1;
            $('#label').text("Email "+nos);
            $("#add-btn").css("display","inline-block");
            $("'input[name='personal-email-3']").remove();
            $('div.hide-amount').text(nos);
        }else{
            $("tr#academic_2").remove();
            $("tr#academic_3").remove();
            $('#label').text("Email");
            $("#add-btn").css("display","none");
            $("#add-btn").removeAttr("disabled");
            nos = 1;
            $('div.hide-amount').text(nos);
        }
        check_email();
    });

    
    $("#add-btn").click(function(){
        nos++;
        var tr = '<tr id="academic_'+nos+'"><td id="right"><label>Email '+nos+'</label></td><td id="left"><input type="email" name="personal-email-'+nos+'"+placeholder="abc@abc.com"></td></tr>';
        $(".apply-form table tbody").append(tr);
        $('div.hide-amount').text(nos);
        if(nos === 3){
            $("#add-btn").attr("disabled", "disabled");
        }
        check_email();
    });

    $('input[type="email"]').focusout(function(){
        check_email();
    });

    function check_email(){
        var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var email = $('input[type="email"]').val();
        if(pattern.test(email) && email !== ''){
            $("span#email_error_message").hide();
            $('input[type="email"]').css("border-bottom","2px solid #34f458");
        }else{
            $("span#email_error_message").html("Invalid Email");
            $("span#email_error_message").show();
            $('input[type="email"]').css("border-bottom","2px solid #F90A0A");
            error_email = true;
        }
    }
    

});