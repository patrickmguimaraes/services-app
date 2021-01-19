const sgMail = require('@sendgrid/mail');

exports.sendEmailPeriodically = sendEmailPeriodically;
exports.getTimeOut = getTimeOut;

function sendEmailPeriodically(hours, minutes) {
  var data = new Date();
  data.setHours(hours, minutes, 0);
  setTimeout(sendFirstEmail, getTimeOut(new Date(), data));
}

function sendFirstEmail() {
  sendEmail();

  // Start loop each 24h
  setInterval(sendEmail, 86400000);
}

async function sendEmail() {
  console.log('Funcion \'sendEmail\' is executing on ' + new Date().toString());

  if (sgMail) {
    sgMail.setApiKey('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');
    const msg = {
      to: 'patrick.mg@outlook.com', // Change to your recipient
      from: 'patrick.mg@outlook.com', // Change to your verified sender
      subject: 'Sending email at ' + new Date().toString(),
      text: 'Email sent by server',
      html: '<strong>Email sent by server</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function getTimeOut(firstDate, lastDate) {
  var timeout = lastDate.getTime() - firstDate.getTime();

  if (timeout <= 0) {
    lastDate.setDate(lastDate.getDate() + 1);
    timeout = lastDate.getTime() - firstDate.getTime();
  }

  return timeout;
}