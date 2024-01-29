const chalk = require("chalk");
const { commandExecute } = require("./command");
const moment = require("moment-timezone");

async function message(bot, m) {
  let ok = new Date(m.date * 1000);
  let log = `${chalk.red("------------------------------")}
${
  m.isGroup
    ? `${chalk.magenta(m.type.toUpperCase() + " CHAT")}
${chalk.blueBright("CHAT ID: " + m.chatid)}
${chalk.blueBright("GROUP NAME: " + m.msg.chat.title)}
${chalk.blueBright("USER ID: " + m.fromid)}
${chalk.blueBright("PUSHNAME: " + m.pushname)}
${chalk.blueBright("MESSAGE ID: " + m.msgid)}
${chalk.blueBright("MESSAGE:\n" + m.text)}`
    : `${chalk.magenta(m.type.toUpperCase() + " CHAT")}
${chalk.cyan("USER ID: " + m.fromid)}
${chalk.cyan("PUSHNAME: " + m.pushname)}
${chalk.cyan("MESSAGE ID: " + m.msgid)}
${chalk.cyan("MESSAGE:\n" + m.text)}`
}
${chalk.yellow("SENDING AT: " + moment(ok).format("DD-MM-YYYY HH:mm:ss"))}
${chalk.red("------------------------------")}
`;
  console.log(log);
  commandExecute(bot, m);
}

module.exports = message;
