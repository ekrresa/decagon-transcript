$(document).ready(function() {
  $("#login").click(function() {
    var user = $("#student").val();
    var error = true;

    $("#loading")
      .html('<img src="../ui/images/giphy.gif" width="40px">')
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
          if (user == value.email || user == value.matric) {
            error = false;
            student_data = value.email;
            student_name = value.firstname;
            studentId = value.id;
          }
        });

        if (error === false) {
          localStorage.setItem("student_email", student_data);
          localStorage.setItem("student_name", student_name);
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
          }).done(res => {
            localStorage.setItem("logId", res.id);
            localStorage.setItem("loginTime", res.login_time);
          });
          window.location.href = "../ui/student/student-dashboard.html";
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
