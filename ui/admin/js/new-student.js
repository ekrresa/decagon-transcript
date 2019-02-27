$(document).ready(function() {
  let successDiv = $(".success");
  let errorDiv = $(".error");
  console.log(successDiv);

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
        successDiv.fadeIn().text("Student Added Successfully");
      })
      .fail(err => {
        errorDiv.fadeIn().text("There was an error. Please try again");
      });
  });
});
