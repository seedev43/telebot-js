const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};
module.exports = {
  name: "ping",
  aliases: ["ping", "pung"],
  description: "ping bot",
  tags: "main",
  noPrefix: true,
  run: async ({ bot, m }) => {
    return m.reply(`Pong!\n🏎️ ${processTime(m.date, moment())} seconds`);
  },
};
