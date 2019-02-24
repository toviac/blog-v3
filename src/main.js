import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css';
import mavonEditor from 'mavon-editor';
// import highlightcode from './highlightcode';

// 引入socket.io
import VueSocketio from 'vue-socket.io';

import App from './App.vue';
import router from './routes';
import store from './store';
import './registerServiceWorker';

// socket.io 引入
Vue.use(new VueSocketio({
  debug: true,
  connection: 'http://127.0.0.1:7001',
  vuex: {
    store,
    // Prefix for emitting server side vuex actions
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
}));

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
