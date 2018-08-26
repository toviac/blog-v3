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
  async content() {
    const { ctx } = this;
    const fName = ctx.query.fileName;
    const fileContent = await ctx.service.files.content(fName);
    this.ctx.body = {
      content: fileContent,
      resultCode: '100',
    };
  }
}

module.exports = FsController;
