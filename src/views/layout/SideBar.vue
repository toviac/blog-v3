<template>
  <el-card
    class="side-bar"
    :style="{'max-height': maxHeight + 'px'}"
    :body-style="{ padding: '10px' }"
  >
    <img class="avatar" src="@/assets/img/Miku.gif" alt="">
    <el-collapse-transition>
      <div class="anchor-btn-group" v-show="showBtnList">
        <el-button
          plain
          v-for="section in sectionList"
          :key="section.index"
          :class="{ 'current-btn': section.label === currentSection }"
          @click="handleBtnClick(section)"
        >
          {{ section.label }}
        </el-button>
      </div>
    </el-collapse-transition>
    <el-button-group>
      <a href="https://github.com/coolucifer" target="_blank">
        <el-button plain icon="iconfont icon-github">Github</el-button>
      </a>
      <a href="http://wpa.qq.com/msgrd?v=3&uin=1045606768&site=qq&menu=yes" targe="_blank">
        <el-button plain icon="iconfont icon-qq">QQ</el-button>
      </a>
      <a href="mailto:me@doco.dev">
        <el-button plain icon="iconfont icon-mail">Mailto</el-button>
      </a>
    </el-button-group>
  </el-card>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    currentSection: {
      type: String,
      default: '',
    },
    sectionList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      showBtnList: false,
    };
  },
  components: {
  },
  computed: {
    maxHeight() {
      if (this.$route.path === '/') {
        return 450;
      }
      return 1500;
    },
  },
  watch: {
    sectionList(newVal) {
      if (newVal.length) {
        this.$nextTick(() => {
          this.showBtnList = true;
        });
      } else {
        this.$nextTick(() => {
          this.showBtnList = false;
        });
      }
    },
  },
  methods: {
    handleBtnClick(btn) {
      this.$emit('btn-click', btn);
      console.log('btnClick: ', btn);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.side-bar {
  position: fixed;
  width: calc(100vw / 24 * 5);
  transition: height 1s;
  max-width: 400px;
  min-width: 300px;
  .avatar {
    max-width: 100%;
  }
  .anchor-btn-group {
    margin-bottom: 5px;
    .el-button {
      width: 100%;
      margin-top: 5px;
      & + .el-button {
        margin-left: 0;
      }
    }
    .current-btn {
      border-color: #409EFF;
      color: #409EFF;
      background-color: #ecf5ff;
    }
  }
  .el-button-group {
    display: flex;
    a {
      flex-grow: 1;
      display: flex;
      text-decoration: none;
      .el-button {
        flex-grow: 1;
        border-radius: 0;
      }
      &:first-child > .el-button {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child > .el-button {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>
