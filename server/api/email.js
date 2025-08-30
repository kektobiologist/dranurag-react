const sgMail = require('@sendgrid/mail')
const brevo = require('@getbrevo/brevo');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// old api, now sendgrid is asking for money so switched to brevo
var sendEmailSendgrid = (pdfString, toEmail, fromEmail, text) => {
  const msg = {
    to: toEmail, // Change to your recipient
    from: fromEmail, // Change to your verified sender
    subject: `Invoice - Dr. Anurag Saxena's Clinic`,
    text: text,
    attachments: [
      {
        content: pdfString,
        filename: "invoice.pdf",
        type: "application/pdf",
        disposition: "attachment"
      }
    ]
  }
  return sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
}



let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

var sendEmail = (pdfString, toEmail, fromEmail, text) => {
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `Invoice - Dr. Anurag Saxena's Clinic`;
  sendSmtpEmail.htmlContent = text;
  sendSmtpEmail.sender = { "name": "Dr. Anurag Saxena", "email": fromEmail };
  sendSmtpEmail.to = [
    { "email": toEmail }
  ];
  sendSmtpEmail.attachment = [
    {
      content: pdfString,
      name: "invoice.pdf",
    }
  ]
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });
}

module.exports = {
  sendEmail
}