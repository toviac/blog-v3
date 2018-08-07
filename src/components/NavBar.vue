<!-- nav-bar -->
<template>
  <el-menu
    class="nav-bar"
    :router="true"
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item
      v-for="item in navList"
      :key="item.index"
      :index="item.index"
      :route="item.route"
    >
      {{ item.name }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 'first',
      navList: [
        {
          index: 'first',
          name: '首页',
          route: {
            path: '/',
          },
        },
        {
          index: 'second',
          name: 'Blogs',
          route: {
            path: '/',
          },
        },
        {
          index: 'thrid',
          name: '小练习',
          route: {
            path: '/',
          },
        },
      ],
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    handleSelect(key) {
      console.log('key: ', key);
    },
  },
};

</script>
<style lang='scss' scoped>
.nav-bar {
  margin-top: calc(100% - 61px);
}
</style>
