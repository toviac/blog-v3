<!-- index -->
<template>
  <div class="main-container" @mousewheel="handleContainerMouseWheel">
    <nav-bar @select="activeTab = $event"></nav-bar>
    <el-scrollbar id="scroll-box" ref="scrollbar"
     class="scroll-bar" wrap-style="overflow-x: hidden;">
      <el-row :gutter="20">
        <el-col :span="15">
          <transition name="slide" mode="out-in">
            <!-- 同样元素切换需要添加key才会有动画 -->
            <div class="list-item" v-if="showBlog" key="blog">
              <transition name="slide" mode="out-in">
                <article-list v-if="showFileList" :list="fileList" @title-click="handleTitleClick">
                </article-list>
                <router-view v-else key="view" ref="view" @articleReady="articleReady">
                </router-view>
              </transition>
            </div>
            <!-- 小练习 -->
            <div class="list-item" v-else key="practice">
              <article-list :list="fileList" @title-click="handleTitleClick">
              </article-list>
            </div>
          </transition>
        </el-col>
        <el-col :span="5" class="side-bar-outer">
          <side-bar
            :sectionList="sectionList"
            :currentSection="currentSection"
            @btn-click="sideBarClick">
          </side-bar>
          <!-- 滚动到顶部按钮 -->
          <transition name="el-fade-in-linear">
            <div
              class="el-button scroll-to-top-btn"
              v-show="showScrollTop"
              @click="scrollToTargetPosition"
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
import ArticleList from '@/views/layout/ArticleList.vue';
import http from '@/common/http';
import viewport from '@/plugins/viewport';

export default {
  name: 'MainContainer',
  data() {
    return {
      // 当前导航标签
      activeTab: 'blog',
      showScrollTop: false,
      // 鼠标滚轮向上滚动的次数
      wheelTop: 0,
      // 文章列表
      fileList: [],
      // 文章是否加载完毕
      isReady: false,
      sectionNodeGroup: [],
      currentSection: '',
      sectionPercent: 0,
      sectionList: [],
    };
  },
  components: {
    NavBar,
    SideBar,
    ContentWrapper,
    ArticleList,
  },
  computed: {
    showBlog() {
      return this.activeTab === 'blog';
    },
    showFileList() {
      return this.$route.path === '/';
    },
  },
  watch: {
    $route(to) {
      if (to.path === '/') {
        this.sectionList = [];
      }
    },
    activeTab(newVal) {
      if (newVal === 'blog') {
        this.getList();
      }
    },
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
      // 监听滚动事件
      const targetScroll = document.getElementById('scroll-box').children[0];
      targetScroll.addEventListener('scroll', this.handleScroll);
      // viewport.js 设置滚动区域
      const ele = document.getElementsByClassName('el-scrollbar__wrap')[0];
      ele.classList.add('viewport');
    });
    this.getList();
  },
  methods: {
    sideBarClick(btn) {
      this.scrollToTargetPosition(btn.id);
    },
    // viewport.js start
    // contentWrapper触发的ready事件
    articleReady() {
      console.log('ready');
      viewport.reset();
      // sectionNodeGroup为HTMLCollection类型, 没有Array对应的一些遍历方法如map, forEach
      this.sectionNodeGroup = document.getElementsByClassName('section');
      this.sectionList = [];
      for (let i = 0; i < this.sectionNodeGroup.length; i++) {
        this.sectionList.push({
          label: this.sectionNodeGroup[i].innerHTML,
          percent: Math.max(0, Math.min(1, this.sectionNodeGroup[i].viewportTopLocation)),
          id: this.sectionNodeGroup[i].id,
        });
      }
      console.log('sectionList: ', this.sectionList);
      this.$nextTick(() => {
        this.isReady = true;
      });
    },
    scrollListener() {
      if (!this.sectionNodeGroup.length) return;
      const myViewPort = document.getElementsByClassName('viewport')[0];
      this.currentSection = myViewPort.currentSection.innerHTML;
      this.sectionPercent = Math.max(0, Math.min(1, this.currentSection.viewportTopLocation));
    },
    // viewport.js end
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
      // this.scrollToTargetPosition();
    },
    handleScroll() {
      // 触发contentWrapper中的事件
      if (this.isReady) {
        this.scrollListener();
      }
      this.showScrollTop = this.$refs.scrollbar.$refs.wrap.scrollTop > 300;
    },
    // 向上/下滚动到固定位置
    scrollToTargetPosition(targetElId) {
      let targetPos = 0;
      if (typeof targetElId === 'string') {
        targetPos = document.getElementById(targetElId).offsetTop - 20;
      }
      const el = this.$refs.scrollbar.$refs.wrap;
      // 每一步走的距离
      // 在算+=的时候每次step会向上取整, 这里用Math.floor()来保证足够的滚动距离
      const step = Math.floor(Math.abs(el.scrollTop - targetPos) / 20);
      let timer = null;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        // 判断是否滚到底部
        const hasScrolledToBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
        if (Math.abs(el.scrollTop - targetPos) < step) {
          cancelAnimationFrame(timer);
        } else if (el.scrollTop > targetPos) {
          el.scrollTop -= step;
          timer = requestAnimationFrame(fn);
        } else if (el.scrollTop < targetPos) {
          if (hasScrolledToBottom) return;
          el.scrollTop += step;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
    // 获取服务器文章md列表
    getList() {
      const url = '/api/post/list';
      http.get(url, {})
        .then((data) => {
          this.fileList = data.list;
        })
        .catch();
    },
    handleTitleClick(item) {
      this.$router.push(`${this.activeTab}/${item.id}`);
    },
  },
};

</script>
<style lang='scss' scoped>
.main-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
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
    bottom: 10vh;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-leave-active,
  .slide-enter-active {
    transition: all 0.5s;
  }
  .slide-enter {
    opacity: 0;
    transform: translateX(-20px);
  }
  .slide-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
}
</style>
