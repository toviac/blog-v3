const { Controller } = require('egg');

class FsController extends Controller {
  async list() {
    const { ctx } = this;
    const fileList = await ctx.service.files.list();
    await this.ctx.render('news/list.tpl', { list: fileList });
  }
}

module.exports = FsController;
