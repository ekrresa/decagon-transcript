$(document).ready(function() {
  $("#loginForm").submit(function(e) {
    e.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    if (!email || !password) {
      swal({
        title: "Error!",
        text: "All fields are required!",
        icon: "error",
        button: "Close"
      });
      return;
    }

    const getUrl = baseUrl + `admin?email=${email}`;

    $.get(getUrl, function(data) {
      if (data.length === 0) {
        swal({
          title: "Error!",
          text: "Invalid email/password details. Please try again",
          icon: "error",
          button: "Close"
        });
      } else if (data[0].email === email && data[0].password === password) {
        localStorage.setItem("admin_email", email);
        localStorage.setItem("admin_name", data[0].name);
        window.location.replace("../../ui/admin/dashboard.html");
      } else {
        swal({
          title: "Error!",
          text: "Invalid email/password details. Please try again",
          icon: "error",
          button: "Close"
        });
      }
    });
  });
});
