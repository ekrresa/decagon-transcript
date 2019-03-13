const name_link = document.querySelector(".admin-name");
let name = localStorage.getItem("admin_name");
name_link.innerHTML = name.toUpperCase();

$(document).ready(function() {
  let logout = $(".logout");
  logout.click(function() {
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_name");
    location.replace("../../admin.html");
  });
});
