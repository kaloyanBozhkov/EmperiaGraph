const nodemailer = require('nodemailer')


const sendIP = (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zhroguexe@gmail.com',
                pass: `${process.env.GMAIL_PASSWORD}`
            }
        })

        const mailOptions = {
            from: 'zhroguexe@gmail.com',
            to: 'zhroguexe@gmail.com',
            subject: 'App used',
            html: `<h1>Info of Access:</h1>
            <p><b>publbic address (proxy): </b>${req.headers['x-forwarded-for']}</p>
            <p><b>public address: </b>${req.connection.remoteAddress}</p>
            <p><b>url: </b>${req.url}</p>
            <p><b>method: </b>${req.method}</p>
            <p><b>body: </b>${JSON.stringify(req.body)}</p>
            <p><b>headers: </b>${JSON.stringify(req.headers)}</p>
            <p><b>query: </b>${JSON.stringify(req.query)}</p>
            <p><b>params: </b>${JSON.stringify(req.params)}</p>
            `
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