// TODO：✅==========================================================
/* 36. 有效的数独
请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 
注意：
一个有效的数独（部分已被填充）不一定是可解的。
只需要根据以上规则，验证已经填入的数字是否有效即可。
空白格用 '.' 表示。 */

var no36_isValidSudoku = function(board) {
  let row = {}; 
  let col = new Array(9);
  let box = new Array(9);
  for(let i = 0;i < 9;i++){
    col[i] = new Array(10).fill(0);
    box[i] = new Array(10).fill(0);
  }

  for(let i = 0; i < 9; i++) {
    row = {};
    for(let j = 0; j < 9; j++) {
      if(board[i][j] == '.') continue;
      let num = Number(board[i][j]);
      if(row[num]) {
        return false;
      } else {
        row[num] = 1;
      }
      if(col[j][num]) {
        return false;
      } else {
        col[j][num] = 1;
      }
      let curBox = Math.floor(j/3) + Math.floor(i/3)*3
      if(box[curBox][num]) {
        return false;
      } else {
        box[curBox][num] = 1;
      }
    }
  }

  return true;
};


let board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","2",".",".",".",".","6","."]
,["1",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]


// console.log('no36_isValidSudoku', no36_isValidSudoku(board))

// TODO：✅==========================================================
// 37. 解数独
/* 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] */

var no37_solveSudoku = function(board) {
  
  function checkValid(row, col, strNum, board) {
    for(let i = 0 ; i < 9; i++) {
      if(strNum == board[i][col]) return false
      if(strNum == board[row][i]) return false
    }

    let startRow = Math.floor(row/3)*3
    let startCol = Math.floor(col/3)*3
    for(let i = startRow; i < startRow + 3; i++) {
      for(let j = startCol; j < startCol + 3; j++) {
          if(board[i][j] === strNum) return false
      }
    }
    return true
  }

  function backTracking() {
    for(let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[0].length; j++) {
        if(board[i][j] !== '.') continue
        for(let val = 1; val <= 9; val++) {
          if(checkValid(i, j, `${val}`, board)) {
              board[i][j] = `${val}`
              if (backTracking()) {
                  return true
              }
              board[i][j] = `.`
          }
        }
        return false
      }
    }
    return true
  }
  backTracking()

  return board
};


// console.log('no37_solveSudoku', no37_solveSudoku([["5","3",".",".","7",".",".",".","."],
// ["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],
// ["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],
// ["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],
// [".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
// ))


// TODO：❗️看了解析==========================================================
/* 51. N 皇后
给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。 */


var no51_solveNQueens = function(n) {
  let result = []
  let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill('.'))

    function isValid(row, col, chessBoard, n) {
        for(let i = 0; i < row; i++) {
            if(chessBoard[i][col] === 'Q') {
                return false
            }
        }
        for(let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if(chessBoard[i][j] === 'Q') {
                return false
            }
        }
        for(let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if(chessBoard[i][j] === 'Q') {
                return false
            }
        }
        return true
    }

    function transformChessBoard(chessBoard) {
        let chessBoardBack = []
        chessBoard.forEach(row => {
            let rowStr = ''
            row.forEach(value => {
                rowStr += value
            })
            chessBoardBack.push(rowStr)
        })
        return chessBoardBack
    }

    function backtracing(row) {
        if(row === n) {
            result.push(transformChessBoard(chessBoard))
            return
        }
        for(let col = 0; col < n; col++) {
            if(isValid(row, col, chessBoard, n)) {
                chessBoard[row][col] = 'Q'
                backtracing(row + 1)
                chessBoard[row][col] = '.'
            }
        }
    }
    backtracing(0)
    return result
};
// console.log('no51_solveNQueens', no51_solveNQueens(4))

