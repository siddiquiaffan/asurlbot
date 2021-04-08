const axios = require("axios");
const { token } = require("../config");
const validUrl = require("valid-url");
const { Telegraf } = require("telegraf");
const bot = new Telegraf(token);
const fs = require('fs');

const unshort = (url) => {
      const promise = axios.get(url);
      const dataPromise = promise.then((res) => res);
      return dataPromise;
   
  }

module.exports = unshort;
