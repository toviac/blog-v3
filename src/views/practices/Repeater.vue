<!-- 人类的本质是复读机 -->
<template>
  <div class="repeater">
    <h1>人类的本质是复读机</h1>
    <div class="repeater-body">
      <el-form @submit.native.prevent="submit">
        <el-form-item label="输入: ">
          <el-input placeholder="请输入消息" v-model="sendMsg">
            <el-button slot="append" @click="submit">发送</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="logs">
        聊天记录:
        <div v-for="(item, index) in sendList" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendMsg: '',
      sendList: [],
    };
  },
  components: {},
  sockets: {
    connect() {
      console.log('----- socket connected -----');
    },
    // this method was fired by the socket server. eg: io.emit("res", data)
    res(data) {
      console.log('server fired method >res<, data: ', data);
    },
    online(socket) {
      console.log('welcome to room: ', socket.id);
    },
    reply(msg) {
      console.log('reply: ', msg);
    },
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    submit() {
      const { sendMsg } = this;
      if (!sendMsg) {
        this.$message.warning('请输入内容');
        return;
      }
      this.$socket.emit('message', this.sendMsg);
      console.log('form submit');
      this.sendList.push(this.sendMsg);
      this.sendMsg = '';
    },
  },
};

</script>
<style lang="scss">
.repeater {
  .el-input-group__append {
    .el-button {
      &:hover {
        border-color: transparent;
        color: inherit;
      }
    }
  }
}
</style>
