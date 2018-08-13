<!-- 主要内容 -->
<template>
  <div class="content-wrapper">
    <md-editor></md-editor>
    <div v-html="markdownHTML"></div>
  </div>
</template>

<script>
import marked from '@/utils/marked';
import MdEditor from '@/components/MdEditor.vue';
// 引入md
import _20171121 from '@/sources/2017-11-21.md';

export default {
  name: 'ContentWrapper',
  data() {
    return {
      value: '',
    };
  },
  components: {
    MdEditor,
  },
  computed: {
    markdownHTML() {
      return marked(_20171121);
    },
  },
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
