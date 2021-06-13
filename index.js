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

const options = (ctx, btnText, btnUrl) => {
    return { reply_to_message_id: ctx.update.message.message_id ,
             allow_sending_without_reply : true,
             disable_web_page_preview : true,
             reply_markup: {
                inline_keyboard: [[{ text: btnText, url: btnUrl }]]
             }
            }
} 

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

bot.command('unshort' ,async (ctx) => {
    const url = ctx.message.text.split(' ').slice(1)[0];
    if(validUrl.isUri(url)){
        const longUrl = await unshort(url);
        ctx.replyWithMarkdown(
            `Here's the extracted link : \n👉 ${longUrl} .`, options(ctx, 'Extracted URL', longUrl)
        )
    }else{
        ctx.replyWithMarkdown('Please send a valid URL !')
    }
})

bot.command('short' , async(ctx) => {
    const url = ctx.message.text.split(' ').slice(1)[0];
    if(validUrl.isUri(url)){
        const shortReq = await short(url);
        const status = shortReq.status;
        ctx.replyWithMarkdown(shortReq.msg, options(ctx, status==true ? shortReq.url : '', status==true ? shortReq.url : ''));
    }else{
        ctx.reply('Please send a valid URL !');
    }
})
bot.on('text', async(ctx) => {
    if(ctx.message.chat.type == 'private' && validUrl.isUri(ctx.message.text)){
        const shortReq = await short(ctx.message.text);
        const status = shortReq.status;
        ctx.replyWithMarkdown(shortReq.msg, options(ctx, status==true ? shortReq.url : '', status==true ? shortReq.url : ''));
    }else if(ctx.message.chat.type == 'private'){
        ctx.reply('Please send a valid URL !');
    }})

bot.on('inline_query', async(ctx) => {
    const method = ctx.inlineQuery.query.split(' ')[0];
    const url = ctx.inlineQuery.query.split(' ')[1];
    const genArticle = (title, description, message_text) => ({
        type: 'article', id: 1, title, description, thumb_url: '',input_message_content:{
            message_text, disable_web_page_preview: true, parse_mode: 'markdown' 
        }
    })
    if(validUrl.isUri(url)){
      if(method == 'short' ){
        const shortReq = await short(url);
        return await ctx.answerInlineQuery([genArticle('SHORT', `Short ${url}`, shortReq.msg)])
      }else if(method == 'unshort' ){
        const longUrl = await unshort(url);
        return await ctx.answerInlineQuery([genArticle('UNSHORT', `Unshort ${url}`, `Here's the extracted link : \n👉 ${longUrl} .`)])
      }
    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))