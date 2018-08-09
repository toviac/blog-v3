<template>
  <div class="home">
    <home-cover></home-cover>
    <el-collapse-transition>
      <main-container v-show="showContainer"></main-container>
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
      showContainer: true,
    };
  },
  components: {
    HomeCover,
    MainContainer,
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style lang="scss">
</style>
