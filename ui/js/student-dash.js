$(document).ready(function(){   
    var user;
    var firstName;
    function processForm(){
        var param = location.search.substring(1).split("&");
        var temp = param[0].split("=");
        user = unescape(temp[1]);
    }
    processForm();
    user = localStorage.getItem('student_email');
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/students",
        success: function(data){
            $.each(data,function(key,value){
                if(user == value.email || user == value.matric_number){
                    firstName = value.firstname;
                    var lastName = value.lastname;
                    var email = value.email;
                    var matric_number = value.matric;
                    var department = value.department;
                    var faculty = value.faculty;
                    var year_of_admission = value.adm_year;
                    var graduation_year = value.grad_year;
                    var cgpa = value.cgpa;
                    var gender = value.gender;

                    $("#name").text(firstName+' '+lastName);
                    $("tr #email").text(email);
                    $("tr #matric").text(matric_number);
                    $("tr #department").text(department);
                    $("tr #faculty").text(faculty);
                    $("tr #admission_year").text(year_of_admission);
                    $("tr #graduation_year").text(graduation_year);
                    $("tr #gender").text(gender);

                    if(cgpa >= 4.5){
                        class_of_degree = "First Class";
                    }
                    else if(cgpa >= 3.5 && cgpa < 4.5){
                        class_of_degree = "Second Class (upper)";
                    }
                    else if(cgpa >= 2.5 && cgpa < 3.5){
                        class_of_degree = "Second Class (lower)";
                    }else if(cgpa >= 1.5 && cgpa < 2.5){
                        class_of_degree = "Third Class";
                    }else{
                        class_of_degree =  "Fail";
                    }
                    $("tr #class_of_degree").text(class_of_degree);
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