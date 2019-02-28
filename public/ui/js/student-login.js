$(document).ready(function() {
  $("#login").click(function() {
    var user = $("#student").val();
    var error = true;

    $("#loading")
<<<<<<< HEAD:public/ui/js/student-login.js
      .html('<img src="../ui/images/giphy.gif" width="40px">')
=======
      .html(
        '<img src="../ui/images/giphy.gif" width="40px">'
      )
>>>>>>> develop:public/ui/js/student-login.js
      .fadeIn("fast");
    let student_data;
    let student_name;
    let studentId;
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/students",
      success: function(data) {
        $("#loading").fadeOut("fast");
        $.each(data, function(key, value) {
          if (user == value.email || user == value.matric_number) {
            error = false;
            student_data = value.email;
            student_name = value.firstname;
            studentId = value.id;
          }
        });
        if (error == false) {
          localStorage.setItem("student_email", student_data);
          localStorage.setItem("student_name", student_name);
<<<<<<< HEAD:public/ui/js/student-login.js
          localStorage.setItem("studentId", studentId);
          let data = {
            studentId,
            login_time: new Date(),
            logout_time: null
          };
          $.ajax({
            type: "POST",
            url: "http://localhost:3000/logs",
            data
          });
          window.location.href = "../ui/student/student-dashboard.html";
=======
          window.location =
            "../ui/student/student-dashboard.html?user-login=" +
            user;
          //   return false;
>>>>>>> develop:public/ui/js/student-login.js
        } else {
          $(".student-login")
            .slideUp("slow")
            .slideDown("slow");
          $(".login-text#student").val("");
        }
      }
    });
    return false;
  });
});
