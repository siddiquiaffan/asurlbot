const axios = require('axios');
const {key , token} = require('../config');
const {Telegraf} = require('telegraf');
const bot = new Telegraf(token);


const short = (url , ctx) => {
    axios.get(`http://cutt.ly/api/api.php?key=${key}&short=${url}`)
        .then((res) => {
            const shortenURL = res.data.url.shortLink;
            bot.telegram.sendMessage(
                ctx.chat.id ,`Here's the shorten url : \n👉 ${shortenURL} .` , 
            {   reply_to_message_id: ctx.update.message.message_id ,
                allow_sending_without_reply : true,
                disable_web_page_preview : true,
                reply_markup: {
                    inline_keyboard: [ [{text: shortenURL , url:shortenURL}] ]
        }})})
        .catch(err => bot.telegram.sendMessage('Sorry, an error has been occurred. PLease try again later.'))
}

module.exports = short;