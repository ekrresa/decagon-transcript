$(document).ready(function() {
  let logout = $(".logout");
  logout.click(function() {
    let logId = localStorage.getItem("logId");
    let studentId = localStorage.getItem("studentId");
    let loginTime = localStorage.getItem("loginTime");

    let newData = {
      studentId,
      login_time: loginTime,
      logout_time: new Date()
    };

    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/logs/${logId}`,
      data: newData
    });
    localStorage.removeItem("student_email");
    localStorage.removeItem("studentId");
    localStorage.removeItem("student_name");
    localStorage.removeItem("logId");
    localStorage.removeItem("loginTime");
    location.replace("../../index.html");
  });
});
