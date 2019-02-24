<!-- practice 页面 -->
<template>
  <div class="practice-index">
    <components :is="practiceComponentInstance"></components>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  components: {},
  watch: {},
  computed: {
    practiceComponentInstance() {
      return () => import(`./${this.initialCaptilization(this.$route.params.practiceName)}`);
    },
  },
  created() {},
  mounted() {},
  methods: {
    initialCaptilization(str) {
      if (typeof str !== 'string') return str;
      const strArr = str.split('');
      strArr[0] = strArr[0].toUpperCase();
      return strArr.join('');
    },
  },
};

</script>
<style lang="scss">
.practice-index {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  min-height: calc(100vh - 81px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  // 代码样式
  code {
    font-family: 'Consolas';
  }
}
</style>
