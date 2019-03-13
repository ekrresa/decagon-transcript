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
  student_form.submit(function(e) {
    e.preventDefault();

    const url = $(this).attr("action");

    let formdata = {
      firstname: $("#firstname").val(),
      lastname: $("#lastname").val(),
      matric: $("#matric").val(),
      email: $("#email").val(),
      gender: $("#gender").val(),
      department: $("#department").val(),
      faculty: $("#faculty").val(),
      adm_year: $("#adm-year").val(),
      grad_year: $("#grad-year").val(),
      cgpa: $("#cgpa").val(),
      createdAt: createDate,
      updatedAt: new Date()
    };

    $.ajax({
      type: "PUT",
      url,
      data: formdata
    })
      .done(res => {
        $("form")[0].reset();
        swal({
          title: "Good job!",
          text: "Student edited successfully",
          icon: "success",
          button: "Close"
        });
      })
      .fail(err => {
        swal({
          title: "Oops!",
          text: "An error occurred. Please try again!",
          icon: "error",
          button: "Close"
        });
      });
  });
});
