$(document).ready(function() {
  const student_form = $("form");

  student_form.submit(function(e) {
    e.preventDefault();
    // Form validation
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
      const student_email = $("#email").val();
      const matric_number = $("#matric").val();

      $.when(
        $.get(`http://localhost:3000/students?email=${student_email}`),
        $.get(`http://localhost:3000/students?matric=${matric_number}`)
      ).then(function(res1, res2) {
        if (res1[0].length === 0 && res2[0].length === 0) {
          const url = "http://localhost:3000/students";

          // Get form values
          let formData = {
            firstname: $("#firstname")
              .val()
              .toLowerCase(),
            lastname: $("#lastname")
              .val()
              .toLowerCase(),
            matric: matric_number,
            email: student_email,
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

          // Create student
          $.ajax({
            type: "POST",
            url,
            data: formData
          })
            .done(res => {
              $("form")[0].reset();
              const password = generatePassword();
              const studentId = res.id;

              const newPassword = {
                password,
                studentId
              };

              $.post("http://localhost:3000/passwords", newPassword, function(res) {
                swal({
                  title: "Good job!",
                  text: "Student created successfully",
                  icon: "success",
                  button: "Close"
                });
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
        } else {
          swal({
            title: "Error!",
            text: "Student with this email/matric number has been registered!",
            icon: "error",
            button: "Close"
          });
          return;
        }
      });

      return;
    }
  });
});

function generatePassword() {
  return Math.random()
    .toString(36)
    .slice(-8);
}
