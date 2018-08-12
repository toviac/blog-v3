<!-- mavon-editor封装的markdown编辑器 -->
<template>
  <mavon-editor
    :value="value"
    :style="editorStyle"
    :codeStyle="codeStyle"
    @change="handleChange"></mavon-editor>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 编辑器样式
      editorStyle: {
        'min-height': '500px',
      },
      // 代码样式
      codeStyle: 'atom-one-dark',
    };
  },
  watch: {},
  components: {},
  computed: {},
  mounted() {},
  methods: {
    handleChange(value, render) {
      // value为markdown内容, render为渲染后html
      console.log('value: ', value);
      console.log('render: ', render);
      this.$emit('input', value);
      this.$emit('change', render);
    },
  },
};

</script>
<style lang='scss' scoped>
</style>
