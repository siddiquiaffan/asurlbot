const axios = require('axios');
const validUrl = require('valid-url');
const { Telegraf } = require('telegraf');
const short = require('./modules/short');
const unshort = require('./modules/unshort');
const {token } = require('./config');

const bot = new Telegraf(token);

bot.start((ctx) => {
    if(ctx.message.chat.type == 'private'){
        ctx.replyWithMarkdown(`Hey ${ctx.message.from.first_name}, Welcome ! \nUse /help to get started. Send me a long URL and get it shortened. \n\nMade with ❤ by [𝔄𝔉𝔉𝔄𝔑](https://t.me/AffanTheBest).`);
    }
});
bot.help((ctx) => {
    if(ctx.message.chat.type == 'private'){
        ctx.replyWithMarkdown("/start - Restart the bot. \n/help - Get this message. \n\n/unshort - Extract long URL from any shortend URL. (Eg.  ``` /unshort https://cutt.ly/qzXU9A2```). \n\nTo short a big URL just send me the long URL and I'll give shorten link.");
    }
})
bot.on('sticker', (ctx) => {
    if(ctx.message.chat.type == 'private'){
        ctx.reply('Am I joke to you , Send an url to get work done!')
    }
})
bot.hears('hi', (ctx) => {
    if(ctx.message.chat.type == 'private'){
        ctx.reply('Hey there!')
    }
});
bot.command('unshort' , (ctx) => unshort(ctx));
bot.command('short' , (ctx) => {
    const url = ctx.message.text.split(' ').slice(1)[0];
    if(validUrl.isUri(url)){
        short(url , ctx);
    }else{
        ctx.reply('Please send a valid URL !');
    }
})
bot.on('text', (ctx) => {
    if(ctx.message.chat.type == 'private' && validUrl.isUri(ctx.message.text)){
        short(ctx.message.text , ctx);
    }else if(ctx.message.chat.type == 'private'){
        ctx.reply('Please send a valid URL !');
    }})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))