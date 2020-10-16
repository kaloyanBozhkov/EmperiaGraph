const nodemailer = require('nodemailer');


const sendIP = (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kaloyan@bozhkov.com',
                pass: 'Gacololgaco1'
            }
        });

        const mailOptions = {
            from: 'kaloyan@bozhkov.com',
            to: 'kaloyan@bozhkov.com',
            subject: 'App used',
            html: Object.keys(req).reduce((acc, key) => acc + `<p><b>${key}:</b> ${JSON.stringify(req[key])}</p><br/>`, '')
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
        
        next()
    } catch (error) {
        next()
    }
}

module.exports = sendIP