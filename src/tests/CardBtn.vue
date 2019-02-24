<!-- card-btn -->
<template>
  <div class="card-btn">
    <div class="btn-list">
      <el-card class="card" v-for="item in cardList" :key="item.name">
        {{ item.name }}
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardList: [
        { name: 'first' },
        { name: 'second' },
        { name: 'third' },
        { name: 'fourth' },
        { name: 'fifth' },
      ],
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {},
};

</script>
<style lang="scss">
.card-btn {
  padding: 10px;
  background-color: #ccc;
  width: 1000px;
  height: 1000px;
  .card {
    cursor: pointer;
    width: 200px;
    height: 124px;
  }
}
</style>
