import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
      children: [
        // {
        //   path: '',
        //   component: () => import('@/views/layout/ArticleList.vue'),
        // },
        {
          path: '/blog/:fileName',
          component: () => import('@/views/layout/ContentWrapper.vue'),
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    // },
  ],
});
