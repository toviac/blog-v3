<!-- 主要内容 -->
<template>
  <div class="content-wrapper" v-html="value">
    <!-- <md-editor @change="change"></md-editor> -->
  </div>
</template>

<script>
// import marked from '@/utils/marked';
import MdEditor from '@/components/MdEditor.vue';
import { mavonEditor } from 'mavon-editor';

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
  computed: {},
  mounted() {
    this.renderMarkdown(_20171121);
  },
  methods: {
    change(render) {
      this.value = render;
    },
    renderMarkdown(md) {
      mavonEditor.mixins[0].methods.codeStyleChange('atom-one-dark', true);
      mavonEditor.mixins[0].methods.$render(md, (res) => this.value = res);
    },
  },
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
