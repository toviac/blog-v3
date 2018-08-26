<!-- article list -->
<template>
  <div class="article-list-item">
    {{ item.title }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
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
.article-list-item {
  height: 150px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
