const { Service } = require('egg');
const fs = require('fs');
const { join } = require('path');

class FileService extends Service {
  async list() {
    // read config
    const { filePath } = this.config.files;
    const files = await fs.readdirSync(filePath);
    return files;
  }
  async content(fname) {
    const { filePath } = this.config.files;
    if (fs.existsSync(fname)) {
      console.log('--->');
    }
    const file = await fs.readFileSync(join(filePath, fname), 'utf-8');
    return file;
  }
}

module.exports = FileService;
