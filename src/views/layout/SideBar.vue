<template>
  <el-card
    class="side-bar"
    :body-style="{ padding: '10px' }"
  >
    <img class="avatar" src="@/assets/img/Miku.gif" alt="">
    <div class="anchor-btn-group">
      <el-button
        plain
        v-for="btn in btnList"
        :key="btn.index"
        @click="handleBtnClick(btn)"
      >
        {{ btn.name }}
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
    btnList: {
      type: Array,
      default() {
        return [
          {
            name: '导航按钮A',
          },
          {
            name: '导航按钮B',
          },
          {
            name: '导航按钮C',
          },
          {
            name: '导航按钮D',
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
  max-width: 400px;
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
  }
  .el-button-group {
    display: flex;
    .el-button {
      flex-grow: 1;
    }
  }
}
</style>
