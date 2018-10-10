<template>
  <el-card
    class="side-bar"
    :body-style="{ padding: '10px' }"
  >
    <img class="avatar" src="@/assets/img/Miku.gif" alt="">
    <div class="anchor-btn-group">
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
    <el-button-group>
      <el-button plain icon="iconfont icon-github">Github</el-button>
      <el-button plain icon="iconfont icon-qq">QQ</el-button>
      <el-button plain icon="iconfont icon-mail">Mailto</el-button>
    </el-button-group>
  </el-card>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    currentSection: {
      type: String,
      default: ''
    },
    sectionList: {
      type: Array,
      default() {
        return [
          {
            label: '导航按钮A',
          },
          {
            label: '导航按钮B',
          },
          {
            label: '导航按钮C',
          },
          {
            label: '导航按钮D',
          },
        ];
      },
    },
  },
  data() {
    return {
    };
  },
  components: {
  },
  computed: {},
  methods: {
    handleBtnClick(btn) {
      this.$emit('toggle-show');
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
    .el-button {
      flex-grow: 1;
    }
  }
}
</style>
