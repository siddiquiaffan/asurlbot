const axios = require("axios");
const { token } = require("../config");
const validUrl = require("valid-url");
const { Telegraf } = require("telegraf");
const bot = new Telegraf(token);

const unshort = (message, chatId) => {
  const url = message.split(" ").slice(1)[0];
  if (validUrl.isUri(url)) {
    axios
      .get(url)
      .then((res) => {
        const longUrl = res.request.res.responseUrl;
        bot.telegram.sendMessage(
          chatId,
          `Here's the extracted link : \n👉 ${longUrl} \n\n${username ? '@'+username : "" }`,
          {
            reply_markup: {
              inline_keyboard: [[{ text: "Extracted URL", url: longUrl }]],
              force_reply: true,
            },
          }
        );
      })
      .catch((err) => {
        const longUrl = err.request._currentUrl || err.request._options.href;
        if (longUrl) {
          bot.telegram.sendMessage(
            chatId,
            `Here's the extracted link : \n👉 ${longUrl} \n\n${username ? '@'+username : "" }`,
            {
              reply_markup: {
                inline_keyboard: [[{ text: "Extracted URL", url: longUrl }]],
                force_reply: true,
              },
            }
          );
        } else {
          ctx.replyWithMarkdown("Link is invalid");
        }
      });
  } else {
    console.log(
      "An error has been occurred , Either the URL you sent is invalid or not a URL."
    );
  }
};

module.exports = unshort;
