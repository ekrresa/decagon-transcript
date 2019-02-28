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
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/students",
      success: function(data) {
        $("#loading").fadeOut("fast");
        $.each(data, function(key, value) {
          if (user == value.email || user == value.matric_number) {
            error = false;
            student_data = value.email;
          }
        });
        if (error == false) {
          localStorage.setItem("student_email", student_data);
          window.location =
            "../decagon-transcript/ui/student/student-dashboard.html?user-login=" +
            user;
          alert("You have successful login to your dashboard !");
          return false;
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
