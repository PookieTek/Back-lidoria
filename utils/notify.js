const nodemailer = require('nodemailer');
const {EMAIL_SENDER, EMAIL_LIDORIA, EMAIL_SENDER_PWD} = require('../config');

const transaction = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_SENDER,
        pass: EMAIL_SENDER_PWD
    }
});

const notifyLido = async(_, {sale, client}) => {
    try {
        const mailOpt = {
            from: EMAIL_SENDER,
            to: EMAIL_LIDORIA,
            subject: "Vente réalisé !",
            html: `Bravo ! Tu es presque Riche !
                   <br> Tu as vendu ${sale.name} pour ${sale.price} a ${client.name} !!
                   <br>Youpiiiiiiiii !`
        }
        transaction.sendMail(mailOpt);
    } catch (err) {
        throw err;
    }
};