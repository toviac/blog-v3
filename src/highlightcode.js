// 封装highlight.js
// import Vue from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// export default Highlight;
export default {
  name: 'HighlightCode',
  props: {
    lang: {
      type: String,
      default: 'javascript',
    },
  },
  data() {
    return {
      codeStyle: {
        'border-radius': '4px',
        'font-family': 'Consolas',
      },
    };
  },
  render(createElement) {
    // typeof second param of hljs.highlight() must be string
    const highlightCode = hljs.highlight(this.lang, this.getSlotText(this.$slots.default)).value;
    return createElement(
      'pre',
      {
        class: [
          'hljs',
          this.lang,
        ],
        style: this.codeStyle,
        domProps: {
          innerHTML: highlightCode,
        },
      },
    );
  },
  methods: {
    getSlotText(slot) {
      if (Array.isArray(slot)) {
        return slot.map((node) => {
          if (Array.isArray(node.children) && (node.children.length > 0)) {
            return this.getSlotText(node.children);
          }
          return node.text;
        }).join('');
      }
      return '';
    },
  },
  mounted() {},
};
