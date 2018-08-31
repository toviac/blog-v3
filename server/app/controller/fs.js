const { Controller } = require('egg');
// 获取标题正则
const getTitleReg = /^#\s(.*)/g;

class FsController extends Controller {
  async list() {
    const { ctx } = this;
    const fileList = await ctx.service.files.list();
    // map里有异步, 没有promise.all会输出一个pending的promise
    const titleList = await Promise.all(fileList.map(async (file) => {
      const content = await ctx.service.files.content(file);
      const title = content.match(getTitleReg);
      return {
        title: title[0],
        createDate: file.replace('.md', ''),
      };
    }));
    // await this.ctx.render('news/list.tpl', { list: fileList });
    this.ctx.body = {
      list: titleList,
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
