const axios = require('axios');
const {key , token} = require('../config');
const {Telegraf} = require('telegraf');
const bot = new Telegraf(token);


const short = (url , chatId, username) => {
    axios.get(`http://cutt.ly/api/api.php?key=${key}&short=${url}`)
        .then((res) => {
            const shortenURL = res.data.url.shortLink;
            bot.telegram.sendMessage(
                chatId ,`Here's the shorten url : \n👉 ${shortenURL} \n\n@${username}` , 
            {
                reply_markup: {
                    inline_keyboard: [ [{text: shortenURL , url:shortenURL}] ]
        }})})
        .catch(err => bot.telegram.sendMessage('Sorry, an error has been occurred. PLease try again later.'))
}

module.exports = short;