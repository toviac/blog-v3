<!-- nav-bar -->
<template>
  <!-- :router="true" -->
  <el-menu
    class="nav-bar"
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
          name: 'Blogs',
          route: {
            path: '/',
          },
        },
        {
          index: 'second',
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
  z-index: 2;
  // margin-top: calc(100% - 61px);
  padding: 0 calc(100% / 12);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
