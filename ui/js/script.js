$(document).ready(function(){

    var selectedPurpose = 'personal';
    $("select.purpose").change(function(){
        selectedPurpose = $(this).children("option:selected").val();
        alert("You have selected this purpose - " + selectedPurpose);
        if(selectedPurpose == 'personal'){

        }else{

        }
    });
    // $('#academic #right,#academic #left').hide();
});