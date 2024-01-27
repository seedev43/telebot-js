const { command, commandExecute } = require("./command");

async function message(bot, m) {
  // console.log("LOG DARI MESSAGE", JSON.stringify(m, null, 2));
  commandExecute(bot, m);
}

module.exports = message;
