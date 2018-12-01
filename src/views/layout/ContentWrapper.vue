<!-- 主要内容 -->
<template>
  <div class="content-wrapper">
    <!-- <md-editor></md-editor> -->
    <div v-html="markdownHTML"></div>
  </div>
</template>

<script>
import marked from '@/utils/marked';
import MdEditor from '@/components/MdEditor.vue';
import http from '@/common/http';

export default {
  name: 'ContentWrapper',
  props: {
    mdTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      mdContent: '',
    };
  },
  components: {
    MdEditor,
  },
  computed: {
    markdownHTML() {
      return marked(this.mdContent);
    },
  },
  watch: {
    $route() {
      this.queryContent();
    },
  },
  mounted() {
    this.queryContent();
  },
  methods: {
    queryContent() {
      const url = '/api/post';
      const { postId } = this.$route.params;
      http.get(url, { id: postId })
        .then((data) => {
          this.mdContent = data.post.content;
          this.$nextTick(() => {
            this.$emit('articleReady');
          });
        })
        .catch();
    },
  },
};

</script>
<style lang='scss' scoped>
.content-wrapper {
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
