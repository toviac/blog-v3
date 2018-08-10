<template>
  <div class="home">
    <home-cover :ifShow.sync="showCover"></home-cover>
    <el-collapse-transition>
      <main-container v-show="!showCover" @toggle-show="showCover = true"></main-container>
    </el-collapse-transition>
  </div>
</template>

<script>
import HomeCover from '@/components/HomeCover.vue';
import MainContainer from './MainContainer.vue';

export default {
  name: '',
  data() {
    return {
      showCover: true,
    };
  },
  components: {
    HomeCover,
    MainContainer,
  },
  methods: {
  },
  watch: {},
  mounted() {
  },
};
</script>

<style lang="scss">
</style>
