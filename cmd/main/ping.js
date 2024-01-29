const moment = require("moment-timezone");

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};
module.exports = {
  name: "ping",
  aliases: ["pung"],
  description: "ping bot",
  tags: "main",
  noPrefix: true,
  isBotAdmin: true,
  run: async ({ bot, m }) => {
    return m.reply(`Pong!\n🏎️ ${processTime(m.date, moment())} seconds`);
  },
};
