const getUrl = `http://localhost:3000/students?email=${urlParams.get("email")}`;
const student_form = $("form");
let createDate;
// Get student data, populate form fields
$.get(getUrl, function(data) {
  let student = data[0];
  $("#firstname").val(data[0].firstname);
  $("#lastname").val(data[0].lastname);
  $("#matric").val(data[0].matric);
  $("#email").val(data[0].email);
  $("#gender")
    .val(data[0].gender)
    .attr("selected", "selected");
  $("#department").val(data[0].department);
  $("#faculty").val(data[0].faculty);
  $("#adm-year").val(data[0].adm_year);
  $("#grad-year").val(data[0].grad_year);
  $("#cgpa").val(data[0].cgpa);
  student_form.attr("action", `http://localhost:3000/students/${data[0].id}`);
  createDate = data[0].createdAt;
});

$(document).ready(function() {
  let successDiv = $(".success");
  let errorDiv = $(".error");

  student_form.submit(function(e) {
    e.preventDefault();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let matric = $("#matric").val();
    let email = $("#email").val();
    let gender = $("#gender").val();
    let department = $("#department").val();
    let faculty = $("#faculty").val();
    let adm_year = $("#adm-year").val();
    let grad_year = $("#grad-year").val();
    let cgpa = $("#cgpa").val();
    const url = $(this).attr("action");

    let formdata = {
      firstname,
      lastname,
      matric,
      email,
      gender,
      department,
      faculty,
      adm_year,
      grad_year,
      cgpa,
      createdAt: createDate,
      updatedAt: new Date()
    };

    $.ajax({
      type: "PUT",
      url,
      data: formdata
    })
      .done(res => {
        successDiv.fadeIn().text("Student Updated Successfully");
        //Empty form fields
      })
      .fail(err => {
        errorDiv.fadeIn().text("There was an error. Please try again");
      });
  });
});
