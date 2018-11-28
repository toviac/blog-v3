<template>
  <div class="hy-circle">
    <canvas class="background" ref="bgCanvas"></canvas>
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'HyCircle',
  props: {
    // 传进来的值,100为最大, 0最低
    value: {
      type: [Number, String],
      default: 90,
    },
    // 圆>半径<
    radius: {
      type: Number,
      default: 75,
    },
    // 是否加载
    loading: {
      type: Boolean,
      default: false,
    },
    // 中间文字
    content: {
      type: String,
      default: 'text',
    },
    // 加载时文字
    loadingContent: {
      type: String,
      default: '加载中',
    },
  },
  data() {
    return {
      // true: 逆时针, false: 顺时针
      flag: false,
      bgCanvas: null,
      bgContext: null,
      canvas: null,
      context: null,
      tmpAngle: -Math.PI / 2,
      loadingColor: '#F98700',
      COLOR_GRAY: '#E4E4E4',
      COLOR_GREEN: '#67C23A',
      COLOR_BASE: '#F98700',
    };
  },
  components: {
  },
  computed: {
    endAngle() {
      // 弧度
      const r = (-Math.PI / 2) + (Math.PI * 2 * (this.value / 100));
      if (r >= (3 / 2) * Math.PI) {
        return (3 / 2) * Math.PI;
      }
      return r;
    },
  },
  watch: {
    value() {
      this.init();
    },
    loading() {
      this.init();
    },
  },
  methods: {
    init() {
      const { $refs, radius, drawBgCanvas } = this;
      drawBgCanvas();
      this.canvas = $refs.canvas;
      this.context = this.canvas.getContext('2d');
      this.canvas.width = radius * 2;
      this.canvas.height = radius * 2;
      // 保存画布状态
      this.context.save();
      if (this.loading) {
        this.drawLoading();
      } else {
        this.draw();
      }
    },
    drawBgCanvas() {
      const {
        $refs, radius, loading, loadingContent, content, COLOR_GRAY, arc, text,
      } = this;
      this.bgCanvas = $refs.bgCanvas;
      this.bgContext = this.bgCanvas.getContext('2d');
      this.bgCanvas.width = radius * 2;
      this.bgCanvas.height = radius * 2;
      // 白色背景
      this.bgContext.fillStyle = '#FFFFFF';
      this.bgContext.arc(radius, radius, radius, 0, Math.PI * 2);
      this.bgContext.fill();
      // 基础圆环
      arc(this.bgContext, COLOR_GRAY, 0, 2 * Math.PI, 0);
      // 文本
      text(this.bgContext, loading ? loadingContent : content);
    },
    // 绘制
    draw() {
      const { radius, render } = this;
      // 重置画布
      this.context.restore();
      this.tmpAngle = -Math.PI / 2;
      this.$nextTick(() => {
        this.context.clearRect(0, 0, radius * 2, radius * 2);
        // 进度环
        render();
      });
    },
    // 加载中
    drawLoading() {
      const { renderLoading } = this;
      this.context.restore();
      this.tmpAngle = -Math.PI / 2;
      this.loadingColor = '#F98700';
      this.$nextTick(() => {
        // 进度环
        renderLoading();
      });
    },
    // 画圆 => 0:背景条, 1:进度
    arc(context, color, startAngle, endAngle, type, anticlockwise) {
      const { radius } = this;
      context.beginPath();
      context.lineWidth = type === 0 ? radius / 5 : radius / 10;
      // 线颜色
      context.strokeStyle = color;
      // 线端点样式 => butt: 基础, round: 半圆
      context.lineCap = 'butt';
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      context.arc(radius, radius, radius - 10, startAngle, endAngle, anticlockwise && true);
      context.stroke();
    },
    // 文字
    text(context, content) {
      const {
        radius, endAngle, loading, COLOR_GREEN, COLOR_BASE,
      } = this;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = 'bold 20px Regular';
      if (loading) {
        context.fillStyle = COLOR_BASE;
      } else {
        context.fillStyle = endAngle >= Math.PI * 1 / 2 ? COLOR_GREEN : COLOR_BASE;
      }
      // fillText(text, x, y [, maxWidth])
      context.fillText(content, radius, radius);
    },
    // 渲染进度条
    render() {
      if (this.loading) {
        return;
      }
      const {
        endAngle, radius, COLOR_GREEN, COLOR_BASE, arc,
      } = this;
      const stepAngle = Math.PI / 25;
      const startAngle = -Math.PI / 2;
      if (this.tmpAngle >= endAngle) {
        return;
      }
      this.context.clearRect(0, 0, radius * 2, radius * 2);
      this.tmpAngle += stepAngle;
      const color = endAngle >= Math.PI * 1 / 2 ? COLOR_GREEN : COLOR_BASE;
      arc(this.context, color, startAngle, this.tmpAngle, 1);

      requestAnimationFrame(this.render);
    },
    // loading 渲染
    renderLoading() {
      const { radius, arc, loadingColor } = this;
      this.context.clearRect(0, 0, radius * 2, radius * 2);
      if (!this.loading) {
        return;
      }
      const stepAngle = Math.PI / 25;
      const startAngle = -Math.PI / 2;
      this.tmpAngle += stepAngle;
      // 已绘制一整个圆
      if (this.tmpAngle > (-Math.PI / 2) + (Math.PI * 2)) {
        this.tmpAngle = (-Math.PI / 2) + (Math.PI / 1000);
        this.flag = !this.flag;
      }
      arc(this.context, loadingColor, startAngle, this.tmpAngle, 1, this.flag);
      requestAnimationFrame(this.renderLoading);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
};
</script>

<style lang="scss">
.hy-circle {
  position: relative;
  .canvas {
    position: absolute;
    left: 0;
  }
}
</style>
