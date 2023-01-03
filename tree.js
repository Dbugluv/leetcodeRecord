// TODO：❗️==========================================================
// 96. 不同的二叉搜索树
// 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。

var no96_numTrees = function(n) {
  let dp = new Array(n+1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for(let i = 2; i <= n; i++) {
      for(let j = 1; j <= i; j++) {
          dp[i] += dp[j-1] * dp[i-j];
      }
  }

  return dp[n];
};
// console.log('no96_numTrees', no96_numTrees(2))

// TODO：❗️抄得不明不白==========================================================
// 97. 不同的二叉搜索树 打印

const no97_generateTrees = (n) => {
  if (n == 0) return [];
  const getAllBSTs = (low, high) => {
    if (low > high) return [null];
    if (low == high) return [new TreeNode(low)]; // 优化处
    const res = [];
    for (let i = low; i <= high; i++) {
      const leftBSTs = getAllBSTs(low, i - 1);
      const rightBSTs = getAllBSTs(i + 1, high);
      for (const leftBST of leftBSTs) {
        for (const rightBST of rightBSTs) {
          const root = new TreeNode(i);
          root.left = leftBST;
          root.right = rightBST;
          res.push(root);
        }
      }
    }
    return res;
  };
  return getAllBSTs(1, n);
};

// console.log('no97_generateTrees', no97_generateTrees(3))

// TODO：❗️==========================================================
// 99. 恢复二叉搜索树
// 给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。
// 输入：root = [1,3,null,null,2]
// 输出：[3,1,null,null,2]

var no99_recoverTree = function(root) {
  let perv = new TreeNode(-Infinity);
  let err1, err2 = null;

  const inOrder = (root) => {
      if (root == null) {
          return;
      }
      inOrder(root.left);

      if (perv.val >= root.val && err1 == null) { // 当前是第一对错误
          err1 = perv;                            // 记录第一个错误点
      }
      if (perv.val >= root.val && err1 != null) { // 第一个错误点已确定
          err2 = root;                            // 记录第二个错误点
      }
      perv = root;       // 更新 perv
      // perv: 1 3 2 4
      inOrder(root.right);
  };

  inOrder(root);
  const temp = err1.val;
  err1.val = err2.val;
  err2.val = temp;
};

// console.log('no99_recoverTree', no99_recoverTree([3,1,4,null,null,2]))

function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }

// TODO：❗️==========================================================
//  98. 验证二叉搜索树
//  输入：root = [5,1,4,null,null,3,6]
//  输出：false

var no98_isValidBST = function(root) {
  let pre = null;
  function deep(root) {
    if(!root) return true
    let left = deep(root.left)
    if(!pre && root.val < pre) {
      return false
    }
    pre = root.val

    let right = deep(root.right)
    return left && right
  }
  deep(root)
};

let no98params = TreeNode([5,1,4,null,null,3,6])
// console.log('no98_isValidBST', no98_isValidBST(no98params))

// TODO：✅==========================================================
var no100_isSameTree = function(p, q) {
  if(p == null && q == null) 
    return true;
  if(p == null || q == null) 
    return false;
  if(p.val != q.val) 
    return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

let p = new TreeNode([1,1,2])
let q = new TreeNode([1,1,2])
// console.log('[1,2,1]no100_isSameTree', no100_isSameTree(p,q))

// TODO：==========================================================
// 102. 二叉树的层序遍历
var no102_zigzagLevelOrder = function(root) {
  let res=[],queue=[];
  queue.push(root);
  if(root===null){
      return res;
  }
  while(queue.length!==0){
      // 记录当前层级节点数
      let length=queue.length;
      //存放每一层的节点 
      let curLevel=[];
      for(let i=0;i<length;i++){
          let node=queue.shift();
          curLevel.push(node.val);
          // 存放当前层下一层的节点
          node.left&&queue.push(node.left);
          node.right&&queue.push(node.right);
      }
      //把每一层的结果放到结果数组
      res.push(curLevel);
  }
  return res;
};


// TODO：==========================================================
// 103. 二叉树的锯齿形层序遍历
// 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[20,9],[15,7]]

var no103_zigzagLevelOrder = function(root) {
  let res=[],queue=[];
  queue.push(root);
  let fromLeft = true
  if(root===null){
      return res;
  }
  while(queue.length!==0){
      // 记录当前层级节点数
      let length=queue.length;
      //存放每一层的节点 
      let curLevel=[];
      for(let i=0;i<length;i++){
          let node=queue.shift();
          curLevel.push(node.val);
          // 存放当前层下一层的节点
          node.left&&queue.push(node.left);
          node.right&&queue.push(node.right);
      }
      //把每一层的结果放到结果数组
      res.push(fromLeft ? curLevel : curLevel.reverse());
      fromLeft = !fromLeft
  }
  return res;
};

// console.log('no103_zigzagLevelOrder', no103_zigzagLevelOrder([3,9,20,null,null,15,7]))