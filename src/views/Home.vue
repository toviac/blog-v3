<!-- index -->
<template>
  <div class="home">
    <nav-bar></nav-bar>
    <el-row :gutter="20">
      <!-- <el-col :span="6">
        <div>666</div>
      </el-col> -->
      <el-col :span="15">
        <div>666</div>
      </el-col>
      <el-col :span="5">
        <side-bar></side-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    NavBar,
    SideBar,
  },
  computed: {},
  mounted() {},
  methods: {},
};

</script>
<style lang='scss' scoped>
.home {
  height: 100%;
  width: 100%;
  .el-row {
    display: flex;
    justify-content: center;
    margin: 0 !important;
    padding-top: 10px;
  }
}
</style>
