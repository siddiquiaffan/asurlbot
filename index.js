const axios = require('axios');
const validUrl = require('valid-url');
const { Telegraf } = require('telegraf');
const short = require('./modules/short');
const unshort = require('./modules/unshort');
const {token } = require('./config');
const default_btn = [
    { text: "Join Channel", url: "https://t.me/asprojects" },
    { text: "Support Group", url: "https://t.me/assupportchat" },
  ];

const bot = new Telegraf(token);

bot.start((ctx) => {
    if(ctx.message.chat.type == 'private'){
        ctx.replyWithMarkdown(`Hey ${ctx.message.from.first_name}, Welcome ! \nUse /help to get started. Send me a long URL and get it shortened. \n\nMade with ❤ by [𝔄𝔉𝔉𝔄𝔑](https://t.me/AffanTheBest).` ,
        {
            reply_to_message_id: ctx.update.message.message_id,
            allow_sending_without_reply: true,
            disable_web_page_preview: true,
            reply_markup: {
              inline_keyboard: [default_btn],
            },
        }
        );
    }
});
bot.help((ctx) => {
    if(ctx.message.chat.type == 'private'){
        ctx.replyWithMarkdown("/start - Restart the bot. \n/help - Get this message. \n\n/unshort - Extract long URL from any shortend URL. (Eg.  ``` /unshort https://cutt.ly/qzXU9A2```). \n\nTo short a big URL just send me the long URL and I'll give shorten link." , 
        {
            reply_to_message_id: ctx.update.message.message_id,
            allow_sending_without_reply: true,
            disable_web_page_preview: true,
            reply_markup: {
              inline_keyboard: [default_btn],
            },
        }
        );
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
})

bot.command('unshort' , (ctx) => {
    const url = ctx.message.text.split(' ').slice(1)[0];
    if(validUrl.isUri(url)){
        unshort(url).then(data => {
            const longUrl = data.request.res.responseUrl;
            bot.telegram.sendMessage(
                ctx.chat.id,
                `Here's the extracted link : \n👉 ${longUrl} .`,
                { reply_to_message_id: ctx.update.message.message_id ,
                  allow_sending_without_reply : true,
                  disable_web_page_preview : true,
                  reply_markup: {
                    inline_keyboard: [[{ text: "Extracted URL", url: longUrl }]],
                    force_reply: true,
                  },
                }
              )
        }).catch(err => {
            const longUrl = err.request._options.href || err.request._currentUrl;
            if (longUrl) {
                bot.telegram.sendMessage(
                  ctx.chat.id,
                  `Here's the extracted link : \n👉 ${longUrl} .`,
                  { reply_to_message_id: ctx.update.message.message_id ,
                    allow_sending_without_reply : true,
                    disable_web_page_preview : true,
                    reply_markup: {
                      inline_keyboard: [[{ text: "Extracted URL", url: longUrl }]],
                      force_reply: true,
                    },
                  }
                )
              } else {
                ctx.replyWithMarkdown("Link is invalid");
              }
        })
    }else{
        ctx.replyWithMarkdown('__Please send a valid URL !')
    }
})

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