require("dotenv").config();
const { Bot } = require("./system/bot");
const serialize = require("./system/serialize");
const message = require("./system/message");

async function startBot() {
  try {
    const bot = new Bot(process.env.BOT_TOKEN);

    // Handle other messages.
    bot.on("message", async (ctx) => {
      const m = await serialize(bot, ctx);
      message(bot, m);
    });

    bot.start({
      drop_pending_updates: true,
    });

    console.log("BOT STARTED!");
  } catch (err) {
    console.error(err);
  }
}

startBot();
