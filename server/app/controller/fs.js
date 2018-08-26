const { Controller } = require('egg');

class FsController extends Controller {
  async list() {
    const { ctx } = this;
    const fileList = await ctx.service.files.list();
    // await this.ctx.render('news/list.tpl', { list: fileList });
    this.ctx.body = {
      list: fileList,
      resultCode: '100',
    };
  }
}

module.exports = FsController;
