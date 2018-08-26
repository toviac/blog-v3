<!-- index -->
<template>
  <div class="main-container" @mousewheel="handleContainerMouseWheel">
    <nav-bar></nav-bar>
    <el-scrollbar id="scroll-box" ref="scrollbar"
     class="scroll-bar" wrap-style="overflow-x: hidden;">
      <el-row :gutter="20">
        <el-col :span="15">
          <article-list-item
            v-if="showFileList"
            v-for="item in fileList"
            :key="item.index"
            :item="item">
          </article-list-item>
          <content-wrapper v-else></content-wrapper>
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
import ArticleListItem from '@/components/ArticleListItem.vue';
import http from '@/common/http';

export default {
  name: 'MainContainer',
  data() {
    return {
      showScrollTop: false,
      // 鼠标滚轮向上滚动的次数
      wheelTop: 0,
      // 文章列表
      fileList: [],
    };
  },
  components: {
    NavBar,
    SideBar,
    ContentWrapper,
    ArticleListItem,
  },
  computed: {
    showFileList() {
      if (this.$route.path === '/') {
        return true;
      }
      return false;
    },
  },
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
    this.getList();
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
    // 获取服务器文章md列表
    getList() {
      const url = '/filelist';
      http.get(url, {})
        .then((data) => {
          this.fileList = data.list.map(file => ({ title: file }));
        })
        .catch();
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
