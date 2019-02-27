$(document).ready(function(){

    $("select.purpose").change(function(){
        var selectedPurpose = $(this).children("option:selected").val();
        alert("You have selected this purpose - " + selectedPurpose);
    });
});