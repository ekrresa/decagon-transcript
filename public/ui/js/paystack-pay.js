var amt_2;
var allemail_2 = "";
var paid = false;
//Hide the paypal button initially
$("#paypal-button-container").hide();
//Getting all the email(s) to send to
$('input[type="email"]#email-1').focusout(function() {
  var email1 = $(this).val();
  allemail_2 += email1;
});
$(document).on("focusout", "#email-2", function() {
  var email2 = $(this).val();
  allemail_2 += " ," + email2;
});
$(document).on("focusout", "#email-3", function() {
  var email3 = $(this).val();
  allemail_2 += " ," + email3;
});
$("select.purpose").change(function() {
  selectedPurpose = $(this)
    .children("option:selected")
    .val();
  if (selectedPurpose == "personal") {
    allemail_2 = "";
  }
});

function payWithPaystack(){
    var quant = $(".hide-amount").text();
      amt_2 = quant * 11100;
      var studentId = localStorage.getItem("student_Id");
      var student_email = localStorage.getItem("student_email");
      var student_name = localStorage.getItem("student_name");
      var date_issued = new Date();
      var transcriptId;

    var handler = PaystackPop.setup({
      key: 'pk_test_0cd240ad68becfbfb59b23da9483a7d6e9a756ec',
      email: student_email,
      amount: quant * 1110000,
      currency: "NGN",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      firstname: student_name,
      lastname: '',
      // label: "Optional string that replaces customer email"
      metadata: {
         custom_fields: [
            {
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }
         ]
      },
      callback: function(response){

        var transcript = {
            email_to: allemail_2,
            quantity: quant,
            studentId: studentId,
            date_issued: date_issued
          };
          $.ajax({
            type: "POST",
            url: `${baseUrl}transcripts`,
            data: transcript,
            success: function(data) {
              transcriptId = data.id;
              //Saving to payment history
              var payment = {
                studentId: studentId,
                amount: amt_2,
                payment_date: data.date_issued,
                transcriptId: transcriptId
              };
              $.ajax({
                type: "POST",
                url: `${baseUrl}payments`,
                data: payment,
                success: function(data) {},
                complete: function() {
                  // Sending Receipt to student email
                  Email.send({
                    Host: "smtp.gmail.com",
                    Username: "ekrresaochuko@gmail.com",
                    Password: "Aurora@845",
                    To: student_email,
                    From: "support@decagonuniversity.com",
                    Subject: "Transcript Payment - Receipt",
                    Body:
                      `<!DOCTYPE html>
                                            <html lang="en">
                                            <head>
                                                <meta http-equiv="Content-Type" content="text-html; charset=utf-8">
                                                <title>Transcript Receipt</title>
                                                
                                                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                                <style type="text/css">
                                                    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

html {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

caption, th, td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}

q, blockquote {
  quotes: none;
}
q:before, q:after, blockquote:before, blockquote:after {
  content: "";
  content: none;
}

a img {
  border: none;
}

article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
  display: block;
}

html, body {
  /* MOVE ALONG, NOTHING TO CHANGE HERE! */
}

.clearfix {
  display: block;
  clear: both;
}

.hidden {
  display: none;
}

b, strong, .bold {
  font-weight: bold;
}

#container {
  font: normal 13px/1.4em 'Open Sans', Sans-serif;
  margin: 0 auto;
  min-height: 1158px;
  background: #F7EDEB url("../img/bg.png") 0 0 no-repeat;
  background-size: 100% auto;
  color: #5B6165;
  position: relative;
}

#memo {
  padding-top: 29px;
  margin: 0 110px 0 60px;
  border-bottom: 1px solid #ddd;
  height: 115px;
}
#memo .logo {
  float: left;
  margin-right: 20px;
}
#memo .logo img {
  width: 250px;
  height: auto;
}
#memo .company-info {
  float: right;
  text-align: right;
}
#memo .company-info > div:first-child {
    line-height: 1em;
    font-weight: bold;
    font-size: 22px;
    color: #34a853;
}
#memo .company-info span {
  font-size: 11px;
  display: inline-block;
  min-width: 20px;
}
#memo:after {
  content: '';
  display: block;
  clear: both;
}

#invoice-title-number {
  font-weight: bold;
  margin: 30px 0;
}
#invoice-title-number span {
  line-height: 0.88em;
  display: inline-block;
  min-width: 20px;
}
#invoice-title-number #title {
    text-transform: uppercase;
    padding: 0px 2px 0px 60px;
    font-size: 50px;
    background: #54bb70;
    color: white;
}
#invoice-title-number #number {
  margin-left: 10px;
  font-size: 35px;
  position: relative;
  top: -5px;
}

#client-info {
  float: left;
  margin-left: 60px;
  min-width: 220px;
}
#client-info > div {
  margin-bottom: 3px;
  min-width: 20px;
}
#client-info span {
  display: block;
  min-width: 20px;
}
#client-info > span {
  text-transform: uppercase;
}

table {
  table-layout: fixed;
}
table th, table td {
  vertical-align: top;
  word-break: keep-all;
  word-wrap: break-word;
}

#items {
  margin: 35px 30px 0 30px;
}
#items .first-cell, #items table th:first-child, #items table td:first-child {
  width: 25px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  text-align: right;
}
#items table {
  border-collapse: separate;
  width: 100%;
}
#items table th {
    font-weight: bold;
    padding: 5px 8px;
    text-align: right;
    background: #34a853;
    color: white;
    text-transform: uppercase;
}
#items table th:nth-child(2) {
  width: 30%;
  text-align: left;
}
#items table th:last-child {
  text-align: right;
}
#items table td {
  padding: 9px 8px;
  text-align: right;
  border-bottom: 1px solid #ddd;
}
#items table td:nth-child(2) {
  text-align: left;
}

#sums {
  margin: 25px 30px 0 0;
  background: url("../img/total-stripe-firebrick.png") right bottom no-repeat;
}
#sums table {
  float: right;
}
#sums table tr th, #sums table tr td {
  min-width: 100px;
  padding: 9px 8px;
  text-align: right;
}
#sums table tr th {
  font-weight: bold;
  text-align: left;
  padding-right: 35px;
}
#sums table tr td.last {
  min-width: 0 !important;
  max-width: 0 !important;
  width: 0 !important;
  padding: 0 !important;
  border: none !important;
}
#sums table tr.amount-total th {
  text-transform: uppercase;
}
#sums table tr.amount-total th, #sums table tr.amount-total td {
  font-size: 15px;
  font-weight: bold;
}
#sums table tr:last-child th {
  text-transform: uppercase;
}
#sums table tr:last-child th, #sums table tr:last-child td {
  font-size: 15px;
  font-weight: bold;
  color: white;
}

#invoice-info {
  float: left;
  margin: 50px 40px 0 60px;
}
#invoice-info > div > span {
  display: inline-block;
  min-width: 20px;
  min-height: 18px;
  margin-bottom: 3px;
}
#invoice-info > div > span:first-child {
  color: black;
}
#invoice-info > div > span:last-child {
  color: #aaa;
}
#invoice-info:after {
  content: '';
  display: block;
  clear: both;
}

#terms {
  float: left;
  margin-top: 50px;
}
#terms .notes {
    min-height: 30px;
    min-width: 50px;
    color: #34a853;
}
#terms .payment-info div {
  margin-bottom: 3px;
  min-width: 20px;
}

.thank-you {
  margin: 10px 0 30px 0;
  display: inline-block;
  min-width: 20px;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 0.88em;
  float: right;
  padding: 0px 30px 0px 2px;
  font-size: 50px;
  background: #34a853;
  color: white;
}

.ib_bottom_row_commands {
  margin-left: 30px !important;
}

@media (max-width:992px){
    #memo {
    padding-top: 29px;
    margin: 0 60px 0 60px;
    border-bottom: none;
    height: 115px;
    }
    #memo .logo img {
        width: 200px;
        height: auto;
        margin-left: -40px;
    }
    #memo .company-info {
        margin-top: 30px;
        text-align: center;
    }
    #invoice-title-number #title {
    margin-top: 20px;
    font-size: 35px;
    }
    #invoice-title-number #number {
    font-size: 20px;
    top:0px;
    }
}
  
    </style>
</head>
<body>
    <div id="container">
    <section id="memo">
        <div class="logo">
        <img src="../images/logo-light-small-black.png" />
        </div>
        
        <div class="company-info">
        <div>Decagon Institute </div>

        <br />
        
        <span>22, Association Avenue, Obanikoro, Ilupeju, Lagos, Nigeria.</span>
        <span>200214</span>

        <br />
        
        <span class="phone_no"></span>
        <span>info@decagon.institute</span>
        </div>

    </section>

    <section id="invoice-title-number">
    
        <span id="title">Transcript Receipt</span>
        <span id="number">`(Math.floor((Math.random() * 1000000000) + 1))`</span>
        
    </section>
    
    <div class="clearfix"></div>
    
    <section id="client-info">
        <span>To:</span>
        <div>
        <span class="bold">Mr. ` +
                      student_name +
                      `</span>
        </div>
        <div>
        <span>` +
                      student_email +
                      `</span>
        </div>
    </section>
    
    <div class="clearfix"></div>
    
    <section id="items">
        
        <table cellpadding="0" cellspacing="0">
        
        <tr>
            <th></th> <!-- Dummy cell for the row number and row commands -->
            <th>ITEM</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>LN. TOTAL</th>
        </tr>
        
        <tr >
            <td></td> <!-- Don't remove this column as it's needed for the row commands -->
            <td>1</td>
            <td>` +
                      quant +
                      `</td>
            <td>#11,100</td>
            <td>#` +
                      quant * 11100 +
                      `</td>
        </tr>
        
        </table>
        
    </section>
    
    <section id="sums">
    
        <table cellpadding="0" cellspacing="0">
        <tr class="amount-total">
            <th>TOTAL:</th>
            <td>#` +
                      quant * 11100 +
                      `</td>
        </tr>
        
        <!-- You can use attribute data-hide-on-quote="true" to hide specific information on quotes.
            For example Invoicebus doesn't need amount paid and amount due on quotes  -->
        <tr data-hide-on-quote="true">
            <th>PAID:</th>
            <td>#` +
                      quant * 11100 +
                      `</td>
        </tr>
        
        </table>

        <div class="clearfix"></div>
        
    </section>
    
    <div class="clearfix"></div>

    <section id="invoice-info">
        <div>
        <span>Date issued</span> <span>` +
                      date_issued.toLocaleString() +
                      `</span>
        </div>
    </section>
    
    <section id="terms">

        <div class="notes">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Thank you very much.<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Your transcript has been sent to respective destination mail! </div>
        
    </section>

    <div class="clearfix"></div>

    <div class="thank-you">Thanks!</div>

    <div class="clearfix"></div>
    </div>
</body>
</html>`
                  });
                  // End of sending receipt to student email
                }
              });
            },
            complete: function() {}
          });
          // Show a success message to the buyer
          swal({
            title: "Thank you!",
            text: "Payment completed. Invoice has been sent to your email: " + student_email,
            icon: "success",
            button: "Close"
          });

          alert('success. transaction ref is ' + response.reference);
      },
      onClose: function(){
          alert('window closed');
      }
    });
    handler.openIframe();
  }