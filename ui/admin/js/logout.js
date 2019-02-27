$(document).ready(function() {
  let logout = $(".logout");
  logout.click(function() {
    localStorage.removeItem("email");
    location.replace("./login.html");
  });
});
