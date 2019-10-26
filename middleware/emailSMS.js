const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey("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");

function SendMailSms(){}

SendMailSms.prototype.sendMail = function(emailId,data,callback){

    if(!data){
        data = {
            to: 'iamnaveenpaul@gmail.com',
            from: 'no-reply@paultor.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
    }

    sgMail.send(data);
}

module.exports = SendMailSms;