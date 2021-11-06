const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

var sendEmail = (pdfString, toEmail, fromEmail, text) => {
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

module.exports = {
  sendEmail
}