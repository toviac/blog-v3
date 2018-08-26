const { Service } = require('egg');
const fs = require('fs');
// const { join } = require('path');

class FileService extends Service {
  async list() {
    // read config
    const { filePath } = this.config.files;
    console.log('filePath: ', filePath);
    const find = await fs.readdirSync(filePath);
    console.log('find: ', find);
    return find;
  }
}

module.exports = FileService;
