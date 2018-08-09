<template>
  <el-collapse-transition>
    <div v-show="showBGImg" class="home-cover" :style="bgImg">
      <div class="cover" @mousewheel="onMouseWheel">
        <el-button type="text" @click="showBGImg = !showBGImg">
          <i class="iconfont icon-arrowdown"></i>
        </el-button>
      </div>
    </div>
  </el-collapse-transition>
</template>

<script>

export default {
  name: 'HomeCover',
  data() {
    return {
      showBGImg: true,
      bgImg: {
        background: 'url(69646886_p0.png) 50% 50% / 100% auto no-repeat',
      },
    };
  },
  components: {
  },
  methods: {
    onMouseWheel(e) {
      // 鼠标滚轮向下滚动
      if (e.wheelDelta < 0) {
        this.showBGImg = false;
      }
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.home-cover {
  .cover {
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
