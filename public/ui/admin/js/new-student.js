$(document).ready(function() {
  const student_form = $("form");

  student_form.submit(function(e) {
    e.preventDefault();
    let valid = $(this).validate({
      rules: {
        firstname: "required",
        lastname: "required",
        matric: "required",
        email: {
          required: true,
          email: true
        },
        gender: "required",
        department: "required",
        faculty: "required",
        adm_year: {
          required: true,
          number: true
        },
        grad_year: {
          required: true,
          number: true
        },
        cgpa: "required"
      },
      messages: {
        name: "Please specify your name",
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com"
        },
        adm_year: {
          number: "Please enter a valid year"
        },
        grad_year: {
          number: "Please enter a valid year"
        }
      }
    });
    if (valid.form()) {
      const url = $(this).attr("action");

      let formData = {
        firstname: $("#firstname")
          .val()
          .toLowerCase(),
        lastname: $("#lastname")
          .val()
          .toLowerCase(),
        matric: $("#matric").val(),
        email: $("#email").val(),
        gender: $("#gender")
          .val()
          .toLowerCase(),
        department: $("#department")
          .val()
          .toLowerCase(),
        faculty: $("#faculty")
          .val()
          .toLowerCase(),
        adm_year: $("#adm-year").val(),
        grad_year: $("#grad-year").val(),
        cgpa: $("#cgpa").val(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      $.ajax({
        type: "POST",
        url,
        data: formData
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
          swal({
            title: "Oops!",
            text: "An error occurred. Please try again!",
            icon: "error",
            button: "Close"
          });
        });
    }
  });
});
