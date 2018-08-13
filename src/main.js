import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css';
import mavonEditor from 'mavon-editor';
// import highlightcode from './highlightcode';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

// h-code全局组件, 高亮代码
// Vue.component('h-code', highlightcode);
Vue.use(mavonEditor);
Vue.use(ElementUI);


console.log('markdown-it: ', mavonEditor.markdownIt);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
