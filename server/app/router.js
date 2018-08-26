module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/filelist', controller.fs.list);
  router.get('/news', controller.news.list);
};
