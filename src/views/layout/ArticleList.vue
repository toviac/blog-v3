<template>
  <div class="article-list">
    <div
      class="article-list-item"
      v-for="item in list"
      :key="item.index">
      <div class="title" @click="titleClick(item)">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>

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
    return {};
  },
  components: {
  },
  methods: {
    titleClick(item) {
      this.$emit('title-click', item);
    }
  },
  mounted() {},
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
    padding: 20px;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .title {
      color: #409EFF;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #66b1ff;
      }
    }
  }
}
</style>
