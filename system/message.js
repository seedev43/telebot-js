const chalk = require("chalk");
const { command, commandExecute } = require("./command");

function convertInt64ToDate(int64Timestamp) {
  const timestampInMillis = int64Timestamp * 1000; // konversi detik ke milidetik
  const dateObject = new Date(timestampInMillis);

  // Format tanggal dan waktu
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
}

async function message(bot, m) {
  // Contoh penggunaan
  const int64Timestamp = 1643752730; // contoh timestamp dalam detik
  const formattedDateTime = convertInt64ToDate(int64Timestamp);

  console.log(formattedDateTime);
  // console.log("LOG DARI MESSAGE", JSON.stringify(m, null, 2));
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
${chalk.red("------------------------------")}
`;
  console.log(log);
  commandExecute(bot, m);
}

module.exports = message;
