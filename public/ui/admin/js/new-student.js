$(document).ready(function() {
  const student_form = $("form");
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
      createdAt: new Date(),
      updatedAt: new Date()
    };

    $.ajax({
      type: "POST",
      url,
      data: formdata
    })
      .done(res => {
        $("form")[0].reset();
        swal({
          title: "Good job!",
          text: "Student created successfully",
          icon: "success",
          button: "Close"
        });
      })
      .fail(err => {
        eswal({
          title: "Good job!",
          text: "An error occurred. Please try again!",
          icon: "error",
          button: "Close"
        });
      });
  });
});
