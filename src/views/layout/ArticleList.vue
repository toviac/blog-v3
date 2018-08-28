<template>
  <div class="article-list">
    <article-list-item
      v-for="item in fileList"
      :key="item.index"
      :item="item">
    </article-list-item>
  </div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem.vue';
import http from '@/common/http';

export default {
  name: 'ArticleList',
  data () {
    return {
      fileList: [],
    };
  },
  components: {
    ArticleListItem,
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
    this.getList();
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
}
</style>
