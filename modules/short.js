const axios = require('axios');
const {key , token} = require('../config');
const {Telegraf} = require('telegraf');
const bot = new Telegraf(token);


const short = (url , chatId, username) => {
    axios.get(`http://cutt.ly/api/api.php?key=${key}&short=${url}`)
        .then((res) => {
            const shortenURL = res.data.url.shortLink;
            bot.telegram.sendMessage(
<<<<<<< HEAD
                ctx.chat.id ,`Here's the shorten url : \n👉 ${shortenURL} .` , 
            {   reply_to_message_id: ctx.update.message.message_id ,
                allow_sending_without_reply : true,
                disable_web_page_preview : true,
=======
                chatId ,`Here's the shorten url : \n👉 ${shortenURL} \n\n${username ? '@'+username : "" }` , 
            {
>>>>>>> parent of 0ce1222 (Now bot will send links by replying to the message.)
                reply_markup: {
                    inline_keyboard: [ [{text: shortenURL , url:shortenURL}] ]
        }})})
        .catch(err => bot.telegram.sendMessage('Sorry, an error has been occurred. PLease try again later.'))
}

module.exports = short;