const fetchUrl = require('fetch').fetchUrl;
const validUrl = require('valid-url');

// const key = 'f250c5003a6b2bfdaaa146fef33fa60bb08ec';

// console.log(shorting(short));

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BPT_TOKEN || '1655688053:AAGOtNRzLKGye7GCou6TXmGIlrE6WAaoyUA');

bot.start((ctx) => ctx.reply('Welcome!, Send an url to get shorten!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.on('text', (ctx) => {
    if(validUrl.isUri(ctx.message.text)){
        fetchUrl(`http://cutt.ly/api/api.php?key=f250c5003a6b2bfdaaa146fef33fa60bb08ec&short=${ctx.message.text}` , (err , res , body) => {
        var realData = JSON.parse(body);
        ctx.reply(realData.url.shortLink);
    })}else{
        ctx.reply('Please send a valid URL !');
    }
})

bot.hears('hello' , (ctx) => ctx.reply(ctx.message.text))
bot.on('text', (ctx) => ctx.reply(`Hello ${ctx.state.role}`))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))