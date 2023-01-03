// TODO：✅==========================================================
// 144.前序遍历二叉树

var no144_preorderTraversal = function(root) {
  let res = []
  function output(root, res) {
    if(!root) return []
    res.push(root.val)
    output(root.left, res)
    output(root.right, res)
    return res
  }

  output(root, res)
  return res
};

// TODO：✅==========================================================
// 后序遍历二叉树

var no145_postorderTraversal = function(root) {
  let res = []
  function deep(root) {
    if(!root) return []
    deep(root.left)
    deep(root.right)
    res.push(root.val)
  }

  deep(root)
  return res
};

// TODO：✅==========================================================
// 后序
// 104. 二叉树最大深度
var maxDepth = function(root) {
  if(!root) {
    return 0;
  } else {
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    return Math.max(left, right) + 1;
  }
};

// TODO：✅==========================================================
// 108. 将有序数组转换为二叉搜索树

var no108_sortedArrayToBST = function(nums) {
  function dfs( left, right) {
    if(left > right) return null
    let mid = (right + left) >>> 1; // 相当于除以2
    let root = new TreeNode(nums[mid]) 
    root.left = dfs(left, mid - 1)
    root.right = dfs(mid + 1, right)

    return root;
  }

  return dfs(0, nums.length - 1)
};

// TODO：✅==========================================================
// 后序
// 110. 平衡二叉树 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
var no110_isBalanced = function(root) {
  
  function dfs(root) {
    if(!root) return 0;
    let left = dfs(root.left)
    if(left === -1) return -1
    let right = dfs(root.right)
    if(right === -1) return -1

    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
  }
  

  return dfs(root) !== -1
};

// TODO：❗️==========================================================
// 113. 路径总和 II
// 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
// 差回溯这一步就做出来了

var no113_pathSum = function(root, targetSum) {
  let res = []

  function dfs(root, curPath, sum) {
    if(!root.left && !root.right ){
      sum === targetSum &&res.push([...curPath])
      return
    }
    if (root.left) {
      curPath.push(root.left.val)
      dfs(root.left, curPath, sum+root.left.val)
      curPath.pop()
    }

    if (root.right) {
      curPath.push(root.right.val)
      dfs(root.right, curPath, sum+root.right.val)
      curPath.pop()
    }
  }
  if(!root) return res;
  dfs(root, [root.val], root.val)

  return res
};

// TODO：✅==========================================================
// 114. 二叉树展开为链表

var no114_flatten = function(root) {
  const helper = (root) => {       // 将当前子树转成一个单链表
    if (root == null) return null; // 遍历到null节点 返回null节点
    if (root.right) {              // 先生成右子树的单链表
      helper(root.right);
    }
    if (root.left) {               // 如果有左子树，生成单链表然后搬运过去
      const leftFirst = helper(root.left); // 生成单链表，并获取头结点
      let leftLast = leftFirst;    // leftEnd是单链表的尾节点
      while (leftLast.right) {     // 一直找右节点，获取到单链表的尾节点
        leftLast = leftLast.right;
      }
      leftLast.right = root.right; // 尾节点后面接左子树展平后的单链表
      root.right = leftFirst;      // 根节点的right改成leftFirst
      root.left = null;            // root.left置为null
    }
    return root; // 返回出当前子树转成的单链表
  };
  helper(root);  // 原地修改，不用返回
};

// TODO：✅==========================================================
// 后序
// 124. 二叉树中的最大路径和

var no124_maxPathSum = function(root) {
  let maxSum =  Number.MIN_SAFE_INTEGER;
  
  function dfs(root) {
    if(!root) return 0
    const left = dfs(root.left)
    const right = dfs(root.right)
    maxSum = Math.max(maxSum, left + right + root.val)
    let rootSum = Math.max(left, right) + root.val
    return rootSum > 0 ? rootSum : 0
  }

  dfs(root)
  return maxSum
};

// TODO：✅==========================================================
// 后序
// 543. 二叉树的直径
var diameterOfBinaryTree = function(root) {
  let self_max = 0;
  if(root == null || (root.left == null && root.right == null)) return 0
  function dfs(root) {
      if(root == null) return 0
      const left = dfs(root.left)
      const right = dfs(root.right)
      self_max = Math.max(self_max, (left + right + 1));
      return Math.max(left, right) + 1;
  }
  dfs(root)
  return self_max -1 ;
};

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


// TODO：✅==========================================================
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

// TODO：✅==========================================================
// 107. 二叉树的层序遍历 II
// 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。
// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[15,7],[9,20],[3]]

var no107_levelOrderBottom = function(root) {
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
  return res.reverse();
};

// TODO：✅==========================================================
// 105. 从前序与中序遍历序列构造二叉树
// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// 输出: [3,9,20,null,null,15,7]

var buildTree = function(preorder, inorder) {

};