// TODO：✅==========================================================
var no52_solveNQueens = function(n) {
  let result = []
  let chessBoard = new Array(n).fill([]).map(() => new Array(n).fill('.'))

    function isValid(row, col, chessBoard, n) {

        for(let i = 0; i < row; i++) {
            if(chessBoard[i][col] === 'Q') {
                return false
            }
        }
        for(let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if(chessBoard[i][j] === 'Q') {
                return false
            }
        }
        for(let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if(chessBoard[i][j] === 'Q') {
                return false
            }
        }
        return true
    }


    function backtracing(row) {
        if(row === n) {
            result.push([...chessBoard])
            return
        }
        for(let col = 0; col < n; col++) {
            if(isValid(row, col, chessBoard, n)) {
                chessBoard[row][col] = 'Q'
                backtracing(row + 1)
                chessBoard[row][col] = '.'
            }
        }
    }
    backtracing(0)
    return result.length
    
};
// console.log('52', no52_solveNQueens(4));

// TODO：✅==========================================================
// 46. 全排列
/* 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] */

var no46_backtracking = (nums, path, used, length, finalRes) => {
  if(path.length === length) {
    finalRes.push([...path])  // 因为path一直在变化
  }

  for(let i = 0; i < nums.length; i++) {
    if(used[i]) continue
    path.push(nums[i])
    used[i] = true
    no46_backtracking(nums, path, used, length, finalRes)
    path.pop();
    used[i] = false;
  }
}

var no46_permute = function(nums) {
  let finalRes = [];
  let numsLen = nums.length;
  no46_backtracking(nums, [], [], numsLen, finalRes)

  return finalRes; 
};
// console.log('no46_permute', no46_permute([1,2,3]))

// TODO：✅==========================================================
// 47. 全排列
/* 给定一个含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
输入：nums = [1,1,2]
输出：
[[1,1,2],
  [1,2,1],
 [2,1,1]] */

var no47_permuteUnique = function(nums) {
  nums = nums.sort((a, b) => a - b)
  let finalRes = [];
  let numsLen = nums.length;
  let path = [];
  let used = []

  function backtracking() {
    if(path.length === numsLen) {
      finalRes.push([...path])
    }
  
    for(let i = 0; i < nums.length; i++) {
      if(used[i]) continue
      if((i > 0 && nums[i] === nums[i-1]) && !used[i-1]) continue  // ❗️同树枝层去重
      path.push(nums[i])
      used[i] = true;
      backtracking()
      path.pop()
      used[i] = false;
    }
  }

  backtracking(numsLen)

  return finalRes;
};

// console.log('no47_permuteUnique', no47_permuteUnique([3,3,0,3]))

// TODO：✅==========================================================
// 77. 组合
/* 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
你可以按 任何顺序 返回答案。
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
] */

var no77_combine = function(n, k) {
  let finalRes = [];
  let path = [];
  let used = [];

  function backtracking(begin) {
    if(path.length === k) {
      finalRes.push([...path])
    }
    for(let i = begin; i <= n - path.length - k + 1; i ++) {  // i <= n - path.length - k + 1 为剪枝优化，也可以直接为n
      if(used[i]) continue;
      path.push(i);
      used[i] = true;
      backtracking(i+1, n)
      path.pop();
      used[i] = false;
    }
  }

  backtracking(1);

  return finalRes
};

// console.log('no77_combine', no77_combine(4, 4))


// TODO：✅==========================================================
//39. 组合总和
/* 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，
并以列表形式返回。你可以按 任意顺序 返回这些组合。
candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
对于给定的输入，保证和为 target 的不同组合数少于 150 个。

示例 1：
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。 */

var no39_combinationSum = function(candidates, target) {
  candidates = candidates.sort((a, b) => a - b)
  let finalRes = [];
  let path = [];
  let sum = 0

  function backtracking(start) {
    if(sum === target) {
      finalRes.push([...path])
      return
    }
    if(sum > target) {
      return
    }

    for(let i = start; i < candidates.length; i ++) {
      if(candidates[i] + sum > target) {
        break
      }
      path.push(candidates[i])
      sum += candidates[i]
      backtracking(i+1)
      sum -= candidates[i]
      path.pop()
    }
  }

  backtracking(0);
  return finalRes;
};

// console.log('no39_combinationSum', no39_combinationSum([2,3,6,7], 7))
// console.log('no39_combinationSum', no39_combinationSum(4, 4))

// TODO：✅==========================================================
// 40. 组合总和 II
/* 给定一个候选人编号的集合 candidates和一个目标数 target，找出 candidates中所有可以使数字和为 target 的组合。
candidates 中的每个数字在每个组合中只能使用 一次 。
注意：解集不能包含重复的组合。 

示例 1:
输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
] */

