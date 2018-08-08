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
  methods: {
    handleBtnClick(btn) {
      console.log('btnClick: ', btn);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.side-bar {
  width: 100%;
  max-width: 400px;
  .avatar {
    max-width: 100%;
  }
  .anchor-btn-group {
    .el-button {
      width: 100%;
      margin-top: 5px;
      & + .el-button {
        margin-left: 0;
      }
    }
  }
}
</style>
