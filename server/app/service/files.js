const { Service } = require('egg');
const fs = require('fs');
// const { join } = require('path');

class FileService extends Service {
  async list() {
    // read config
    const { filePath } = this.config.files;
    const files = await fs.readdirSync(filePath);
    return files;
  }
}

module.exports = FileService;
