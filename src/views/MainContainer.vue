<!-- index -->
<template>
  <div class="main-container">
    <nav-bar></nav-bar>
    <el-scrollbar ref="scrollbar" class="scroll-bar" wrap-style="overflow-x: hidden;">
      <el-row :gutter="20">
        <el-col :span="15">
            <content-wrapper></content-wrapper>
        </el-col>
        <el-col :span="5" id="side-bar-outer">
          <side-bar @toggle-show="handleToggleShow"></side-bar>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import ContentWrapper from '@/components/ContentWrapper.vue';

export default {
  name: 'MainContainer',
  data() {
    return {
    };
  },
  components: {
    NavBar,
    SideBar,
    ContentWrapper,
  },
  computed: {},
  mounted() {},
  methods: {
    handleToggleShow() {
      // this.$emit('toggle-show');
      this.scrollToTop();
    },
    scrollToTop() {
      let el = this.$refs['scrollbar'].$refs['wrap'];
      this.$nextTick(() => {
        el.scrollTop = 0;
      });
    },
  },
};

</script>
<style lang='scss' scoped>
.main-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #eeeeee;
  .el-row {
    display: flex;
    justify-content: center;
    margin: 0 !important;
    padding-top: 10px;
  }
  .scroll-bar {
    height: calc(100vh - 61px);
  }
  .scroll-wrapper {
    height: 300px;
    overflow-x: hidden !important;
  }
}
</style>
