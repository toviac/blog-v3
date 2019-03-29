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
        {
          path: '/blog/edit/:postId?',
          component: () => import('@/views/CreatePage.vue'),
        },
        {
          path: '/blog/:postId',
          component: () => import('@/views/layout/ContentWrapper.vue'),
        },
        {
          path: '/practice/:practiceName',
          component: () => import('@/views/practices/Index.vue'),
        },
      ],
    },
    {
      path: '/test/card-btn',
      component: () => import('@/tests/CardBtn.vue'),
    },
    // 404重定向
    {
      path: '*',
      redirect: '/',
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