var no40_combinationSum2 = function(candidates, target) {
  candidates = candidates.sort((a, b) => a - b);
  let finalRes = []
  let path = []
  let sum = 0;
  let used = [];

  function backtracking(start) {
    if(sum === target) {
      finalRes.push([...path]);
      return
    }

    for(let i = start; i < candidates.length; i ++) {
      if(candidates[i] + sum > target) break
      if(used[i] || (candidates[i] === candidates[i-1] && !used[i-1] && i > 0)) continue
      path.push(candidates[i])
      sum+=candidates[i]
      used[i] = true
      backtracking(i+1)
      path.pop()
      sum-=candidates[i]
      used[i] = false
    }
  }

  backtracking(0)
  return finalRes
};

// console.log('no40_combinationSum2', no40_combinationSum2([10,1,2,7,6,1,5], 8))
// TODO：✅==========================================================
//78. 子集
// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
/* 输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] */

var no78_subsets = function(nums) {
  let finalRes = []
  let curCnt = 0;
  let numsLen = nums.length
  let path = []
  let used = []
  function backtracking(begin) {
    if(path.length === curCnt) {
      finalRes.push([...path])
    }

    for(let i = begin;i < numsLen; i++) {
      if(used[i]) continue
      used[i] = true
      path.push(nums[i])
      backtracking(i+1)
      used[i] = false
      path.pop()
    }
  }
  while(curCnt <= numsLen) {
    backtracking(0)
    curCnt++
  }

  return finalRes
};
// console.log('no78_subsets', no78_subsets([1,2,3]))

// TODO：✅==========================================================
/* 60. 排列序列
给出集合 [1,2,3,...,n]，其所有元素共有 n! 种排列。
按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
"123"
"132"
"213"
"231"
"312"
"321"
给定 n 和 k，返回第 k 个排列。 */
var no60_getPermutation = function(n, k) {
  let res = []
  let path = ''
  let used = []
  
  function backtracking() {
    if(res.length === k) {
      return res[k-1]
    }
    if(path.length === n) {
      res.push(path);
    }
    for(let i = 1; i <= n; i++) {
      if(used[i]) continue
      path += i + ''
      used[i] = true
      backtracking()
      path = path.slice(0, -1)
      used[i] = false
    }
  }

  backtracking();
  return res[k-1];
};

// console.log('no60_getPermutation', no60_getPermutation(3, 6))

// TODO：✅==========================================================
// 90.
// 输入：nums = [1,2,2]
// 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]

var no90_subsetsWithDup = function(nums) {
  let finalRes = []
  let curCnt = 0;
  let numsLen = nums.length
  let path = []
  let used = []
  nums = nums.sort((a, b) => a - b)
  function backtracking(begin) {
    if(path.length === curCnt) {
      finalRes.push([...path])
    }

    for(let i = begin;i < numsLen; i++) {
      if(used[i] || (i > 0 && nums[i] === nums[i-1] && !used[i-1])) continue
      used[i] = true
      path.push(nums[i])
      backtracking(i+1)
      used[i] = false
      path.pop()
    }
  }
  while(curCnt <= numsLen) {
    backtracking(0)
    curCnt++
  }

  return finalRes
};

// console.log('no90_subsetsWithDup', no90_subsetsWithDup([1,4,4,4,4]))

// TODO：❗️==========================================================
// 93. 复原 IP 地址
// 输入：s = "101023"
// 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

var no93_restoreIpAddresses = function(s) {
  const res = [], path = [];
  
  function backtracking(i) {
      const len = path.length;
      if(len > 4) return;
      if(len === 4 && i === s.length) {
          res.push(path.join("."));
          return;
      }
      for(let j = i; j < s.length; j++) {
          const str = s.substr(i, j - i + 1);
          if(str.length > 3 || +str > 255) break;
          if(str.length > 1 && str[0] === "0") break;
          path.push(str);
          backtracking(j + 1);
          path.pop()
      }
  }
  backtracking(0)
  return res;
};
// console.log('no93_restoreIpAddresses',no93_restoreIpAddresses('101023'))
