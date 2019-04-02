<!-- 主要内容 -->
<template>
  <div class="content-wrapper">
    <!-- <md-editor></md-editor> -->
    <div v-html="markdownHTML"></div>
    <el-dialog
      :visible.sync="showImgPreview"
      top="0"
      width="80%">
      <img :src="imgSrc" alt="">
    </el-dialog>
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
      imgSrc: '',
      showImgPreview: false,
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
  beforeDestroy() {
    const imgGroup = document.querySelectorAll('.content-wrapper img');
    imgGroup.forEach(img => {
      img.removeEventListener('click', this.imgPreview);
    });
  },
  methods: {
    queryContent() {
      const url = '/api/post';
      const { postId } = this.$route.params;
      http.get(url, { id: postId })
        .then((data) => {
          this.mdContent = data.post.content;
          this.$nextTick(() => {
            this.handleImgClick();
            this.$emit('articleReady');
          });
        })
        .catch();
    },
    // 获取图片点击事件
    handleImgClick() {
      const imgGroup = document.querySelectorAll('.content-wrapper img');
      imgGroup.forEach(img => {
        img.addEventListener('click', this.imgPreview);
      });
    },
    imgPreview(e) {
      this.imgSrc = e.target.src.replace('https://www.doco.dev', '');
      if (this.imgSrc) {
        this.showImgPreview = true;
      }
    },
  },
};

</script>
<style lang='scss'>
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
  img,
  video {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
  table {
    display: block;
    width: 100%;
    margin-top: 0;
    margin-bottom: 16px;
    overflow: auto;
    border-spacing: 0;
    border-collapse: collapse;
    th {
      font-weight: 600;
    }

    th,
    td {
      padding: 6px 13px;
      border: 1px solid #dfe2e5;
    }

    tr {
      background-color: #fff;
      border-top: 1px solid #c6cbd1;
    }

    tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
  }

  .el-dialog__wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-dialog {
      display: flex;
      flex-direction: column;
      margin: 0;
      height: 90%;
      .el-dialog__body {
        flex-grow: 1;
        // 解决子元素溢出
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
