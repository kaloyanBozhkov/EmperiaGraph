const nodemailer = require('nodemailer')


const sendIP = (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kaloyan@bozhkov.com',
                pass: 'Gacololgaco1'
            }
        })

        const mailOptions = {
            from: 'kaloyan@bozhkov.com',
            to: 'kaloyan@bozhkov.com',
            subject: 'App used',
            html: Object.keys(req).reduce((acc, key) => {

                let value = '- circular -'

                try {
                    value = JSON.stringify(req[key])
                } catch (error) {
                    console.log(error)
                }

                return acc + `<p><b>${key}: </b>${vaue}</p><br/>`
            }, '')
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
        console.log(error)
        next()
    }
}

module.exports = sendIP