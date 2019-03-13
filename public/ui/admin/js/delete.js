const getUrl = `http://localhost:3000/students?email=${urlParams.get("email")}`;
const deleteForm = $("form");

$.get(getUrl, function(data) {
  deleteForm.attr("action", `http://localhost:3000/students/${data[0].id}`);
});

$(document).ready(function() {
  deleteForm.submit(function(e) {
    e.preventDefault();
    const url = $(this).attr("action");

    $.ajax({
      type: "DELETE",
      url
    })
      .done(res => {
        swal({
          title: "Sad Day at Decagon!",
          text: "Student deleted",
          icon: "success",
          button: "Close"
        });
      })
      .fail(err => {
        swal({
          title: "Sad Day at Decagon!",
          text: "There was an error! Please try again",
          icon: "error",
          button: "Close"
        });
      });
  });
});
