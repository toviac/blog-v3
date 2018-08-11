<!-- 主要内容 -->
<template>
  <div class="content-wrapper">
    <h-code>
      function() {
        console.log('hellow world');
      }
    </h-code>
  </div>
</template>

<script>
export default {
  name: 'ContentWrapper',
  data() {
    return {
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {},
};

</script>
<style lang='scss' scoped>
.content-wrapper {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  // min-height: calc(100vh - 81px);
  min-height: 3000px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
