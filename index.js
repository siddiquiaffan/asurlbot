const axios = require('axios');
const validUrl = require('valid-url');
const { Telegraf } = require('telegraf');
const short = require('./modules/short');
const unshort = require('./modules/unshort');
const {token } = require('./config');

const bot = new Telegraf(token);

bot.start((ctx) => {
    if(ctx.message.chat.type == 'private'){
        console.log("It's private chat.")
        console.log(ctx.message)
    }else{
        console.log(ctx.message);
    }
});
bot.help((ctx) => ctx.replyWithMarkdown("/start - Restart the bot. \n/help - Get this message. \n\n/unshort - Extract long URL from any shortend URL. (Eg.  ``` /unshort https://cutt.ly/qzXU9A2```). \n\nTo short a big URL just send me the long URL and I'll give shorten link."))
bot.on('sticker', (ctx) => ctx.reply('Am I joke to you , Send an url to get work done!'))
bot.hears('hi', (ctx) => ctx.reply('Hey there!'))
bot.command('unshort' , (ctx) => unshort(ctx.message.text , ctx.chat.id));
bot.command('short' , (ctx) => {
    const url = ctx.message.text.split(' ').slice(1)[0];
    if(validUrl.isUri(url)){
        short(url , ctx.chat.id);
    }else{
        ctx.reply('Please send a valid URL !');
    }
})
bot.on('text', (ctx) => {
    if(ctx.message.chat.type == 'private' && validUrl.isUri(ctx.message.text)){
        short(ctx.message.text , ctx.chat.id, ctx.message.from.username);
    }else if(ctx.message.chat.type == 'private'){
        ctx.reply('Please send a valid URL !');
    }})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))