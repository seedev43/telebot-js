const { commands } = require("../../system/command");

module.exports = {
  name: "menu",
  aliases: ["menu"],
  tags: "main",
  run: async ({ bot, m }) => {
    let tags = Array.from(commands.values());
    let list = {};
    let text = `Hi ${m.pushname}\n\n`;

    tags.forEach((value) => {
      if (!value?.tags) return;
      if (!(value?.tags in list)) {
        list[value.tags] = [];
      }
      list[value.tags].push(value);
    });

    Object.entries(list).map(([tag, cmd]) => {
      text += `「 ${tag.toUpperCase()} MENU 」\n`;
      text +=
        cmd
          .map(
            (val) =>
              `✦ ${val.noPrefix ? val.name : m.prefix + val.name} ${
                val.description ? val.description : ""
              }`
          )
          .join("\n") + "\n";
      text += "\n";
    });
    text += "© SeeDev Bot 2023";
    m.reply(text);
  },
};
