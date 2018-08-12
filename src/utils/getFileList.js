const fs = require('fs');

console.log('fs: ', fs);
// 解析需要遍历的文件夹
const path = require('path');

const filePath = path.resolve('/public');
// 文件遍历
const fileDisplay = () => {
  const filepath = filePath;
  fs.readdir(filepath, (error, files) => {
    if (error) {
      console.warn('ERR: ', error);
    } else {
      // 遍历读取到的文件列表
      files.map((filename) => {
        // 获取当前文件的绝对路径
        const filedir = path.join(filepath, filename);
        // 根据文件路径获取文件信息, 返回一个fs.State对象
        fs.stat(filedir, (err, stats) => {
          if (err) {
            console.warn('获取文件stats失败');
          } else {
            // 是文件
            const isFile = stats.isFile();
            // 是文件夹
            const isDir = stats.isDirectory();
            if (isFile) {
              console.log('文件目录: ', filedir);
              const content = fs.readFileSync(filedir, 'utf-8');
              console.log('文件内容: ', content);
            }
            if (isDir) {
              // 是文件夹则递归遍历
              fileDisplay(filedir);
            }
          }
        });
        return null;
      });
    }
  });
};

export default fileDisplay;
// fileDisplay(filePath);
