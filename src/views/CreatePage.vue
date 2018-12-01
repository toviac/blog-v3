<!-- 创建文章页面 -->
<template>
  <div class="create-page">
    <mavon-editor v-model="value" codeStyle="atom-one-dark" @save="submit"></mavon-editor>
  </div>
</template>

<script>
import http from '@/common/http';

export default {
  data() {
    return {
      value: '',
    };
  },
  components: {},
  computed: {
    title() {
      // 获取标题正则
      const getTitleReg = /^#\s(.*)/g;
      return getTitleReg.exec(this.value)[1] || '';
    },
  },
  mounted() {},
  methods: {
    submit() {
      if (!this.value) {
        this.$message({
          message: '请输入文章内容',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      if (!this.title) {
        this.$message({
          message: '请输入文章标题',
          type: 'warning',
          showClose: true,
        });
        return;
      }
      const params = {
        title: this.title,
        author: 'admin',
        content: this.value,
      };
      http.post('/api/post', params)
        .then(data => {
          this.showMessage('创建成功!');
          this.value = '';
          this.$router.push(`/blog/${data.id}`);
        })
        .catch();
    },
    showMessage(msg, type = 'success') {
      if (!msg) return;
      this.$message({
        message: msg,
        type,
        showClose: true,
        duration: 1000,
      });
    },
  },
};

</script>
<style lang='scss'>
.create-page {
  position: relative;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  min-height: calc(100vh - 81px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  .markdown-body {
     position: absolute;
     top: 10px;
     left: 10px;
     bottom: 10px;
     right: 10px;
  }
}
</style>
