const axios = require('axios');
const validUrl = require('valid-url');

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const key = process.env.API_KEY;

bot.start((ctx) => ctx.replyWithMarkdown(`Hey [${ctx.message.chat.first_name}](https://t.me/${ctx.message.chat.username}) , Welcome !\nSend me a long URL and get it shortened. \n\n Made with ❤ by [𝔄𝔉𝔉𝔄𝔑](https://t.me/AffanTheBest) .`));
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('Am I joke to you , Send an url to get work done!'))
bot.hears('hi', (ctx) => ctx.reply('Hey there!'))
bot.on('text', (ctx) => {
    if(validUrl.isUri(ctx.message.text)){
        axios.get(`http://cutt.ly/api/api.php?key=${key}&short=${ctx.message.text}`)
        .then((res) => {
            const shortenURL = res.data.url.shortLink;
        bot.telegram.sendMessage(ctx.chat.id ,`Here's the shorten url : \n👉 ${shortenURL}` , 
        {
            reply_markup: {
                inline_keyboard: [ [{text: shortenURL , url:shortenURL}] ]
        }})})
        .catch(err => ctx.reply('Sorry, an error has been occurred. PLease try again later.'))
    }else{
        ctx.reply('Please send a valid URL !');
    }})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))