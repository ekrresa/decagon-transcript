$(document).ready(function() {
  $("#login").click(function() {
    var user = $("#student").val();
    var error = true;

    $("#loading")
      .html(
        '<img src="../decagon-transcript/ui/images/giphy.gif" width="40px">'
      )
      .fadeIn("fast");
    let student_data;
    let student_name;
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
          }
        });
        if (error == false) {
          localStorage.setItem("student_email", student_data);
          localStorage.setItem("student_name", student_name);
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
