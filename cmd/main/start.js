module.exports = {
  name: "start",
  description: "start bot",
  tags: "owner",
  run: async ({ bot, m }) => {
    return m.reply("Hello!");
  },
};
