<!-- index -->
<template>
  <div class="main-container">
    <nav-bar></nav-bar>
    <el-scrollbar id="scroll-box" ref="scrollbar"
     class="scroll-bar" wrap-style="overflow-x: hidden;" @scroll.native="handleScroll">
      <el-row :gutter="20">
        <el-col :span="15">
            <content-wrapper></content-wrapper>
        </el-col>
        <el-col :span="5" id="side-bar-outer">
          <side-bar @toggle-show="handleToggleShow"></side-bar>
          <!-- 滚动到顶部按钮 -->
          <transition name="el-fade-in">
            <el-button
              plain
              class="scroll-to-top-btn"
              v-show="showScrollTop"
              @click="scrollToTop"
            >
              <i class="el-icon-caret-top"></i>
            </el-button>
          </transition>
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
      showScrollTop: true,
    };
  },
  components: {
    NavBar,
    SideBar,
    ContentWrapper,
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.scrollbar.$refs.wrap;
      const ele = document.getElementById('scroll-box');
      console.log('el: ', el);
      console.log('ele: ', ele);
      ele.addEventListener('scroll', this.handleScroll());
    });
  },
  methods: {
    handleToggleShow() {
      this.$emit('toggle-show');
      // this.scrollToTop();
    },
    handleScroll() {
      console.log('listened');
      // this.showScrollTop = this.$refs.scrollbar.$refs.wrap.scrollTop > 100;
    },
    scrollToTop() {
      const el = this.$refs.scrollbar.$refs.wrap;
      let timer = null;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (el.scrollTop > 0) {
          el.scrollTop -= 20;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
      // this.$nextTick(() => {

      //   el.scrollTop = 0;
      // });
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
  .scroll-to-top-btn {
    position: fixed;
    bottom: 300px;
  }
}
</style>
