const nodeMailer = require('nodemailer')

const adminEmail = 'pashion.shopping@gmail.com';
const adminPassword = 'rhbpyplpbgszbwfn';
const mailHost = 'smtp.gmail.com';
const mailPort = 587

const sendMail = (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    })

    const options = {
        from: adminEmail, // địa chỉ admin email bạn dùng để gửi
        to: to, // địa chỉ gửi đến
        subject: subject, // Tiêu đề của mail
        html: htmlContent // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
    }

    // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
    return transporter.sendMail(options)
}

module.exports = {
    sendMail: sendMail
}