<template>
  <div class="home">
    <!-- 不是首页时不显示头图 -->
    <div v-if="showBgImg">
      <!-- 背景图片 -->
      <div class="home-background" :style="bgImgStyle"></div>
      <!-- 灰色遮罩部分 -->
      <el-collapse-transition>
        <div v-show="showCover" class="home-cover" @mousewheel="onMouseWheel">
            <el-button type="text" @click="onMouseWheel">
              <i class="iconfont icon-arrowdown"></i>
            </el-button>
        </div>
      </el-collapse-transition>
    </div>
    <!-- 主页面 -->
    <el-collapse-transition>
      <main-container v-show="!showCover" @toggle-show="showCover = true"></main-container>
    </el-collapse-transition>
  </div>
</template>

<script>
import MainContainer from './MainContainer.vue';

export default {
  name: 'Home',
  data() {
    return {
      showCover: true,
      bgImgStyle: {
        'background-image': 'url(69646886_p0.png)',
      },
    };
  },
  components: {
    MainContainer,
  },
  methods: {
    onMouseWheel(e) {
      // 鼠标滚轮向下滚动
      if (!e.wheelDelta || e.wheelDelta < 0) {
        this.showCover = false;
      }
    },
  },
  computed: {
    showBgImg() {
      return this.$route.path === '/';
    },
  },
  watch: {},
  mounted() {
  },
};
</script>

<style lang="scss">
.home {
  .home-background {
    z-index: -1;
    position: fixed;
    min-width: 800px;
    width: 100vw;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
  }
  .home-cover {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100vh;
    padding-bottom: 20px;
    background-color: rgba(0, 0, 0, .5);
    .el-button--text {
      padding: 0;
      color: #e4e4e4;
      &:hover {
        color: #ffffff;
      }
    }
    .iconfont {
      font-size: 50px;
    }
  }
}
</style>
