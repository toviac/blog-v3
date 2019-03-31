# Canvas绘制树形图
### 一. 思路  
1. 获取树的层数
2. 将数据扩展成完全树
3. 拆分为左右两棵树
4. 分配每层的位置
5. 由两棵树的叶子节点开始分配位置并逐层编辑父节点的位置
6. 绘制全部节点
7. 绘制节点间连接线
8. 实现切换功能
### 二.具体实现
首先我们要获取整棵树的深度, 方便下一步把所有分支扩展到同一深度. 处理树的时候会多次用到递归, 因此我们将其抽出做成一个单独的函数:
```
mapTree(fun) {
  // 可以自定义子节点的key值
  const { childKey } = this;
  const map = tree => {
    tree.forEach(child => {
      fun(child, tree);
      if (child[childKey]) {
        map(child[childKey]);
      }
    });
  };
  map(this.tree);
}
```  
然后递归获取整棵树的深度, 从根节点向下查询子节点, 如果子节点存在则继续向下查询, 同时把当前的深度记录在节点上, 使节点的格式变为:
```
node: {
  name: '',
  layer: '',
  child: []
}
```
![扩充树](https://www.doco.dev/upload/树1.png)
获取到树的深度之后便开始扩展整棵树, 从根节点开始遍历, 如果当前节点的层数小于总层数, 且没有子节点, 则用空数据来填充子节点, 直到当前节点的层数等于树的深度.  
将所有分支扩展到最大深度后, 便可以将整棵树分成左右两部分. 定义两个数组:leftNameList和rightNameList, 分别保存左部分和右部分的根节点, 依据这两个数组来拆分出来左右两棵树. 将左/右每层的节点分别存入两个数组中leftTree和rightTree, 依据数组的index位置来区分层数.
```
leftTree: [
  // 0层
  ['根节点'],
  // 1层
  ['权限A', '权限B'],
  // 2层
  ['权限a', '权限b'],
  // 3层
  ['a子权限', 'b子权限']
]
```
![切割树](https://www.doco.dev/upload/树2.png)
下一步就可以开始为每个节点分配位置了.先从左右每棵树的叶子节点开始, 平均分配到canvas的最左/最右列上, 然后从叶子节点开始遍历树, 为每个节点分配位置: 是叶子节点则平均分配y轴, 否则根据子节点的第一个和最后一个节点的位置来确定当前节点位置.
```
// 设置节点位置, 在确定列位置之后执行
// node: 节点, index: 节点位置
const setPosition = (node, index) => {
  // (总显示区域 - 边框) / ((深度 + 1 ) * 2 + 中间列 + 1)
  // columnPosition: 每一列的中线位置
  let positionX = this.columnPositionArr[index];
  let positionY = 0;
  if (node.layer === depth) {
    // 是最后一级, 叶子节点
    positionY = height / (node.total + 1) * (node.index + 1);
  } else {
    const sub = node[childKey];
    // 第一个子节点的y + 最后一个子节点的y / 2
    positionY = (sub[sub.length - 1].position.y + sub[0].position.y) / 2;
  }
  let position = {};
  position.x = positionX;
  position.y = positionY;
  node.position = position;
};
```
这一步执行之后节点变为
```
node: {
  name: '',
  layer: '',
  child: [],
  pisition: {
    x: '',
    y: ''
  }
}
```
接下来就是渲染节点了. 先清空canvas, 然后遍历树, 渲染每一个节点. 这里主要是文字的绘制, canvas绘制文字有两个属性: textAlign和textBaseline, 对应的效果如下图. 这里我们设置
```
ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
```
这样可以实现以每个节点的位置为中心来绘制.  
通过canvas的measureText方法可以获取每个节点的文字宽度, 这里我们在文字宽度的两边各添加3像素, 作为节点的总宽度, 保存到节点的width字段: 
```
const format = node => {
  // 设置节点宽度
  let textBlockWidth = Math.ceil(ctx.measureText(node.name).width + 6);
  if (node.layer === 0) {
    // 最中间的节点大一点
    node.width = textBlockWidth + 10;
  } else {
    node.width = textBlockWidth;
  }
};
```
渲染节点的同时在两个节点之间画连接线, 连接线的绘制需要起点, 终点以及拐点的x值. 拐点的计算分为左右两边, 为前一列最大宽度的节点与后一列最大宽度节点靠近的一边的x值之差
```
// 子节点最大宽度
const maxSubWidth = Math.max(...subWidthArr);
// 起点, 终点, 拐点x坐标
// drawLine(from, to, inflectionX)
// 左侧树
drawLine(
  { name: node.name, x: node.position.x - node.width / 2, y: node.position.y },
  { name: sub.name, x: sub.position.x + sub.width / 2, y: sub.position.y },
  (sub.position.x + maxSubWidth / 2 + node.position.x - node.width / 2) / 2
);
```
对于切换角色的功能, 最开始采用的是每次切换角色都重新绘制整个canvas, 优化后改为每次切换角色都遍历一次权限树, 只重新绘制新角色权限和就角色权限不同的节点, 可以提高效率.
```
// 查找新角色权限与旧角色权限不同的节点并重新绘制
changeRole(role, oldRole) {
  const { ctx, depth, fontSize } = this;
  const renderNode = node => {
    // isPlatform, isOperator, isShop
    ctx.clearRect(node.position.x - node.width / 2, node.position.y - fontSize / 2 - 3 - 1, node.width, fontSize + 3 + 3);
    if (node.layer === 0) {
      ctx.strokeStyle = '#000000';
      // ctx.strokeRect(起点x, 起点y, 宽度, 高度)
      ctx.strokeRect(node.position.x - node.width / 2, node.position.y - fontSize / 2 - 3 - 1, node.width, fontSize + 3 + 3);
    }
    if (node[`is${this.toCapitalize(role)}`]) {
      ctx.fillStyle = '#f98700';
    } else {
      ctx.fillStyle = '#000000';
    }
    ctx.fillText(node.name || '', node.position.x, node.position.y);
    ctx.fillStyle = '#000000';
  };
  // 从叶节点开始遍历树
  for (let i = depth; i > -1; i--) {
    this.leftTree[i].forEach(node => {
      if ((node[`is${this.toCapitalize(role)}`] !== node[`is${this.toCapitalize(oldRole)}`])) {
        renderNode(node);
      }
    });
    this.rightTree[i].forEach(node => {
      if ((node[`is${this.toCapitalize(role)}`] !== node[`is${this.toCapitalize(oldRole)}`])) {
        renderNode(node);
      }
    });
  }
}
```