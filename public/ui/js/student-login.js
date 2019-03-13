$(document).ready(function() {
  $("#student-login").submit(function(e) {
    e.preventDefault();

    let student_email = $("#student_email").val();
    let student_password = $("#student_password").val();

    if (!student_email || !student_password) {
      swal({
        title: "Error!",
        text: "All fields are required!",
        icon: "error",
        button: "Close"
      });
      return;
    }

    const getUrl = baseUrl + `students?email=${student_email}`;

    $.get(getUrl, function(data) {
      if (data.length === 0) {
        swal({
          title: "Error!",
          text: "Student doesn't exist",
          icon: "error",
          button: "Close"
        });
      } else if (data[0].email === student_email && data[0].password === student_password) {
        localStorage.setItem("student_email", student_email);
        localStorage.setItem("student_name", data[0].firstname);
        localStorage.setItem("student_Id", data[0].id);

        let log = {
          studentId: data[0].id,
          login_time: new Date(),
          logout_time: null
        };

        $.ajax({
          type: "POST",
          url: `${baseUrl}logs`,
          data: log
        }).done(res => {
          localStorage.setItem("logId", res.id);
          localStorage.setItem("loginTime", res.login_time);
          window.location.replace("../ui/student/student-dashboard.html");
        });
      } else {
        swal({
          title: "Error!",
          text: "Incorrect email/password. Please try again",
          icon: "error",
          button: "Close"
        });
      }
    });
  });
});
