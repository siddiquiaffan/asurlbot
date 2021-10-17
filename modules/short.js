const axios = require('axios');

const short = async(url) => {
    const shortReq = await axios.get(`http://cutt.ly/api/api.php?key=${process.env.API_KEY}&short=${url}`);
    const data = await shortReq.data;
    const shortenURL = data.url.shortLink;
    const status = data.url.status;
    return status == 7 ? {status: true, msg: `Here's the shorten url : \n👉 ${shortenURL} .`, url: shortenURL} : (status == 1 ? {status: true, msg: `The URL you've sent is already shortened : \n👉 ${url} .`, url: url} : {status: false, msg:'Failed to short your URL.'});
}

module.exports = short;