$(document).ready(function() {
  let logout = $(".logout");
  logout.click(function() {
    let logId = localStorage.getItem("logId");
    let studentId = localStorage.getItem("student_Id");
    let loginTime = localStorage.getItem("loginTime");

    let newData = {
      studentId,
      login_time: loginTime,
      logout_time: new Date()
    };

    $.ajax({
      type: "PUT",
      url: `${baseUrl}logs/${logId}`,
      data: newData
    }).done(function(data) {
      localStorage.removeItem("student_email");
      localStorage.removeItem("student_Id");
      localStorage.removeItem("student_name");
      localStorage.removeItem("logId");
      localStorage.removeItem("loginTime");
      location.replace("../../index.html");
    });
  });
});
