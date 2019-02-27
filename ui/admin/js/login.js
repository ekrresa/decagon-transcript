$(document).ready(function() {
  let errorDiv = $(".error");
  $("#loginForm").submit(function(e) {
    e.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    const url = $(this).attr("action");

    const getUrl = url + `?email=${email}`;

    $.get(getUrl, function(data) {
      if (data.length === 0) {
        errorDiv
          .text("Invalid email/password details. Please try again")
          .fadeIn()
          .fadeOut(5000);
      } else if (data[0].email === email && data[0].password === password) {
        localStorage.setItem("email", email);
        localStorage.setItem("name", data[0].name);
        window.location.replace("../admin/dashboard.html");
      } else {
        errorDiv
          .fadeIn()
          .text("Invalid email/password details. Please try again")
          .fadeOut(5000);
      }
    });
  });
});
