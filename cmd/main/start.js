module.exports = {
  name: "start",
  description: "start bot",
  tags: "main",
  run: async ({ bot, m }) => {
    return m.reply("Hello!");
  },
};
