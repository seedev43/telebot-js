const { Bot: _Bot } = require("grammy");
class Bot extends _Bot {
  constructor(...args) {
    super(...args);
  }

  async getFileLink(file_id) {
    let getFile = await this.api.getFile(file_id);
    getFile.link = `https://api.telegram.org/file/bot${this.token}/${getFile.file_path}`;
    return getFile;
  }
}

module.exports = { Bot };
