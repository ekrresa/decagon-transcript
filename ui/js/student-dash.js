$(document).ready(function(){
    var user;
    function processForm(){
        var param = location.search.substring(1).split("&");
        var temp = param[0].split("=");
        user = unescape(temp[1]);
        alert("welcome @ "+user);
    }
    processForm();

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/students",
        success: function(data){
            $.each(data,function(key,value){
                if(user == value.email || user == value.matric_number){
                    var firstName = value.firstname;
                    var lastName = value.lastname;
                    var email = value.email;
                    var matric_number = value.matric_number;
                    var department = value.department;
                    var faculty = value.faculty;
                    var year_of_admission = value.year_of_admission;
                    var graduation_year = value.graduation_year;
                    var class_of_degree = value.class_of_degree;
                    var gender = value.gender;

                    $("#name").text(firstName+' '+lastName);
                    $("tr #email").text(email);
                    $("tr #matric").text(matric_number);
                    $("tr #department").text(department);
                    $("tr #faculty").text(faculty);
                    $("tr #admission_year").text(year_of_admission);
                    $("tr #graduation_year").text(graduation_year);
                    $("tr #class_of_degree").text(class_of_degree);
                    $("tr #gender").text(gender);
                    
                }
            });
            
        },
        error: function(){
            alert("something is wrong please reload the page");
        }
    });

    $("#apply-btn").click(function(){
        event.preventDefault();
        window.location = "../student/transcript.html?user-login="+user;
    });
});