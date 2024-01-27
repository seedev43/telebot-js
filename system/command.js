const path = require("path");
const fs = require("fs");
let commands = new Map();

function commandExecute(bot, m) {
  const dir = path.join(__dirname, "..", "cmd");
  const dirs = fs.readdirSync(dir);
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

  const cmd = m.text.slice(1).trim().split(/ +/).shift().toLowerCase();

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
    if (!!m.prefix && m.text.startsWith(m.prefix)) {
      command
        ?.run({ bot, m })
        ?.then((a) => a)
        ?.catch((err) => console.log(err));
    }
  }
}
module.exports = { commands, commandExecute };
