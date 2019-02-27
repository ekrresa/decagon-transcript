$(document).ready(function(){

    var selectedPurpose = 'personal';
    var nos = 2;
    $("select.purpose").change(function(){
        selectedPurpose = $(this).children("option:selected").val();
        if(selectedPurpose == 'academic'){
            nos=1;
            $('.apply-form table #academic_1').show();
            $('.apply-form table #personal').hide();
            $('div.hide-amount').text(nos);
        }else{
            $('.apply-form table #personal').show();
            $('.apply-form table #academic_1').hide();
            $('.apply-form table #academic_2').hide();
            $('.apply-form table #academic_3').hide();
            $("#add-btn").removeAttr("disabled");
            nos = 1;
            $('div.hide-amount').text(nos);
        }
    });

    
    $("#add-btn").click(function(){
        nos++;
        var tr = '<tr id="academic_'+nos+'"><td id="right"><label>Email '+nos+'</label></td><td id="left"><input type="email" name="personal-email-'+nos+'"+placeholder="abc@abc.com"></td></tr>';
        $(".apply-form table tbody").append(tr);
        $('div.hide-amount').text(nos);
        if(nos === 3){
            $("#add-btn").attr("disabled", "disabled");
        }
    });
    

});