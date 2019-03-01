const name_link = document.querySelector(".admin-name");
let name = localStorage.getItem("name");
name_link.innerHTML = name.toUpperCase();

$(document).ready(function() {
  let logout = $(".logout");
  logout.click(function() {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    location.replace("./login.html");
  });
});
