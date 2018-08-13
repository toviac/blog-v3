import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  // github样式markdown
  gfm: true,
  // github表格
  tables: true,
  // github换行符
  breaks: false,
  // 只解析符合markdown.pl定义的，不修正markdown的错误
  pedantic: false,
  // 原始输出, 忽略HTML标签
  sanitize: true,
  // 优化列表输出
  smartLists: true,
  smartypants: false,
  // highlight.js
  highlight: (code) => hljs.highlightAuto(code).value,
});

export default marked;
