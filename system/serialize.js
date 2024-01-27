const { owners, prefixList } = require("../config/config");

async function serializeMsg(bot, m) {
  if (!m) return;
  // bot status
  m.idBot = m.me.id;
  m.usernameBot = m.me.username;
  m.nameBot =
    m.me.first_name +
    (m.me.last_name !== undefined ? " " + m.me.last_name : "");

  let update = m.update;
  m.msg = update.msg;
  m.date = m.msg.date;
  m.msgid = m.msg.message_id;
  m.pushname =
    m.msg.from.first_name +
    (m.msg.from.last_name !== undefined ? " " + m.msg.from.last_name : "");
  m.text = m.msg.text;
  m.chatid = m.msg.chat.id;
  m.fromid = m.msg.from.id;
  m.isBot = m.msg.from.is_bot;
  m.isOwner = owners.includes(m.fromid);

  m.isChannel = (() => {
    return m.msg.chat.type === "channel";
  })();

  m.isGroup = (() => {
    return m.msg.chat.type !== "private" && m.msg.chat.type !== "channel";
  })();

  m.isPrivate = (() => {
    return m.msg.chat.type === "private";
  })();

  m.isAdmin = await (async () => {
    admins = await bot.api.getChatAdministrators(m.chatid);
    let check = admins.some((admin) => admin.user.id === m.fromid);
    return check;
  })();

  m.isBotAdmin = await (async () => {
    admins = await bot.api.getChatAdministrators(m.chatid);
    let check = admins.some((admin) => admin.user.id === m.idBot);
    return check;
  })();
  const regexPrefix = new RegExp("^[" + prefixList + "]", "i");
  const matchPrefix = regexPrefix.test(m.text)
    ? m.text.match(regexPrefix)[0]
    : "";

  m.prefix = matchPrefix;
  m.query = m.text.split(" ").slice(1).join(" ");

  if (m.msg?.photo || m.msg?.video || m.msg?.document || m.msg?.sticker) {
    if (m.msg.photo) {
      m.media = m.msg.photo[m.msg.photo.length - 1];
    } else if (m.msg.video) {
      m.media = m.msg.video;
    } else if (m.msg.document) {
      m.media = m.msg.document;
    } else if (m.msg.sticker) {
      m.media = m.msg.sticker;
    }
  }

  //custom function
  m.reply = (text, options = {}) => {
    return bot.api.sendMessage(m.chatid, text, {
      reply_parameters: {
        message_id: m.msgid,
      },
      ...options,
    });
  };

  return m;
}

module.exports = serializeMsg;
