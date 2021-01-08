const axios = require("axios");

const sendToDiscord = ({ url, username, content, embeds }) => {
  return axios({
    url,
    method: "post",
    data: {
      content,
      embeds,
      username: "Github",
    },
  });
};

module.exports = sendToDiscord;
