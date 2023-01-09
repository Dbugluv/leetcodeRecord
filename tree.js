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
// 二分
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
var no543_diameterOfBinaryTree = function(root) {
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

// TODO：✅==========================================================
// HINT：传统递归理论可以，但是题目要求原地改动，所有采用分解问题
// 114. 二叉树展开为链表
// 遍历法
var no114_flatten = function(root) {
  const helper = (root) => {       // 将当前子树转成一个单链表
    if (root == null) return null; // 遍历到null节点 返回null节点
    if (root.right) {              // 先生成右子树的单链表
      helper(root.right);
    }
    if (root.left) {               // 如果有左子树，生成单链表然后搬运过去
      const leftFirst = helper(root.left); // 生成单链表，并获取头结点
      let leftLast = leftFirst;    // leftLast是单链表的尾节点
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

function no114_flatten_dfs(root) {
    if(!root) return null

    no114_flatten_dfs(root.left)
    no114_flatten_dfs(root.right)

    let left = root.left
    let right = root.right

    root.left = null
    root.right = left

    while(root.right) {
      root = root.right
    }
    root.right = right;
}


// TODO：❗️看了题解==========================================================
// 116. 填充每个节点的下一个右侧节点指针
// 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
// 输入：root = [1,2,3,4,5,6,7]
// 输出：[1,#,2,3,#,4,5,6,7,#]

// HINT：递归，一棵二叉树被抽象成了一棵三叉树，三叉树上的每个节点就是原先二叉树的两个相邻节点。

var no116_connect = function(root) {
  if(!root) return []
  function dfs(node1, node2) {
    if(!node1 || !node2) return null
    node1.next = node2

    dfs(node1.left, node1.right)
    dfs(node1.right, node2.left)
    dfs(node2.left, node2.right)
  }
  dfs(root.left, root.right);
  return root;
};

//226.翻转二叉树
var no226_invertTree = function(root) {
  function dfs(root) {
      if(!root) return null;
      let temp = root.right
      root.right = root.left;
      root.left = temp;
      dfs(root.left)
      dfs(root.right)
      return root
  }
  dfs(root);

  return root
};
// function dfs( left, right) {
//   if(left > right) return null
//   let mid = (right + left) >>> 1; // 相当于除以2
//   let root = new TreeNode(nums[mid]) 
//   root.left = dfs(left, mid - 1)
//   root.right = dfs(mid + 1, right)

//   return root;
// }

// return dfs(0, nums.length - 1)

// TODO：✅==========================================================
// 我日：我自己做出来了 优化完：执行用时：94.34%，内存94.70%
//654. 最大二叉树 [3,2,1,6,0,5]
// 创建一个根节点，其值为 nums 中的最大值。递归地在最大值 左边 的 子数组前缀上 构建左子树。
// 递归地在最大值 右边 的 子数组后缀上 构建右子树。

function no654_constructMaximumBinaryTree(nums) {
  function dfs(nums) {
    if(nums.length === 0) return null
    let maxNum = Number.MIN_SAFE_INTEGER
    let maxIndex = 0
    for (let i = 0; i <= nums.length; i++) {
      if (maxNum < nums[i]) {
          maxIndex = i;
          maxNum = nums[i];
      }
    }
    let root = new TreeNode(nums[maxIndex])
    root.left = dfs(nums.slice(0, maxIndex))
    root.right = dfs(nums.slice(maxIndex+1))
    return root
  }

  return dfs(nums)
}

// TODO：✅==========================================================
// 105. 从前序与中序遍历序列构造二叉树

function no105_buildTree(preorder, inorder) {
  function dfs (preorder, inorder) {
    if(!inorder.length) return null
    let rootVal = preorder[0]
    const root = new TreeNode(rootVal)
    let inRootIndex = inorder.indexOf(rootVal)
    root.left = dfs(preorder.slice(1, inRootIndex+1), inorder.slice(0, inRootIndex))
    root.right = dfs(preorder.slice(inRootIndex+1), inorder.slice(inRootIndex+1))
    return root
  }

  return dfs(preorder, inorder)
};

// 106. 从后序与中序遍历序列构造二叉树
// 注意画图
var no106_buildTree = function(inorder, postorder) {
  function dfs (inS, inE, postS, postE) {
    if(inS > inE) return null
    let rootVal = postorder[postE]
    let mid = inorder.indexOf(rootVal)
    const root = new TreeNode(rootVal)
    let leftSize = mid - inS
    root.left = dfs(inS, mid - 1, postS, postS + leftSize - 1)
    root.right = dfs(mid + 1, inE, postS + leftSize, postE - 1)

    return root
  }

  return dfs(0, inorder.length - 1, 0, postorder.length - 1)
};

// TODO：❗️==========================================================
// 297. 二叉树的序列化与反序列化
var no297_serialize = function(root) {  // 前序：根左右
  let res = []
  function dfs(root) {
    if(!root) {
      res.push('#')
      return null
    }
    res.push(root.val)
    dfs(root.left)
    dfs(root.right)
  }

  dfs(root)
  return res.join(',')
};

var no297_serialize2 = function(root) {
  if (root == null) {                  // 遍历到 null 节点
    return '#';
  }
  const left = serialize(root.left);   // 左子树的序列化结果
  const right = serialize(root.right); // 右子树的序列化结果
  return root.val + ',' + left + ','+ right; // 按  根,左,右  拼接字符串
}

const no297_deserialize = (data) => {
  const list = data.split(',');   // split成数组

  const buildTree = (list) => {   // 基于list构建当前子树
    const rootVal = list.shift(); // 弹出首项，获取它的“数据”
    if (rootVal == "#") {         // 是X，返回null节点
      return null;
    }
    const root = new TreeNode(rootVal); // 不是X，则创建节点
    root.left = buildTree(list);        // 递归构建左子树
    root.right = buildTree(list);       // 递归构建右子树
    return root;                        // 返回当前构建好的root
  };

  return buildTree(list); // 构建的入口
};

// TODO：❗️==========================================================
// 652. 寻找重复的子树
function no652_findDuplicateSubtrees(root) {
  let memo = new Map()
  let res = []
  traverse(root)

  function traverse(root) {
    if(root == null) {
        return '#'
    }
    let leftValue = traverse(root.left)
    let rightValue = traverse(root.right)
    let subTree = leftValue + ',' + rightValue + ',' + root.val
    let freq = memo.get(subTree) || 0
    if(freq == 1) {
        res.push(root)
    }
    memo.set(subTree, freq + 1)
    return subTree
}
  return res
} 

//++++++++++++++++++++++++二叉搜索树BST+++++++++++++++++++++++++++++++
// TODO：✅==========================================================
// 230. 二叉搜索树中第K小的元素
// 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。

// 超低效，因为遍历无法中途断开
var no230_kthSmallest = function(root, k) {
  let res
  function dfs(root) {
    if(!root) return null
    dfs(root.left)
    k--
    if(k == 0) {
    res = root.val
    }
    dfs(root.right)
  }

  dfs(root)

  return res
};

// TODO：✅==========================================================
// 538. 把二叉搜索树转换为累加树
var no538_convertBST = function(root) {
  let sum = 0;

  function dfs(root) {
    if(!root) return null
    dfs(root.right)
    sum+=root.val
    root.val = sum
    dfs(root.left)
    return root
  }

  return dfs(root)
};

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

/*
boolean no98_isValidBST(TreeNode root) {
  return isValidBST(root, null, null);
}

//  限定以 root 为根的子树节点必须满足 max.val > root.val > min.val
/* boolean isValidBST(TreeNode root, TreeNode min, TreeNode max) {
  // base case
  if (root == null) return true;
  // 若 root.val 不符合 max 和 min 的限制，说明不是合法 BST
  if (min != null && root.val <= min.val) return false;
  if (max != null && root.val >= max.val) return false;
  // 限定左子树的最大值是 root.val，右子树的最小值是 root.val
  return isValidBST(root.left, min, root) 
      && isValidBST(root.right, root, max);
} */

// 700. 二叉搜索树中的搜索
var no700_searchBST = function(root, val) {
  if (!root || root.val === val) {
    return root;
  }
  if (root.val > val)
    return searchBST(root.left, val);
  if (root.val < val)
    return searchBST(root.right, val);
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

/* 主函数 */
function no96_numTrees2(n) {  // 存在重叠子问题，可以用备忘录记录（    memo = [n + 1][n + 1]; ）
  function count(lo, hi) {
    // base case
    if (lo > hi) return 1;
    // 查备忘录
    if (memo[lo][hi] != 0) {
      return memo[lo][hi];
    }

    let res = 0;
    for (let i = lo; i <= hi; i++) {
        // i 的值作为根节点 root
        let left = count(lo, i - 1);
        let right = count(i + 1, hi);
        // 左右子树的组合数乘积是 BST 的总数
        res += left * right;
    }

    // 将结果存入备忘录
    memo[lo][hi] = res;
  
    return res;
  }

  return count(1, n);
}


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

// TODO：✅==========================================================
//235. 二叉搜索树的最近公共祖先 

// 祖先框架
var no235_lowestCommonAncestor = function(root, p, q) {
  function dfs(root) {
      if(!root) return null
      if(root === p || root === q) return root  // 这里去判断是否包含所需元素

      let left = dfs(root.left)
      let right = dfs(root.right)

      if(left && right) return root

      return left ? left : right
  }

  return dfs(root)
};

const  no235_lowestCommonAncestor2 = (root, p, q) => {
  if (p.val < root.val && q.val < root.val) {
      return lowestCommonAncestor(root.left, p, q);
  }
  if (p.val > root.val && q.val > root.val) {
      return lowestCommonAncestor(root.right, p, q);
  }
  return root;
};



/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// TODO：✅==========================================================
// 1644.查找公共祖先 但是p、q不一定在树中。
// 所以根据之前p、q在子树中，由前序的判断找到一个就返回，改成到后序（必须都遍历完）再返回

var no1644_lowestCommonAncestor = function(root, p, q) {
  let existP = false
  let existQ = false
  let res =  dfs(root)
  
  if(!existP || !existQ) {
      return null
  }

  function dfs(root) {
      if(!root) return null

      let left = dfs(root.left)
      let right = dfs(root.right)

      if(left && right) return root
      if(root === p || root === q) {
          root === p && (existP = true)
          root === q && (existQ = true)
          return root
      }

      return left ? left : right
  }
  return res
};

// TODO：✅==========================================================
// 1644.查找公共祖先 每个节点都包含其父节点的引用（指针）。
var no1650_lowestCommonAncestor = function(p, q) {
  let a = p;
  let b = q;
  while(a!=b) {
    if(!a) a = q;         // a 走一步，如果走到根节点，转到 q 节点
    else a = a.parent;
    if(!b) b = p
    else b = b.parent;
  }
  return a
};

// TODO：✅==========================================================
// 222. 完全二叉树的节点个数
// 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

var no222_countNodes = function(root) {

};


// TODO：✅==========================================================
// 100.是否是相同的树
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


// TODO：❗️==========================================================
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


var no102_levelOrder = function(root) {
  const res = [];
  if(!root) return [];
  function dfs(root, step) {
    if(root) {
      if(!res[step]) res[step] = []
      res[step].push(root.val)
      dfs(root.left, step+1 )
      dfs(root.right, step+1)
    }
  }
  dfs(root, 0);
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

// TODO：❗️纯CV==========================================================
// 341. 扁平化嵌套列表迭代器
// 输入：nestedList = [[1,1],2,[1,1]]
// 输出：[1,1,2,1,1]
var NestedIterator = function (nestedList) {
  this.stack = [];
  for (let i = nestedList.length - 1; i >= 0; i--) {
      this.stack.push(nestedList[i]);
  }
};

NestedIterator.prototype.stackTop2Integer = function () {
  while (this.stack.length > 0) {
      const top = this.stack[this.stack.length - 1];
      if (top.isInteger()) {
          return;
      }
      this.stack.pop();
      const list = top.getList();
      for (let i = list.length - 1; i >= 0; i--) {
          this.stack.push(list[i]);
      }
  }
};

NestedIterator.prototype.next = function () {
  this.stackTop2Integer();
  const top = this.stack.pop();

  return top.getInteger();
};

NestedIterator.prototype.hasNext = function () {
  this.stackTop2Integer();
  return this.stack.length > 0;
};
