const fetchUrl = require('fetch').fetchUrl;

const key = 'f250c5003a6b2bfdaaa146fef33fa60bb08ec';
const short = 'https://compstreasure.cf';

const shorting = (link) => {
    return fetchUrl(`http://cutt.ly/api/api.php?key=f250c5003a6b2bfdaaa146fef33fa60bb08ec&short=${link}` , (err , res , body) => {
        var realData = JSON.parse(body);
        // console.log(realData.url.shortLink);
        return realData.url.shortLink;
    })
}

console.log(shorting(short));

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BPT_TOKEN || '1655688053:AAGOtNRzLKGye7GCou6TXmGIlrE6WAaoyUA');

bot.start((ctx) => ctx.reply('Welcome!, Send an url to get shorten;'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))