<template>
  <div class="article-list">
    <div
      class="article-list-item"
      v-for="item in list"
      :key="item.index">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import http from '@/common/http';

export default {
  name: 'ArticleList',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data () {
    return {
      fileList: [],
    };
  },
  components: {
  },
  methods: {
    // 获取服务器文章md列表
    getList() {
      const url = '/filelist';
      http.get(url, {})
        .then((data) => {
          this.fileList = data.list.map(file => ({ title: file }));
        })
        .catch();
    },
  },
  mounted() {
    // this.getList();
  }
};
</script>

<style lang="scss">
.article-list {
  width: 100%;
  padding: 0 10px 10px 10px;
  margin-top: -10px;
  margin-bottom: 10px;
  min-height: calc(100vh - 81px);
  .article-list-item {
    height: 150px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
}
</style>
