<!-- index -->
<template>
  <div class="main-container" @mousewheel="handleContainerMouseWheel">
    <nav-bar></nav-bar>
    <el-scrollbar id="scroll-box" ref="scrollbar"
     class="scroll-bar" wrap-style="overflow-x: hidden;">
      <el-row :gutter="20">
        <el-col :span="15">
            <content-wrapper></content-wrapper>
        </el-col>
        <el-col :span="5" id="side-bar-outer">
          <side-bar @toggle-show="handleToggleShow"></side-bar>
          <!-- 滚动到顶部按钮 -->
          <transition name="el-fade-in">
            <div
              class="el-button scroll-to-top-btn"
              v-show="showScrollTop"
              @click="scrollToTop"
            >
              <i class="el-icon-caret-top"></i>
            </div>
          </transition>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import NavBar from '@/views/layout/NavBar.vue';
import SideBar from '@/views/layout/SideBar.vue';
import ContentWrapper from '@/views/layout/ContentWrapper.vue';

export default {
  name: 'MainContainer',
  data() {
    return {
      showScrollTop: false,
      // 鼠标滚轮向上滚动的次数
      wheelTop: 0,
    };
  },
  components: {
    NavBar,
    SideBar,
    ContentWrapper,
  },
  computed: {},
  watch: {
    wheelTop(newVal) {
      if (newVal > 4) {
        this.$emit('toggle-show');
        this.$nextTick(() => {
          this.wheelTop = 0;
        });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      const targetScroll = document.getElementById('scroll-box').children[0];
      targetScroll.addEventListener('scroll', this.handleScroll);
    });
  },
  methods: {
    // container 鼠标滚动事件
    handleContainerMouseWheel(e) {
      if (this.$route.path !== '/') {
        return;
      }
      const wrapperTop = this.$refs.scrollbar.$refs.wrap.scrollTop;
      // 鼠标向上滚动 && 页面中滚动框已滚到最上
      if (e.wheelDelta > 0 && Number(wrapperTop) === 0) {
        this.wheelTop = this.wheelTop + 1;
      } else {
        this.wheelTop = 0;
      }
    },
    handleToggleShow() {
      this.$emit('toggle-show');
      // this.scrollToTop();
    },
    handleScroll() {
      this.showScrollTop = this.$refs.scrollbar.$refs.wrap.scrollTop > 300;
    },
    scrollToTop() {
      const el = this.$refs.scrollbar.$refs.wrap;
      // 每一步走的距离
      const step = el.scrollTop / 20;
      let timer = null;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (el.scrollTop > 0) {
          el.scrollTop -= step;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
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
  .scroll-to-top-btn {
    position: fixed;
    bottom: 20vh;
  }
}
</style>
