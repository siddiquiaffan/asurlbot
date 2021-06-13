const axios = require("axios");

const unshort = async (url) => {
      const res = await axios.get(url);
      try{
            const longUrl = res.request.res.responseUrl ? res.request.res.responseUrl : url;
            return longUrl;
      }catch(err){
            return 'Failed to extratc long url.'
      }
   
}
module.exports = unshort;