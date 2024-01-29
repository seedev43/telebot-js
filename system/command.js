const path = require("path");
const fs = require("fs");
const helpers = require("../helpers/helpers");
let commands = new Map();

function commandExecute(bot, m) {
  const dir = path.join(__dirname, "..", "cmd");
  const dirs = fs.readdirSync(dir);

  // Clear the existing commands map before reloading
  commands.clear();

  dirs
    .filter((a) => a !== "function")
    .map(async (res) => {
      let files = fs
        .readdirSync(`${dir}/${res}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of files) {
        const cmd = require(`../cmd/${res}/${file}`);
        commands.set(cmd.name, cmd);
      }
    });

  const cmd = m.text
    .slice(m.prefix.length)
    .trim()
    .split(/ +/)
    .shift()
    .toLowerCase();

  const command =
    commands.get(cmd) ||
    (() => {
      let foundCommand = null;
      commands.forEach((val) => {
        if (val.aliases && val.aliases.includes(cmd)) {
          foundCommand = val;
        }
      });
      return foundCommand;
    })();

  if (command && !m.isBot) {
    if (command.noPrefix) {
      command.noPrefix = true;
    } else {
      command.noPrefix = false;
    }

    if (
      (command.noPrefix && m.prefix === "") ||
      (!command.noPrefix && m.prefix !== "" && m.text.startsWith(m.prefix))
    ) {
      if (command.isOwner && !m.isOwner) {
        return m.reply(helpers.notOwner);
      }

      if (command.isGroup && !m.isGroup) {
        return m.reply(helpers.notGroup);
      }

      if (command.isBotAdmin && !m.isBotAdmin) {
        return m.reply(helpers.botNotAdmin);
      }

      if (command.isAdmin && !m.isAdmin) {
        return m.reply(helpers.notAdmin);
      }

      command
        .run({ bot, m })
        .then((a) => a)
        .catch((err) => console.log(err));
    }
  }
}

module.exports = { commands, commandExecute };
