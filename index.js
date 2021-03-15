const fetchUrl = require('fetch').fetchUrl;
const validUrl = require('valid-url');

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const key = process.env.API_KEY;

bot.start((ctx) => ctx.replyWithMarkdown(`Hey [${ctx.message.chat.first_name}](https://t.me/${ctx.message.chat.username}) , Welcome !\nSend me a long URL and get it shortened. \n\n Made with ❤ by [𝔄𝔉𝔉𝔄𝔑](https://t.me/AffanTheBest) .`));
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.on('text', (ctx) => {
    if(validUrl.isUri(ctx.message.text)){
        // ctx.reply('hello');
        fetchUrl(`http://cutt.ly/api/api.php?key=${key}&short=${ctx.message.text}` , (err , res , body) => {
        var realData = JSON.parse(body);
        // ctx.reply(realData.url.shortLink);
        bot.telegram.sendMessage(ctx.chat.id ,`Here's the shorten url : \n👉 ${realData.url.shortLink}` , 
        {
            reply_markup: {
                inline_keyboard: [
                    [{text: realData.url.shortLink , url:realData.url.shortLink}]
                ]
            }
        })
    })


    }else{
        ctx.reply('Please send a valid URL !');
    }
})

bot.hears('hello' , (ctx) => ctx.reply(ctx.message.text))
bot.on('text', (ctx) => ctx.reply(`Hello ${ctx.state.role}`))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))