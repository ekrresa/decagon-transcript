$(document).ready(function() {
  let errorDiv = $(".error");
  $("#loginForm").submit(function(e) {
    e.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    const url = $(this).attr("action");

    const getUrl = url + `?email=${email}`;

    $.get(getUrl, function(data) {
      if (data[0].email === email && data[0].password === password) {
        window.location.replace("../admin/dashboard.html");
      } else {
        errorDiv
          .text("Invalid email/password details. Please try again")
          .fadeIn();

        console.log("Invalid email/password details. Please try again");
      }
    });
  });
});
