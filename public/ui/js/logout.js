$(document).ready(function() {
  let logout = $(".logout");
  logout.click(function() {
    localStorage.removeItem("student_email");
    location.replace("../../index.html");
  });
});
