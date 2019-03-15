$(document).ready(function() {
  $("#btn-pdf").click(function() {
    $("#HTMLtoPDF").printThis({
      debug: false, // show the iframe for debugging
      importCSS: true, // import parent page css
      importStyle: false, // import style tags
      printContainer: true, // print outer container/$.selector
      loadCSS: ["./bootstrap.min.css", "./admin.css"], // path to additional css file - use an array [] for multiple
      pageTitle: "Transcripts Report", // add title to print page
      removeInline: false, // remove inline styles from print elements
      removeInlineSelector: "*", // custom selectors to filter inline styles. removeInline must be true
      printDelay: 333, // variable print delay
      header: null, // prefix to html
      footer: null, // postfix to html
      base: `http://localhost:3000/ui/admin/`, // preserve the BASE tag or accept a string for the URL
      formValues: true, // preserve input/form values
      canvas: true, // copy canvas content
      doctypeString: "<!DOCTYPE html>", // enter a different doctype for older markup
      removeScripts: false, // remove script tags from print content
      copyTagClasses: true, // copy classes from the html & body tag
      beforePrintEvent: null, // function for printEvent in iframe
      beforePrint: null, // function called before iframe is filled
      afterPrint: null // function called before iframe is removed
    });
  });
});
