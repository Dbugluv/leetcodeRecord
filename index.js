
// TODO：❌==========================================================

/*  
    0 //1
    01  //2
    0110  //3
    01101001 //4
    0110100110010110  //5
  */
// 暴力解法
function no779(n, k) {
  let res = '0';
  if(n === 1) {
    return 0;
  } else {
    let newRes = res;
    for(let i = 1; i < n; i++) {
      if( k <= res.length){
        return Number(res.charAt(k - 1))
      }
      for(let j = 0; j < res.length; j ++) {
        let reversalNum = Number(res.charAt(j)) ? '0' : '1';
        newRes += reversalNum;
        console.log('newRes', newRes, 'len', newRes.length, 'j', j)
        if( newRes.length === k) {
          return Number(reversalNum);
        }
      }
      res = newRes;
    }
  }
}
// let result = no779(30, 2);


// TODO：✅==========================================================

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.

// 输入：l1 = [0], l2 = [0]
// 输出：[0]

// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
// var a = new ListNode(3)
// var b = new ListNode(4, a)
// var c = new ListNode(2, b)

// 数组转链表。
function makeList1(arr) {
  let list = null
  arr.forEach((item) => {
    if (!list) {
      list = tail = new ListNode(item)
    } else {
      tail.next = new ListNode(item)
      tail = tail.next
    }
  })
  return list
}

var no2_addTwoNumbers = function(l1, l2) {
  l1 = makeList1(l1);
  l2 = makeList1(l2);
  let l3 = new ListNode(0)
  let cur = l3;
  let addOne = 0;
  while(addOne || l1 || l2) {
    let l1val = l1 ? l1.val : 0;
    let l2val = l2 ? l2.val : 0;

    let sum = l1val + l2val + addOne;
    addOne = sum >= 10 ? 1 : 0;
    l3.next = new ListNode(sum % 10)
    l3 = l3.next;
    l1 = l1 ? l1.next : 0;
    l2 = l2 ? l2.next : 0;
  }
  return cur.next;
};

// no2_addTwoNumbers([9,9,9,9,9,9,9], [9,9,9,9])


// TODO：✅==========================================================
/* 
将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

P   A   H   N
A P L S I I G
Y   I   R
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
 

示例 1：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I     N
A   L S   I G
Y A   H R
P     I
示例 3：

输入：s = "A", numRows = 1
输出："A" */

var convert_no6 = function(s, numRows) {
  if([1,2].includes(s.length) || numRows === 1 || numRows >= s.length) {
    return s;
  }
  let resArr = new Array(numRows).fill('');
  let downFlow = false;

  let r = 0;
  for(let i = 0; i < s.length; i++) {
    if(r === numRows - 1) {
      downFlow = false;
    } else if (r === 0) {
      downFlow = true;
    }
    console.log('r', r)
    resArr[r] += s.charAt(i);

    if(downFlow) {
      r+=1;
    } else {
      r-=1;
    }
  }

  return resArr.join('')
};

// console.log('res', convert_no6('ABCDEFGH', 2))

// TODO：❌==========================================================
/* no.10
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素

输入：s = "ab", p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。

s='aaaaaaaaaabbbbcc' p='a*b*c*'
*/

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

var isMatch = function(s, p) {
  for(let i = 0; i < p.length; i++) {
    console.log('--s', s)
    if(p.charAt(i) === '.') {
      if(i+1 < p.length && p.charAt(i+1) === '*') {
        if(i+2 < p.length) {
          let nextStr = s.indexOf(p.charAt(i+2))
          s = s.slice(nextStr)
          continue;
        } else {
          return true
        }
      } else {
        s = s.slice(i+1)
        continue;
      }
    }

    if(p.charAt(i) === '*') {
      let nextStr = p.charAt(i+1) ? s.indexOf(p.charAt(i+1)) : 1;
      let newS = s.slice(0, nextStr)
      // console.log('newS', newS, 'p.charAt(i-1)', p.charAt(i-1), 'reg', reg)
      let reg = new RegExp(p.charAt(i-1),"g");
      newS = newS.replace(reg, '')
      if(newS !== '') {
        return false;
      } else {
        s = s.slice(nextStr)
        continue
      }
    }

    if(p.charAt(i) === s.charAt(0)) {
      s = s.slice(i+1);
    }else if(p.charAt(i) !== s.charAt(i) && p.charAt(i+1)!=='*') {
      return false
    }else if(p.charAt(i) !== s.charAt(i) && p.charAt(i+1)==='*') {
      s = s.slice(i+2)
    }
  }
  return !s.length
};

// console.log('no.10_isMatch', isMatch('aab', 'c*a*b'))

// TODO：✅==========================================================
/* 11. 盛最多水的容器
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。 

[1,8,6,2,5,4,8,3,7]
49 
*/


var maxArea = function(height) {
  let left = 0, right = height.length - 1;
  let max = 0;
  while( left!==right ) {
    max = height[left] < height[right] ?  Math.max(max, (right - left) * height[left++]): 
    Math.max(max, (right - left) * height[right--]); 
  }
  // console.log('max', max)
  return max;
};


// maxArea([1,8,6,2,5,4,8,3,7])

// TODO：✅==========================================================
/* 12. 整数转罗马数字
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
1 <= num <= 3999

num = 1994
输出: "MCMXCIV"
 */

var intToRoman = function(num) {
  let res = '';
  const valueSymbols = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];

  for (const [value, symbol] of valueSymbols) {
    while (num >= value) {
        num -= value;
        res += symbol;
    }
    if (num == 0) {
        break;
    }
  }

  return res;
};

// console.log(intToRoman(3000))

// TODO：✅==========================================================
// 13 罗马转数字
var RomanToInt = function(s) {
  let res = 0;
  s = s.replace("IV","a").replace("IX","b").replace("XL","c").replace("XC","d").replace("CD","e").replace("CM","f");

  function trans(str) {
    switch(str) {
      case 'I': return 1;
      case 'V': return 5;
      case 'X': return 10;
      case 'L': return 50;
      case 'C': return 100;
      case 'D': return 500;
      case 'M': return 1000;
      case 'a': return 4;
      case 'b': return 9;
      case 'c': return 40;
      case 'd': return 90;
      case 'e': return 400;
      case 'f': return 900;
    }
  }

  for (let i=0; i<s.length; i++) {
    res += trans(s.charAt(i));
  }

  return res;
};

// RomanToInt('CXLVIII')

// TODO：✅==========================================================
// 14 最长公共前缀
var longestCommonPrefix = function(strs) {
  let res = '';
  let i ,j = 0;
  let minStr = strs[0]

  for(i = 0; i < minStr.length; i++) {
    let flag = true;
    for( j = 0; j < strs.length - 1; j++ ) {
      if(minStr.charAt(i) !== strs[j+1].charAt(i)) {
        flag = false;
        break;
      }
    }
    if(!flag) {
      break;
    } else {
      res += strs[0].charAt(i)
    }
  }

  console.log('longestCommonPrefix-res', res)
  return res;
};

// longestCommonPrefix(["f1d","fd","f1dd"])

// TODO：❓==========================================================
// 三数之和
var threeSum = function(arr) {
  const res = [];
    const len = arr.length;
    if(!arr || len<3) {
      return res;
    }

    arr.sort((a, b) => a - b); // 排序

    for(let i = 0; i < arr.length; i++){
      if(arr[i] > 0) break;
      if(i > 0 && arr[i] == arr[i-1]) continue; // 去重
      let L = i+1;
      let R = len -1;
      while(L<R) {
        const sum = arr[i] + arr[L] + arr[R];
        if(sum === 0) {
          res.push([arr[L],arr[R],arr[i]])
          while (L<R && arr[L] == arr[L+1]) L++; // 去重
          while (L<R && arr[R] == arr[R-1]) R--; // 去重
          L++;
          R--;
        }
        else if (sum < 0) L++;
        else if (sum > 0) R--;
      }
    }
    return res;
};

// TODO：✅==========================================================

/* 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
返回这三个数的和。
假定每组输入只存在恰好一个解。

输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
[4,0,5,-5,3,3,0,-4,-5], -2 预期 -2
[833,736,953,-584,-448,207,128,-445,126,248,871,860,333,-899,463,488,-50,-331,903,575,265,162,-733,648,678,549,579,-172,-897,562,-503,-508,858,259,-347,-162,-505,-694,300,-40,-147,383,-221,-28,-699,36,-229,960,317,-585,879,406,2,409,-393,-934,67,71,-312,787,161,514,865,60,555,843,-725,-966,-352,862,821,803,-835,-635,476,-704,-78,393,212,767,-833,543,923,-993,274,-839,389,447,741,999,-87,599,-349,-515,-553,-14,-421,-294,-204,-713,497,168,337,-345,-948,145,625,901,34,-306,-546,-536,332,-467,-729,229,-170,-915,407,450,159,-385,163,-420,58,869,308,-494,367,-33,205,-823,-869,478,-238,-375,352,113,-741,-970,-990,802,-173,-977,464,-801,-408,-77,694,-58,-796,-599,-918,643,-651,-555,864,-274,534,211,-910,815,-102,24,-461,-146]
-7111 预期 -2960
*/

var threeSumClosest = function(nums, target) {
  const numLen = nums.length
  let res = nums[0] + nums[1] + nums[numLen - 1];
  let dis =  Math.abs(target - res); // 差值
  let min = res;
  nums = nums.sort((a, b) => a-b)
  for(let i = 0; i < numLen - 1 ; i++) {
    let L = i+1, R = numLen - 1;
    while(L < R) {
      res = nums[L] + nums[R] + nums[i];
      if(Math.abs(res - target) < dis) {  // 更新
        min = res;
        dis = Math.abs(target - res);
      } else if (res === target) {  // find!
        return res;
      }

      if(res > target) {
        R --;
      } else if (res < target) {
        L ++;
      }
      // console.log('res', res, 'dis', dis, 'targe', target)
    }
  }

  return min;
};

// console.log('threeSumClosest', threeSumClosest([833,736,953,-584,-448,207,128,-445,126,248,871,860,333,-899,463,488,-50,-331,903,575,265,162,-733,648,678,549,579,-172,-897,562,-503,-508,858,259,-347,-162,-505,-694,300,-40,-147,383,-221,-28,-699,36,-229,960,317,-585,879,406,2,409,-393,-934,67,71,-312,787,161,514,865,60,555,843,-725,-966,-352,862,821,803,-835,-635,476,-704,-78,393,212,767,-833,543,923,-993,274,-839,389,447,741,999,-87,599,-349,-515,-553,-14,-421,-294,-204,-713,497,168,337,-345,-948,145,625,901,34,-306,-546,-536,332,-467,-729,229,-170,-915,407,450,159,-385,163,-420,58,869,308,-494,367,-33,205,-823,-869,478,-238,-375,352,113,-741,-970,-990,802,-173,-977,464,-801,-408,-77,694,-58,-796,-599,-918,643,-651,-555,864,-274,534,211,-910,815,-102,24,-461,-146], -7111))


// TODO：✅==========================================================
// no.19
/* 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let headLen = 0;
  let newHead = makeList1(head);
  while(newHead) {
    newHead = newHead.next;
    headLen ++;
  };
  let index = headLen - n;
  headLen = 0;
  newHead = makeList1(head);
  let cnt = new ListNode(0)
  let res = cnt;
  while(newHead) {
    if(headLen !== index) {
      cnt.next = new ListNode(newHead.val);
      cnt = cnt.next;
      // console.log('resres', res)
    }
    headLen ++;
    newHead = newHead.next;
  }
  // console.log('headlengf', headLen, newHead, 'res', res.next)
};

// console.log('no.19-removeNthFromEnd', removeNthFromEnd([1,2,3,4,5], 2))

// TODO：✅==========================================================
/* no.17 电话号码字母组合 
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"] */

var comb = function(one, two) {
  let res = [];
  for(let i = 0; i < one.length; i++) {
    for(let j = 0; j < two.length; j++) {
      res.push(`${one[i]+two[j]}`);
    }
  }
  return res;
}
var letterCombinations = function(digits) {
  let obj = {
    "2": ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  };

  if(digits === ''){
    return []
  }

  let digitsArr =  digits.split('');
  let res = obj[digitsArr[0]];
  for(let m = 1; m < digits.length; m++) {
    res = comb(res, obj[digitsArr[m]])
  }

  return res;
};

// console.log('no_17: ', letterCombinations('23'))

// TODO：❌==========================================================
// 采用了官方解法
/* no.18 四数之和
输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]] 

[-3,-1,0,2,4,5] 2 --- [[-3,-1,2,4]]
[2,2,2,2,2], 8
*/

var no18_fourSum = function(nums, target) {
  nums = nums.sort((a, b) => a - b);
  let numsLen = nums.length;
  if([1,2,3].includes(numsLen)) {
    return [];
  }

  let first  = 0 , fourth = numsLen - 1;
  let sum;
  let res = [];
  while(first < fourth - 2) {   
    let L = first + 1;
    let R = fourth - 1;
    while(L < R) {
      sum = nums[first] + nums[fourth] + nums[L] + nums [R];
      // console.log('sum', sum, 'R', R, 'L', L, 'fi', first, 'fourth', fourth)
      if(sum === target) {
        res.push([nums[first], nums[L], nums[R], nums[fourth]]);
        while(L<R && nums[R] === nums[R-1]){
          R --;
        }
        R--;
      }
      if(sum > target) {
          R --;
      }

      if(sum < target) {
          L ++;
      }
    }

    if(sum > target) {
      while(first < fourth - 3 && nums[fourth] === nums[fourth - 1]) {
        fourth--;
      }
      fourth--;
    }

    if(sum <= target) {
      while(first < fourth - 3 && nums[first] === nums[first + 1]) {
        first ++;
      }
      first++;
    }
    console.log('res', res, 'sum', sum, 'fi', first, 'fourth', fourth)
  }

  return res;
};

// no18_fourSum([-3,-1,0,2,4,5], 2)

// TODO：✅==========================================================
/* no.21 合并省序链表
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
*/

// let list1 = makeList1([1]);
// let list2 = makeList1([1,3,4])
var no21_mergeTwoLists = function(list1, list2) {
  let res = new ListNode(0);
  let list3 = res;
  while(list1 || list2) {
    if(!list2) {
      list3.next = list1;
      return res.next;
    }
    if(!list1) {
      list3.next = list2;
      return res.next;
    }

    if(list1.val > list2.val) {
      list3.next = list2;
      list3 = list3.next;
      list2 = list2.next;
    } else {
      list3.next = list1;
      list3 = list3.next;
      list1 = list1.next;
    }
  }

  console.log('res---', res.next);
  return res.next;
};

// console.log('no21_mergeTwoLists-res, ' ,no21_mergeTwoLists(list1, list2))

// TODO：❗️抄的==========================================================
/* 22. 括号生成
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
*/
//简单来说，在求N个括号的排列组合时，把第N种情况（也就是N个括号排列组合）视为单独拿一个括号E出来，
// 剩下的N-1个括号分为两部分，P个括号和Q个括号，P+Q=N-1，然后这两部分分别处于括号E内和括号E的右边，
// 各自进行括号的排列组合。由于我们是一步步计算得到N个括号的情况的，
// 所以小于等于N-1个括号的排列组合方式我们是已知的（用合适的数据结构存储，
// 方便后续调用，且在存储时可利用特定数据结构实现题目某些要求，如排序，去重等），
// 且P+Q=N-1，P和Q是小于等于N-1的，所以我们能直接得到P个和Q个括号的情况，进而得到N个括号的结果！
// 剩下的括号要么在这一组新增的括号内部，要么在这一组新增括号的外部（右侧）。
// 既然知道了 i<n 的情况，那我们就可以对所有情况进行遍历：
// "(" + 【i=p时所有括号的排列组合】 + ")" + 【i=q时所有括号的排列组合】
// 其中 p + q = n-1，且 p q 均为非负整数。
// 事实上，当上述 p 从 0 取到 n-1，q 从 n-1 取到 0 后，所有情况就遍历完了。
// 注：上述遍历是没有重复情况出现的，即当 (p1,q1)≠(p2,q2) 时，按上述方式取的括号组合一定不同。
// var no22_generateParenthesis = function(n) {
//     if (n == 0) return [];

//     let data = new Map();
//     data.set(0, ['']);
//     for (let i = 1; i <= n; i++) {
//       let result = [];
//       for (let j = 0; j <= i - 1; j++) {
//         let center = data.get(j);
//         let right = data.get(i - 1 - j);
//         for (let k = 0; k < center.length; k++) {
//           for (let t = 0; t < right.length; t++) {
//             result.push(`(${center[k]})${right[t]}`);
//           }
//         }
//       }
//       data.set(i, result);
//     }
//     return data.get(n);
// };

var no22_generateParenthesis = function(n) {
  let res = []
  if(n === 0) {
    return res;
  }

  function dfs(curStr, left, right, res) {
    if(left === 0 && right === 0) {
      res.push(curStr)
      return
    }

    if (left > right) {
      return;
    }

    if (left > 0) {
        dfs(curStr + "(", left - 1, right, res);
    }

    if (right > 0) {
        dfs(curStr + ")", left, right - 1, res);
    }
  }

  dfs('', n, n, res)
  return res;
};

// console.log('no22_generateParenthesis', no22_generateParenthesis(3))

// TODO：❗️抄的动归==========================================================
/* 32. 最长有效括号
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()" */
var no32_longestValidParentheses = function(s) {
  let sLen = s.length
  if(sLen === 0) return 0;
  let dp = new Array(sLen).fill(0)

  let maxVal = 0;
  for(let i = 0; i < sLen; i++) {
    if(s[i] === ")") {
      if(s[i-1] === "(") {
        dp[i] = 2;
        if(i - 2 >= 0) {
          dp[i] = dp[i] + dp[i-2]
        }
      } else if (dp[i-1] > 0) {
        if ((i - dp[i - 1] - 1) >= 0 && s[i - dp[i - 1] - 1] == '(') {
          dp[i] = dp[i - 1] + 2;
          if ((i - dp[i - 1] - 2) >= 0) {
              dp[i] = dp[i] + dp[i - dp[i - 1] - 2];
          }
        }
      }
    }
    maxVal = Math.max(maxVal, dp[i]);
  }
  return maxVal
};

// console.log('no32_longestValidParentheses', no32_longestValidParentheses(')()())'));

// TODO：✅==========================================================
// 执行用时：88 ms, 在所有 JavaScript 提交中击败了72.35%的用户
// 内存消耗：46 MB, 在所有 JavaScript 提交中击败了75.00%的用户

// 23:给你一个链表数组，每个链表都已经按升序排列。
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。
// 示例 1：
// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6

var no23_mergeKLists = function(lists) {
  let listLen = lists.length;
  let resArr = lists;
  if(lists.length === 1) {
    return lists[0];
  }
  if(lists.length === 0) {
    return []
  }

  while(resArr.length > 1) {
    let tempArr = [];
    for(let i = 0; i < resArr.length; i += 2) {
      a = ((i+1 < listLen) ? no21_mergeTwoLists(resArr[i], resArr[i+1]) : resArr[i]);
      tempArr.push(a)
    }
    resArr = tempArr;
  }
  return resArr[0]
};

// let a1 = makeList1([1,4,5]);
// let a2 = makeList1([1,3,4]);
// let a3 = makeList1([2,6]);

// console.log('no.23', no23_mergeKLists([]))

// TODO：✅==========================================================
// 24. 两两交换链表中相邻的节点
//必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）

/* 输入：head = [1,2,3,4]
输出：[2,1,4,3]

输入：head = []
输出：[] */


/* var no24_swapPairs = function(head) {
  if(!head) {
    return head;
  }
  if(!head.next) {
    return head;
  }
  let cnt = 1;
  let temp = new ListNode(0);
  let res = temp;
  while(head) {
    if(cnt % 2 !== 0) {
      if(head.next) {
        temp.next = new ListNode(head.next.val);
        temp = temp.next;
        console.log('temp1', temp)
        temp.next = new ListNode(head.val)
        console.log('temp2', temp.next)
        temp = temp.next;
      } else {
        temp.next = new ListNode(head.val)
        temp = temp.next;
      }
    }
    head = head.next;
    cnt++;
  }

  return res.next
}; */

// 递归写法！！
var no24_swapPairs = function(head) {
  if(!head || !head.next) {
    return head;
  }

  let temp = head.next;
  head.next = no24_swapPairs(head.next.next);  // 交换下一组， temp.next === head.next.next
  temp.next = head;
  return temp
};

// let test1 = makeList1([1, 2, 3, 4])
// console.log('no24_swapPairs', no24_swapPairs(test1))

// TODO：✅==========================================================
// 206. 反转链表
// 递归效率低
// var no206_reverse = (head) => {
//   if(head == null || head.next == null){
//     return head;
//   }
//   let newList = reverse(head.next);
//   head.next.next = head;
//   head.next = null;

//   return newList;
// }

var no206_reverse = (head) => {
  let pre = null;
  let curr = head;
  while (curr != null) {
      let next = curr.next;
      curr.next = pre;
      pre = curr;
      curr = next;
  }
  return pre;
}

// TODO：❗️==========================================================
/* 25. K 个一组翻转链表
给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]

输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5] */


let successor = null;

var no25_reverseKGroup = function(head, k) {
  let dummy = new ListNode(0);
  dummy.next = head;

  let pre = dummy;
  let end = dummy;

  while(end.next !== null) {
    // console.log('end', end.next)
    for(let i = 0; i < k && end !== null; i++) {
      end = end.next
    }
    if (end == null) break;
    let start = pre.next;
    let next = end.next;
    end.next = null;
    pre.next = no206_reverse(start);
    start.next = next;
    pre = start;

    end = pre;
  }

  return dummy.next;
};

let no25 = makeList1([1,2,3,4,5])
// console.log('no25_reverseKGroup', no25_reverseKGroup(no25, 2))

// TODO：✅==========================================================
// 26. 删除有序数组中的重复项
/* 给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
元素的 相对顺序 应该保持 一致 。
由于在某些语言中不能改变数组的长度，所以必须将结果放在数组nums的第一部分。更规范地说，如果在删除重复项之后有 k 个元素，那么 nums 的前 k 个元素应该保存最终结果。
将最终结果插入 nums 的前 k 个位置后返回 k 。
不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。 */

var no26_removeDuplicates = function(nums) {
  let pre = 0, cur = 1;
  let numsLen = nums.length;
  if(numsLen === 1) {
    return 1;
  }

  while(cur < numsLen) {
    console.log('cur', cur)
    if(nums[pre] !== nums[cur]) {
      pre++;
      nums[pre] = nums[cur];
    }
    cur ++;
  }
  console.log('num', nums, 'pre', pre)
  return pre+1;
};

// console.log('no26_removeDuplicates', no26_removeDuplicates([1,2,3,4,5,6,6,6,6,6,6,6,6,7]))

// TODO：✅==========================================================
/* 27. 移除元素
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。 */
// 输入：nums = [3,2,2,3], val = 3
// 输出：2, nums = [2,2]
var no27_removeElement = function(nums, val) {
  let pre = 0, cur = 0;
  let numsLen = nums.length;

  while(cur < numsLen) {
    if(nums[cur] !== val) {
      nums[pre] = nums[cur];
      pre++;
    }
    cur ++;
  }
  console.log('nums', nums, 'pre', pre)
  return pre;
};

// console.log('no27_removeElement', no27_removeElement([1,2,3,4,5,6,6,6,6,6,6,6,6,7], 2))

// TODO：✅==========================================================
// 28. 找出字符串中第一个匹配项的下标
/* 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。
如果 needle 不是 haystack 的一部分，则返回  -1 。 \

输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
*/

var no28_strStr = function(haystack, needle) {
  let start = 0, needleStart = 0;
  let needleLen = needle.length;
  let haystackLen = haystack.length;
  let res = -1;
  while(start < haystackLen) {
    if(needle.charAt(needleStart) === haystack.charAt(start + needleStart)) {
      needleStart++;
    } else {
      start++;
      needleStart = 0;
    }

    if(needleStart === needleLen) {
      return start;
    }
  }
  return res;
};

// console.log('no28_strStr', no28_strStr("mississippi","issip"))
// console.log('no28_strStr', no28_strStr("aaabc","abc"))

// TODO：✅==========================================================
// 29. 两数相除
/* 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
返回被除数 dividend 除以除数 divisor 得到的商。
整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
示例 1:
输入: dividend = 10, divisor = 3
输出: 3
解释: 10/3 = truncate(3.33333..) = truncate(3) = 3 


输入: dividend = 7, divisor = -3
输出: -2
解释: 7/-3 = truncate(-2.33333..) = -2
*/
const MAXVALUE = 2147483647;
const MINVALUE = -2147483648
var no29_divide = function(dividend, divisor) {
  let res = 1;
  let isDis = (divisor < 0 && dividend > 0) || (dividend < 0 && divisor > 0);
  console.log('isDis', isDis)
  divisor = Math.abs(divisor);
  dividend = Math.abs(dividend)
  let double = divisor;
  if(dividend === 0 || dividend < divisor) {
    return isDis? -0: 0;
}
  if( isDis && dividend === 2141483648 && divisor === 1) {
    return MINVALUE;
  }

  if(divisor === MINVALUE && dividend === MINVALUE) {
    return isDis ? -1 : 1;
  }

  if(divisor === MAXVALUE && dividend === MAXVALUE) {
    return isDis ? -1 : 1;
  }

  if(dividend >= MAXVALUE && divisor === 1) {
    return isDis ? -MAXVALUE : MAXVALUE
  }

  while(double*2 < dividend) {
    double = 2*double;
    res *= 2;
  }
  // console.log('double', double)
  if(2*double === dividend) {
    return  isDis ? -res*2 : res*2;
  }

  dividend = dividend - double;
  // console.log('dividend',dividend , 'double', double, 'res', res)
  while(dividend >= divisor) {
    dividend = dividend - divisor;
    res ++;
  }

  console.log('res', res)
  return isDis ? -res : res;
};

// console.log('no29_divide', no29_divide(-2147483648, 2))

// TODO：✅==========================================================
/* 30. 串联所有单词的子串
给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串 长度相同。
 s 中的 串联子串 是指一个包含  words 中所有字符串以任意顺序排列连接起来的子串。

例如，如果 words = ["ab","cd","ef"]， 那么 "abcdef"， "abefcd"，"cdabef"， "cdefab"，"efabcd"， 
和 "efcdab" 都是串联子串。 "acdbef" 不是串联子串，因为他不是任何 words 排列的连接。
返回所有串联字串在 s 中的开始索引。你可以以 任意顺序 返回答案。 */

// 输入：s = "barfoothefoobarman", words = ["foo","bar"]
// 输出：[0,9]
// 解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。

var no30_findSubstring = function(s, words) {
  let wordsMap = new Map()
  let wordsLen = words[0].length;
  let wordSum = words.length*wordsLen
  let finalRes = []
  for(let i in words) {
    wordsMap.set(words[i], wordsMap.has(words[i]) ? wordsMap.get(words[i])+1 : 1)
  }

  for(let i = 0; i < s.length - wordSum + 1; i ++) {
    let cnt = 0;
    let begin = i;
    let subMap = new Map()
    while(cnt !== words.length) {
      let subStr = s.slice(begin, begin+wordsLen)
      if(wordsMap.get(subStr) && (subMap.get(subStr) < wordsMap.get(subStr) || !subMap.get(subStr))) {
        subMap.set(subStr, (subMap.has(subStr) ? (subMap.get(subStr) + 1) : 1))
        begin+=wordsLen
        cnt+=1
      } else {
        break
      }
    }
    if(cnt === words.length) {
      finalRes.push(i)
    }
  }

  return finalRes
};
// console.log('no30_findSubstring', no30_findSubstring("a", ["a", "a"]))

// TODO：❗️==========================================================
/* 72. 编辑距离
给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

你可以对一个单词进行如下三种操作：
插入一个字符
删除一个字符
替换一个字符
输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e') 

输入：word1 = "intention", word2 = "execution"
输出：5
*/

var no72_minDistance = function(word1, word2) {
  let dp = Array.from(Array(word1.length + 1), () => Array(word2.length+1).fill(0));

    for(let i = 1; i <= word1.length; i++) {
        dp[i][0] = i; 
    }

    for(let j = 1; j <= word2.length; j++) {
        dp[0][j] = j;
    }

    for(let i = 1; i <= word1.length; i++) {
        for(let j = 1; j <= word2.length; j++) {
            if(word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 1);
            }
        }
    }
    
    return dp[word1.length][word2.length];
};

// console.log('no72_minDistance', no72_minDistance('horse', 'ros'))

// TODO：==========================================================
/* 76. 最小覆盖子串
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。 */

var no76_minWindow = function(s, t) {
  let result = ''
  let slen = s.length
  let tMap = new Map()
  if(t.length === 1) {
    return s.indexOf(t) === -1 ? '' : t;
  }
  if(t.length > s.length || s.length === 0) {
    return '';
  }

  for(let i in t) {
    tMap.set(t[i], (tMap.get(t[i]) || 0) + 1)
  }
  let i = 0;
  while(i < slen) {
    let sMap = new Map()
    let cnt = 0
    if(t.indexOf(s[i]) !== -1) {
      let begin = i;
      while(begin < slen && cnt < t.length) {
        let subStr = s[begin]
        if(tMap.get(subStr) && ((sMap.get(subStr) || 0) < tMap.get(subStr))) {
          sMap.set(subStr, (sMap.get(subStr) || 0) + 1)
          cnt++
        }

        begin++
      }
      if(cnt === t.length) {
        result = ((begin - i - 1 < result.length) || result.length === 0 ) ? s.slice(i, begin) : result
      }
    }

    i++
  }

  return result
};
// console.log('no76', no76_minWindow('ADOBECODEBANC', 'ABC'))

// TODO：❗️抄的==========================================================
// 31. 下一个排列
/* 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，
如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。
如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
给你一个整数数组 nums ，找出 nums 的下一个排列。

必须 原地 修改，只允许使用额外常数空间。 */

// 输入：nums = [1,2,3] ， [1,5,1]
// 输出：[1,3,2]， [5,1,1]


var no31_nextPermutation = function(nums) {
  //定义变量 从后向前看
let i = nums.length - 2, k = nums.length - 1
// 遍历寻找相邻的升序元素，此时[i+1,end]为降序
for (; i >= 0; --i) {
    if (nums[i] < nums[i + 1]) break
}
// 如果不存在，则直接翻转整个数组
if (i === -1) {
    nums.reverse()
} else {
    for (; k >= 0; --k) {
        // 遍历寻找[i+1,end]中是否有数字大于nums[i]，若存在，则交换
        if (nums[i] < nums[k]) {
            [nums[i], nums[k]] = [nums[k], nums[i]]
            // 此时[i+1,end]必为降序，使之翻转为升序，保证i后为最小值
            let arr = nums.splice(i + 1,)
            arr.reverse()
            nums.splice(i + 1, 0, ...arr)
            break
        }
    }
}
return nums
};

// console.log('no31_nextPermutation', no31_nextPermutation([1,5,1]))

// TODO：==========================================================
// 32. 最长有效括号
/* 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
示例 1：
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
示例 2：

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
示例 3：

输入：s = ""
输出：0 */

var longestValidParentheses = function(s) {

};


// TODO：✅ cv ==========================================================
// 33. 搜索旋转排序数组
/* 整数数组 nums 按升序排列，数组中的值 互不相同 。
在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为
[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。
例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。 

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
*/

var no33_search = function(nums, target) {
  let numsLen = nums.length;
  let l = 0, r = numsLen - 1;
  while (l <= r){
      let mid = (l + r) >> 1;
      if (target == nums[mid]) return mid;

      if (nums[l] <= nums[mid]) // 左边有序
      {
          if (target >= nums[l] && target < nums[mid])
              r = mid-1;
          else
              l = mid+1;
      }
      else  // 右边有序
      {
          if (target > nums[mid] && target <= nums[r])
              l = mid +1;
          else
              r = mid -1;
      }
  }
  return -1;
};

// console.log('no33_search', no33_search([5,1,3], 5))

// TODO：✅==========================================================
// 34. 在排序数组中查找元素的第一个和最后一个位置
/* 给你一个按照 非递减顺序排列 的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
如果数组中不存在目标值 target，返回 [-1, -1]。
你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
*/

var no34_searchRange = function(nums, target) {
  let numsLen = nums.length;
  let left = 0, right = numsLen - 1;
  let res = [];
  while(left <= right) {
    let mid = Math.floor((left+right)  / 2);
    if(nums[mid] === target) {
      let tempMid = mid;
      while(nums[tempMid] === nums[tempMid-1] && (tempMid - 1 >= 0)) {
        tempMid --;
      }

      res[0] = tempMid;
      while(nums[mid] === nums[mid+1] && (mid + 1 < numsLen)) {
        mid ++
      }
      res[1] = mid;
      return res;
    }
    if(nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return [-1, -1];
};
// console.log('no34_searchRange', no34_searchRange([1,1,2], 1))

// TODO：✅==========================================================
// 35. 搜索插入位置
// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 输入: nums = [1,3,5,6], target = 5
// 输出: 2
// 输入: nums = [1,3,5,6], target = 2
// 输出: 1

// me:
// var no35_searchInsert = function(nums, target) {
//   let numsLen = nums.length;
//   let left = 0, right = numsLen - 1;
//   if(numsLen === 0) {
//     return 1;
//   }
//   while(left <= right) {
//     let mid = Math.floor((left+right)  / 2);
//     if(nums[mid] === target) {
//       return mid;
//     }

//     if(nums[mid] > target) {
//       right = mid - 1;
//       if(nums[mid -1] < target || mid -1 < 0) {
//         return mid;
//       }
//     } else if (nums[mid] < target) {
//       left = mid + 1;
//       if(nums[mid+1] > target || mid+1 === numsLen) {
//         return mid +1;
//       }
//     }
//   }
// };

//优化算法
var no35_searchInsert = function(nums, target) {
  let numsLen = nums.length;
  let left = 0, right = numsLen - 1;
  if(numsLen === 0) {
    return 1;
  }
  while(left <= right) {
    let mid = Math.floor((left+right)  / 2);
    if(nums[mid] === target) {
      return mid;
    } else if(nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return left;
};

// console.log('no35_searchInsert', no35_searchInsert([1,3,5,6], 2))

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

// TODO：==========================================================
/* 1.     1
2.     11
3.     21
4.     1211
5.     111221 */
var no38_countAndSay = function(n) {
  let str = "1";
  for (let i = 2; i <= n; ++i) {
    const sb = [];
    let start = 0;
    let pos = 0;

    while (pos < str.length) {
        while (pos < str.length && str[pos] === str[start]) {
            pos++;
        }
        sb.push('' + (pos - start) + str[start]);
        start = pos;
    }
    str = sb.join('');
  }
  
  return str;
};

var no43_multiply = function(num1, num2) {
  let num1Len = num1.length;
  let num2Len = num2.length;
  let pos = new Array(num1Len + num2Len).fill(0)
  for(let i = num1Len -1 ; i >= 0; i--) {
    let n1 = +num1[i]
    for(let j = num2Len -1 ; j >= 0; j--) {
      let n2 = +num2[j]
      let multi = n1*n2
      let sum = pos[i + j + 1] + multi
      pos[i + j + 1] = sum % 10
      pos[i + j] += Math.floor(sum / 10);
    }
  }
  while (pos[0] == 0) {
    pos.shift();
  }
  return pos.length ? pos.join('') : '0';
};
console.log('no43_multiply', no43_multiply('456', '789'));

// TODO：❗️看了解析==========================================================
// 44. 通配符匹配
var no44_isMatch = function(s, p) {
  let m = s.length
  let n = p.length
  let dpArr = new Array(m + 1)
  for(let i = 0; i < m +1; i++) {
    dpArr[i] = new Array(n + 1).fill(false)
  }
  dpArr[0][0] = true
  for(let i = 1; i <= n; i++){
    dpArr[0][i] = dpArr[0][i - 1] && p.charAt(i - 1) == '*';
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
        if (s[i - 1] == p[j - 1] || p[j - 1] == '?') {
          dpArr[i][j] = dpArr[i - 1][j - 1]
        } else if (p[j - 1] == '*') {
          // dpArr[i - 1][j] 匹配空串，dpArr[i][j - 1]可以横向行驶
          dpArr[i][j] = dpArr[i][j - 1] || dpArr[i - 1][j]
        }
    }
  }
  return dpArr[m][n]
};
"aab"
"c*a*b"

// console.log('no44_isMatch', no44_isMatch("adcbeb", "a*b?b"));

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
    for(let i = begin; i <= n && (n + path.length - k) + 1; i ++) {
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

// TODO：==========================================================
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

// console.log('no39_combinationSum', no39_combinationSum(4, 4))
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
// 82. 删除排序链表中的重复元素 II
/* 
  输入：head = [1,2,3,3,4,4,5]
  输出：[1,2,5] 
*/

// 1.找整个递归的终止条件：递归应该在什么时候结束？
// 2.找返回值：应该给上一级返回什么信息？
// 3.本级递归应该做什么：在这一级递归中，应该完成什么任务？

// var no82_deleteDuplicates = function(head) {
//   if(!head || !head.next) {
//     return head;
//   }
//   let savePoint = new ListNode(0);
//   let res = savePoint;
//   let repetition;
//   while(head) {
//     if((head.next && (head.val === head.next.val)) || (head.val === repetition)) {
//       repetition = head.val;
//     } else {
//       savePoint.next = new ListNode(head.val);
//       savePoint = savePoint.next
//     }
//     head = head.next;
//   }
//   return res.next;
// };
// var no82_deleteDuplicates = function(head) {
//   if(!head || !head.next) {
//     return head;
//   }
//   let savePoint = head;
//   let repetition;
//   while(head) {
//     if((head.next && (head.val === head.next.val)) || (head.val === repetition)) {
//       repetition = head.val;
//     }
//     head.next = head.next.next;
//   }
//   return savePoint.next;
// };

// let test1 = makeList1([1,1,1,2,3,3,4,5,6])
// console.log('no82_deleteDuplicates', no82_deleteDuplicates(test1))


// TODO：✅==========================================================
/* 86. 分隔链表
给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5] */

var no86_partition = function(head, x) {

  if(!head || !head.next) return head
  let minList = new ListNode(0)
  let maxList = new ListNode(0)
  let copyRes = minList;
  let copyMax = maxList;

  while(head) {
    if(head.val < x) {
      minList.next = new ListNode(head.val)
      minList = minList.next
    } else {
      maxList.next = new ListNode(head.val)
      maxList = maxList.next
    }

    head = head.next
  }

  minList.next = copyMax.next
  return copyRes.next
};
let list_86 = makeList1([2,1])
// console.log('no86_partition',no86_partition(list_86, 4))

// TODO：✅==========================================================
//92. 反转链表 II
// 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
// 输入：head = [1,2,3,4,5], left = 2, right = 4
// 输出：[1,4,3,2,5]

var no92_reverseBetween = function(head, left, right) {
  if(!head || !head.next) return head

  let reverseList = new ListNode(0)
  let copyReverseList = reverseList
  let copyHead = head
  let newList = new ListNode(0)
  let res = newList
  let cnt = 1;
  while(head) {
    if(left <= cnt && cnt <= right) {
      reverseList.next = new ListNode(head.val)
      reverseList = reverseList.next
    }

    cnt++
    head = head.next
  }
  cnt = 1
  while(copyHead) {
    if(cnt < left){
      newList.next = new ListNode(copyHead.val) 
      newList = newList.next
    } else if(left === cnt) {
      newList.next = no206_reverse(copyReverseList.next) 
      newList = newList.next
    } else if (left < cnt && cnt <= right) {
      newList = newList.next
    } else if(cnt > right) {
      newList.next = new ListNode(copyHead.val) 
      newList = newList.next
    }

    cnt++
    copyHead = copyHead.next
  }

  return res.next
};
let list_92 = makeList1([1,2,3,4,5])
// console.log('no92_reverseBetween',no92_reverseBetween(list_92, 2, 4))

// TODO：==========================================================
// 93. 复原 IP 地址
// 输入：s = "101023"
// 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

var no93_restoreIpAddresses = function(s) {
  let path = []
  let finalRes = []

  function backtracking() {
    if(path.length === 4) {
      finalRes.push([...path])
    }

    for(let i = 0; i < s.length; i++) {

    }
  }

};
// console.log('no93_restoreIpAddresses',no93_restoreIpAddresses('101023'))

// TODO：✅==========================================================
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

// TODO：✅==========================================================
// 41. 缺失的第一个正数
/* 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。 
输入：nums = [1,2,0]
输出：3

输入：nums = [3,4,-1,1]
输出：2
*/

var no41_firstMissingPositive = function(nums) {
  let numsLen = nums.length;
  for(let i = 0; i < numsLen ; i++) {
    while(nums[i] < numsLen && nums[i] !==  nums[nums[i] - 1]  && nums[i] > 0) {
      swap(nums, i , nums[i] - 1);
    }
  }

  function swap(arr, indexOne, indexTwo) {
    let temp = arr[indexOne];
    arr[indexOne] = arr[indexTwo]
    arr[indexTwo] = temp;
  }
  for(let i = 0; i < numsLen ; i++) {
    if(i + 1 !== nums[i]) {
      return i+1;
    }
  }

  return nums[numsLen-1] + 1;
};

// console.log('no41_firstMissingPositive', no41_firstMissingPositive([1,1]))

// TODO：✅==========================================================
/* 42. 接雨水
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。 
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
*/

var no42_trap = function(height) {
  let sum = 0, max_left = new Array(height.length).fill(0), max_right = new Array(height.length).fill(0);
  //最两端的列不用考虑，因为一定不会有水。所以下标从 1 到 length - 2
  //找出左边最高
  for (let i = 1; i < height.length - 1; i++) {
    max_left[i] = Math.max(max_left[i - 1], height[i - 1]);
  }
  for (let i = height.length - 2; i >= 0; i--) {
    max_right[i] = Math.max(max_right[i + 1], height[i + 1]);
  }
  for ( i = 1; i < height.length - 1; i++) {
    //找出两端较小的
    min = Math.min(max_left[i], max_right[i]);
    //只有较小的一段大于当前列的高度才会有水，其他情况不会有水
    if (min > height[i]) {
        sum = sum + (min - height[i]);
    }
  }
  return sum;
};
// console.log('no42_trap', no42_trap([0,1,0,2,1,0,1,3,2,1,2,1]))


// TODO：==========================================================
/* 43. 字符串相乘
注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。
给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
输入: num1 = "2", num2 = "3"
输出: "6"
输入: num1 = "123", num2 = "456"
输出: "56088"
*/

var no43_multiply = function(num1, num2) {
  let sum = 0;

  return sum
};
// console.log('no43_multiply', no43_multiply("23", "3"))

// TODO：❗️==========================================================
/* 45. 跳跃游戏 II
给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
你的目标是使用最少的跳跃次数到达数组的最后一个位置。
假设你总是可以到达数组的最后一个位置。
 
示例 1:
输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
输入: nums = [2,3,0,1,4]
输出: 2
 */

var no45_jump = function(nums) {
  let cnt = 0;
  let maxDis = 0;
  let end = 0;
  for(let i = 0;i < nums.length - 1; i++) {
    maxDis = Math.max(maxDis, nums[i]+i)
    if(i === end) { // 走到最大距离需要跳跃了
      end = maxDis
      cnt++
    }
  }
  return cnt;
};

// console.log('no45_jump', no45_jump([1,2,3]))

// TODO：✅==========================================================
//48. 旋转图像
/* 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。
请不要 使用另一个矩阵来旋转图像。
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
 */

var no48_rotate = function(matrix) {
  let n = matrix.length;
  let mid = Math.floor(matrix.length / 2);
  for(let i = 0; i < mid; i++) {
    for(let j = i; j < n-1-i; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[n-j-1][i];  // 左下角覆盖左上角
      matrix[n-j-1][i] = matrix[n-i-1][n-j-1];  // 右下角盖左下角
      matrix[n-i-1][n-j-1] = matrix[j][n-i-1]; // 右上角盖右下角
      matrix[j][n-i-1] = temp
    }
  }
  return matrix
};
// console.log('no48', no48_rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]))
// console.log('no48', no48_rotate([[1,2,3],[4,5,6],[7,8,9]]))

// TODO：==========================================================
//49. 字母异位词分组
/* 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */

var no49_groupAnagrams = function(strs) {
  const map = new Map();
  for( let str of strs) {
    let array = [...str];
    array.sort();
    let key = array.join('');
    let list = map.get(key) ? map.get(key) : new Array;
    list.push(str);
    map.set(key, list)
  }
  return [...map.values()]
};

// console.log('no49_groupAnagrams', no49_groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
// console.log('no49_groupAnagrams', no49_groupAnagrams(["ddddddddddg","dgggggggggg"]))

// TODO： ✅==========================================================
//53. 最大子数组和
/* 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
子数组 是数组中的一个连续部分。
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 
 */

var no53_maxSubArray = function(nums) {
  let pre = 0;
  let res = nums[0]

  for(let i = 0; i < nums.length; i ++) {
    pre = Math.max(nums[i], pre+nums[i])
    res = Math.max(res, pre)
  }

  return res;
};

// console.log('no53_maxSubArray', no53_maxSubArray([-2,-1,-3,-4,-1,-2,-1,-5]))

//TODO：CV
// 54.螺旋矩阵
// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
/* 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5] */

var no54_spiralOrder = function(matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }

    const rows = matrix.length, columns = matrix[0].length;
    const order = [];
    let left = 0, right = columns - 1, top = 0, bottom = rows - 1;
    while (left <= right && top <= bottom) {
        for (let column = left; column <= right; column++) {
            order.push(matrix[top][column]);
        }
        for (let row = top + 1; row <= bottom; row++) {
            order.push(matrix[row][right]);
        }
        if (left < right && top < bottom) {
            for (let column = right - 1; column > left; column--) {
                order.push(matrix[bottom][column]);
            }
            for (let row = bottom; row > top; row--) {
                order.push(matrix[row][left]);
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
    }
    return order;

};

// console.log('no54_spiralOrder', no54_spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))

// TODO：✅==========================================================
/* 55. 跳跃游戏
给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个下标。 
输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标
*/
var no55_canJump = function(nums) {
  let maxDis = nums[0];
  let end = 0;
  let numsLen = nums.length;
  for(let i = 0;i < nums.length - 1; i++) {
    maxDis = Math.max(maxDis, nums[i] + i);
    if(i === end) {
      end = maxDis
    }
    if(end >= numsLen - 1) {
      return true
    }
  }

  return end >= numsLen - 1;
};
// console.log('no55_canJump', no55_canJump([2,3,1,1,4]))

// TODO：✅==========================================================
/* 56. 合并区间
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
示例 1：
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]. */
var no56_merge = function(intervals) {
  let i = 0;
  intervals = intervals.sort((a, b) => a[0]+a[1] - b[0]-b[1])
  while( i + 1 < intervals.length ) {
    let first = intervals[i]
    let second = intervals[i+1]
    if(second[0] > first[1]) {
      i++;
    } else {
      let temp = [...first, ...second]
      intervals[i] = [Math.min(...temp), Math.max(...temp)]
      intervals.splice(i+1,1);
      i = 0;
    }
  }
  return intervals;
};
// console.log('no56_merge', no56_merge([[1,4],[0,0]]))

// TODO：✅==========================================================
/* 57. 插入区间
给你一个 无重叠的 ，按照区间起始端点排序的区间列表。
在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
*/

var no57_insert = function(intervals, newInterval) {
  intervals = [...intervals, newInterval].sort((a, b) => a[0] - b[0])
  let i = 0;
  while( i + 1 < intervals.length ) {
    let first = intervals[i]
    let second = intervals[i+1]
    if(second[0] > first[1]) {
      i++;
    } else {
      let temp = [...first, ...second]
      intervals[i] = [Math.min(...temp), Math.max(...temp)]
      intervals.splice(i+1,1);
      i = 0;
    }
  }
  return intervals;
};
// console.log('no57_insert', no57_insert([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]))

// TODO：✅==========================================================
// 58. 最后一个单词的长度
var no58_lengthOfLastWord = function(s) {
  s = s.trim()
  let i = s.length - 1;
  let cnt = 0;
  while(s.charAt(i) !== ' ' && i >= 0) {
    cnt++;
    i--;
  }
  return cnt
};

// console.log('no58_lengthOfLastWord', no58_lengthOfLastWord("a"))

// TODO：✅==========================================================
// 59. 螺旋矩阵 II
/* 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]] */

var no59_generateMatrix = function(n) {
  let res = new Array(n);
  let num = 0;
  for(let i = 0; i < n; i++) {
    res[i] = new Array(n);
  }
  let [left, right, top, bottom] = [0, n-1, 0, n-1]

  while(left<=right && top <= bottom) {
    for(let i = left; i <= right; i++) {
      res[top][i] = ++num;
    }

    for(let i = top + 1; i <= bottom; i++) {
      res[i][right] = ++num;
    }

    for(let i = right - 1; i >= left; i--) {
      res[bottom][i] = ++num;
    }

    for(let i = bottom - 1; i >= top + 1; i--) {
      res[i][left] = ++num;
    }
    [left, right, top, bottom] = [left+1, right-1, top+1, bottom-1]
  }
  return res;
};

// console.log('no59_generateMatrix', no59_generateMatrix(5))

var no58_lengthOfLastWord = function(s) {
  s = s.trim()
  let i = s.length - 1;
  let cnt = 0;
  while(s.charAt(i) !== ' ' && i >= 0) {
    cnt++;
    i--;
  }
  return cnt
};

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
// TODO：==========================================================
/* 61. 旋转链表
给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]
*/
var no61_rotateRight = function(head, k) {
  
  if(!head || !head.next) {
    return head;
  }
  let n = 0;
  let res;
  let newHead = head
  
  while(newHead) {
    newHead = newHead.next;
    n ++;
  };

  k = n - k % n;

  let copyList = new ListNode(0);
  res = copyList;
  let tempHead = new ListNode(0);
  let temp = tempHead;
  while(head) {
    if(k > 0) {
      tempHead.next = new ListNode(head.val)
      tempHead = tempHead.next;
      k--;
    } else {
      copyList.next = head;
      copyList = copyList.next
    }
    head = head.next;
    n++;
  }
  copyList.next = temp.next;
  
  return res.next
};
let no61_list = makeList1([1,2,3,4,5])
// console.log('no61_rotateRight', no61_rotateRight(no61_list, 12))

//✅DP
var no62_uniquePaths = function(m, n) {
  const arr = new Array();
  for(let i = 0; i < m; i++) {
    arr[i] = new Array();
    for(let j = 0; j < n; j++) {
      if(i === 0) {
        arr[i][j] = 1;
      } else if(j === 0) {
        arr[i][j] = 1;
      } else {
        arr[i][j] = 0;
      }
    }
  }


  for(let i = 1; i < m; i++) {
      for(let j = 1; j < n; j++) {
          arr[i][j] = arr[i-1][j] + arr[i][j-1];
      }
  }
  return arr[m-1][n-1]
};
// console.log('no63_uniquePathsWithObstacles--2', no62_uniquePaths(3,3))

// TODO：✅DP==========================================================
//63. 不同路径 II
//那么从左上角到右下角将会有多少条不同的路径？

/* for (int i = 0; i < m && obstacleGrid[i][0] == 0; i++) {
  dp[i][0] = 1;
}
for (int j = 0; j < n && obstacleGrid[0][j] == 0; j++) {
  dp[0][j] = 1;
}

for (int i = 1; i < m; i++) {
  for (int j = 1; j < n; j++) {
      if (obstacleGrid[i][j] == 0) {
          dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
  }
} */


var no63_uniquePathsWithObstacles = function(obstacleGrid) {
  let r = obstacleGrid.length, c = obstacleGrid[0].length;
  let dp = new Array(r);

  for (let i = 0; i < r; i++) {
    dp[i] = new Array(c).fill(0)
  }

  for (let i = 0; i < r && obstacleGrid[i][0] == 0; i++) {
    dp[i][0] = 1;
  }

  for (let j = 0; j < c && obstacleGrid[0][j] == 0; j++) {
    dp[0][j] = 1;
  }

  for(let i = 1; i < r; i++) {
    for(let j = 1; j < c; j++) {
      dp[i][j] = obstacleGrid[i][j] ? 0 : (dp[i-1][j] + dp[i][j-1]);
    }
  }
  return dp[r-1][c-1]
};

// console.log('no63_uniquePathsWithObstacles--2', no63_uniquePathsWithObstacles([[0,1,0,0,0],[1,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
//   ))


// TODO：✅==========================================================
//66. 数组加一
var no66_plusOne = function(digits) {
  let i = digits.length - 1;
  while(i >= 0) {
    if(digits[i] + 1 < 10) {
      digits[i] = digits[i] + 1
      return digits
    } else {
      digits[i] = 0;
      i--;
    }
  }
  return [1, ...digits]
};

// console.log('no66_plusOne', no66_plusOne([1,9,9,9,9]))
// TODO：✅==========================================================
//67. 二进制求和
/* 给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和。
输入：a = "1010", b = "1011"
输出："10101" */

var no67_addBinary = function(a, b) {
  let i = a.length - 1, j = b.length - 1
  let res = ''
  let shouAdd = 0;
  while(i >= 0 || j >=0) {
    let num1 = i >=0 ? Number(a.charAt(i)) : 0;
    let num2 = j >=0 ? Number(b.charAt(j)) : 0;
    let curRes = num1 + num2 + shouAdd;
    if(curRes > 1) {
      res = (curRes === 2 ? '0' : '1') + res
      shouAdd = 1
    } else {
      res = curRes + res
      shouAdd = 0
    }

    if(j >= 0) {
      j --
    }
    if(i >= 0) {
      i --
    }
  }

  return shouAdd ? shouAdd + res :res;
};

// console.log('no67_addBinary', no67_addBinary('11', '1111'))

// TODO：✅==========================================================
/* 69. x 的平方根 
给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
输入：x = 8
输出：2
解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。 */

var no69_mySqrt = function(x) {
  let n = 1;
  while( n*n < x) {
    n++;
  } 
  return n*n === x ? n : n-1;
};
// console.log('no69_mySqrt', no69_mySqrt(100))

// TODO：==========================================================
// 73. 矩阵置零
/* 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]] */
var no73_setZeroes = function(matrix) {
  let m = matrix.length;
  let n = matrix[0].length;
  let zero = new Array();
  for(let i = 0; i < m; i++) {
    for(let j = 0; j < n; j++) {
      if(matrix[i][j] === 0) {
        zero.push([i, j])
      }
    }
  }

  if(zero.length === 0) {
    return matrix
  }
  
  for(let i in zero) {
    let [row, col] = zero[i]

    for(let i = 0; i < m; i++) {
      matrix[i][col] = 0;
    }
    for(let j = 0; j < n; j++) {
      matrix[row][j] = 0;
    }
  }
  return matrix
};
// console.log('no73_setZeroes', no73_setZeroes([[0,1,4,3],[3,0,5,2],[1,3,1,5], [1,1,1,1]]))

// TODO：✅==========================================================
//74. 搜索二维矩阵
/* 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

每行中的整数从左到右按升序排列。
每行的第一个整数大于前一行的最后一个整数。

输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true */


var no74_searchMatrix = function(matrix, target) {
  let m = matrix.length;
  let n = matrix[0].length;
  let i = 0
  for(i; i < m; i ++) {
    if(matrix[i][0] > target) {
      break
    }
    if(matrix[i][0] === target) {
      return true
    }
  }
  i -= 1
  if(i < 0) return false

  for(let j = 0; j < n; j++) {
    if(matrix[i][j] === target) return true
  }
  return false
};

// console.log('no74_searchMatrix', no74_searchMatrix([[1]], 0))

// TODO：❗️==========================================================
// 始终以斜杠 '/' 开头。
// 两个目录名之间必须只有一个斜杠 '/' 。
// 最后一个目录名（如果存在）不能 以 '/' 结尾。
// 此外，路径仅包含从根目录到目标文件或目录的路径上的目录（即，不含 '.' 或 '..'）。

// 输入：path = "/a/./b/../../c/"
// 输出："/c"

var no71_simplifyPath = function(path) {
  const names = path.split("/");
  const stack = [];
  for (const name of names) {
      if (name === "..") {
          if (stack.length) {
              stack.pop();
          } 
      } else if (name.length && name !== ".") {
          stack.push(name);
      }
  }
  
  return "/" + stack.join("/");

};

console.log('no71_simplifyPath', no71_simplifyPath( "/a/./b/../../c/"))

// TODO：❗️==========================================================
// 75. 颜色分类
/* 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2] */

function swap(nums, index1, index2) {
  let t = nums[index1]
  nums[index1] = nums[index2]
  nums[index2] = t
}

var no75_sortColors = function(nums) {
  let len = nums.length;
  if (len < 2) {
      return;
  }

  let zero = 0;
  let two = len;
  let i = 0;
  while (i < two) {
      if (nums[i] == 0) {
          swap(nums, i, zero);
          zero++;
          i++;
      } else if (nums[i] == 1) {
          i++;
      } else {
          two--;
          swap(nums, i, two);
      }
  }
};

// console.log('no75_sortColors', no75_sortColors([2,0,2,1,1,0]))

// TODO：✅==========================================================
// 50. Pow(x, n)
// 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。
var no50_myPow = function(x, n) {
  if(n === 0 || n === 1) {
    return n === 0 ? 1 : x;
  } else if(n < 0) {
    return no50_myPow(1/x, Math.abs(n));
  } else {
    return n % 2 === 0 ? no50_myPow(x*x, n/2) : x*no50_myPow(x*x, Math.floor(n/2));
  }
};
// var myPow = function(x, n) {
//   if(n ===0 || n ===1) {
//       return n ===0 ? 1: x
//   }else if(n < 0){
//       return myPow(1/x, Math.abs(n))
//   }else{
//       return n % 2 === 0 ? myPow(x * x , n/2) :  x*myPow(x * x ,Math.floor(n/2))
//   }
// };

// console.log('no50_myPow', no50_myPow(2, 5))

// TODO：✅==========================================================
// 83. 删除排序链表中的重复元素

var no83_deleteDuplicates = function(head) {
  if(!head || !head.next) {
    return head;
  }
  
  head.next = no83_deleteDuplicates(head.next);
  if(head.val === head.next.val) {
    head.next = head.next.next
  }
  return head
};


// TODO：==========================================================
// 234. 回文链表
// 输入：head = [1,2,2,1]
// 输出：true


var no234_isPalindrome = function(head) {
  let left = head

  function traverse(right) {
    if(!right) return true
    let res = traverse(right.next)
    // 后序遍历
    res = res && (right.val == left.val)
    left = left.next
    
    return res
  }

  return traverse(head)
};

function no234_isPalindrome2( head) {
  let slow, fast;
  slow = fast = head;
  while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
  }
  
  if (fast != null) slow = slow.next;
  
  function reverse(head) {
    let pre = null, cur = head;
    while (cur != null) {
      let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
  }
  let left = head;
  let right = reverse(slow);
  while (right != null) {
      if (left.val != right.val)
          return false;
      left = left.next;
      right = right.next;
  }
  
  return true;
}

// TODO：✅==========================================================
// 283. 移动零
// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]

var no283_moveZeroes = function(nums) {
  let slow = 0, fast = 0;
  while(fast < nums.length) {
    if(nums[fast] !== 0) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  for(; slow < nums.length; slow++) {
    nums[slow] = 0
  }

  return nums
};
// console.log('no283_moveZeroes', no283_moveZeroes([0,1,0,3,12]))


var no83_deleteDuplicates = function(head) {
  if(!head || !head.next) {
    return head;
  }
  
  head.next = no83_deleteDuplicates(head.next);
  if(head.val === head.next.val) {
    head.next = head.next.next
  }
  return head
};

/* var no83_deleteDuplicates = function(head) {
  if(!head || !head.next) {
    return head;
  }

  let res = head;
  
  while(head) {
    if(head.next && head.val === head.next.val) {
      head.next = head.next.next
    } else {
      head = head.next
    }
  }

  return res;
}; */
// let test1 = makeList1([1,1,1,2,3,3,4,5,6])
// console.log('no83_deleteDuplicates', no83_deleteDuplicates(test1))

var findSubstring = function(s, words) {
  let wordsMap = new Map()
  let wordsLen = words[0].length;
  let wordSum = words.length*wordsLen
  let finalRes = []
  for(let i in words) {
    wordsMap.set(words[i], wordsMap.has(words[i]) ? wordsMap.get(words[i])+1 : 1)
  }

  for(let i = 0; i < s.length - wordSum + 1; i ++) {
    let cnt = 0;
    let begin = i;
    let subMap = new Map()
    while(cnt !== words.length) {
      let subStr = s.slice(begin, begin+wordsLen)
      if(wordsMap.get(subStr) && (subMap.get(subStr) < wordsMap.get(subStr) || !subMap.get(subStr))) {
        subMap.set(subStr, (subMap.has(subStr) ? (subMap.get(subStr) + 1) : 1))
        begin+=wordsLen
        cnt+=1
      } else {
        break
      }
    }
    if(cnt === words.length) {
      finalRes.push(i)
    }
  }

  return finalRes
};

// console.log('findSubstring', findSubstring("aaabaaaab", ["a","a","a","b"]))

// TODO：==========================================================
/* 79. 单词搜索
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true */

var no79_exist = function(board, word) {
  let m = board.length;
  let n = board[0].length;
  let path = ''
  let wordStart= 0
  let used = new Array(m)

  for(let i = 0; i < n; i++) {
    used[i] = new Array(n)
  }

  function backtracing() {
    for(let i = 0; i < m; i++) {
      for(let j = 0; j < n; j++) {
        if(path === word) {
          return true
        }
        if(word[wordStart] === board[i][j] && !used[i][j]) {
          path += board[i][j]
          used[i][j] = true
        }
        backtracing()
        used[i][j] = false
        path = path.slice(0, -1)
      }
    }
  }

  backtracing()
  
  return false
};

// TODO：✅==========================================================
// 80. 删除有序数组中的重复项 II
/* 输入：nums = [0,0,1,1,1,1,2,3,3]
输出：7, nums = [0,0,1,1,2,3,3]
解释：函数应返回新长度 length = 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3 。
 不需要考虑数组中超出新长度后面的元素。 */

var no80_removeDuplicates = function(nums) {
  let cnt = 0
  for(let i = 0; i < nums.length; i++){
    if(i > 1 && nums[i] === nums[i-1]) {
      continue
    }
    if(nums[i] !== nums[i+1]) {
      nums[cnt] = nums[i]
      cnt++
      continue
    }
    if(nums[i] === nums[i+1]) {
      nums[cnt] = nums[i]
      nums[cnt+1] = nums[i+1]
      cnt+=2
      i++
      continue
    }
  }
  return cnt;
};

// console.log('no80_removeDuplicates', no80_removeDuplicates([0,0,1,1,1,1,2,3,3]));
// TODO：✅==========================================================
// 88. 合并两个有序数组
var no88_merge = function(nums1, m, nums2, n) {
  let i = nums1.length ;

  while (n > 0) {
    if (m > 0 && nums1[m-1] > nums2[n-1]) {
      nums1[--i] = nums1[--m]; 
    }else{
      nums1[--i] = nums2[--n]; 
    }
  }
};

// no88_merge([4,5,6,0,0,0],3,[1,2,3],3)

// TODO：==========================================================
// 167. 两数之和 II - 输入有序数组
// 给你一个下标从 1 开始的整数数组，该数组已按 非递减顺序排列
var no167_twoSum = function(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while(left < right) {
    let sum = numbers[left] + numbers[right];
    if (sum == target) {
      // 题目要求的索引是从 1 开始的
      return [left + 1, right + 1];
    } else if (sum < target) {
        left++; 
    } else if (sum > target) {
        right--; 
    }
  }
  return [-1,-1]
};

// 344. 反转字符串
// 输入：s = ["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]
var no344_reverseString = function(s) {
  let left = 0, right = s.length - 1;
  while(left < right) {
    let temp = s[left]
    s[left] = s[right]
    s[right] = temp
    left++
    right--
  }
  return s
};

// console.log('no167_twoSum', no344_reverseString(["h","e","l","l","o"]))
{
  // 前缀和数组
  let preSum;

  /* 输入一个数组，构造前缀和 */
  function NumArray(nums) {
      preSum = new Array(nums.length + 1);
      for (let i = 1; i < preSum.length; i++) {
          preSum[i] = preSum[i - 1] + nums[i - 1];
      }
  }
  
  /* 查询闭区间 [left, right] 的累加和 */
  function sumRange(left, right) {
      return preSum[right + 1] - preSum[left];
  }
}


// 304. 二维区域和检索 - 矩阵不可变
{
    // 定义：preSum[i][j] 记录 matrix 中子矩阵 [0, 0, i-1, j-1] 的元素和
    let preSum;
    
    function NumMatrix(matrix) {
      let m = matrix.length, n = matrix[0].length;
        if (m == 0 || n == 0) return;
        // 构造前缀和矩阵
        preSum = new Array(m + 1)
        for (let i = 0; i <= m + 1; i++) {
          preSum[i] = new Array(n + 1).fill(0)
        }
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                // 计算每个矩阵 [0, 0, i, j] 的元素和
                preSum[i][j] = preSum[i-1][j] + preSum[i][j-1] + matrix[i - 1][j - 1] - preSum[i-1][j-1];
            }
        }
    }
    
    // 计算子矩阵 [x1, y1, x2, y2] 的元素和
    function sumRegion( x1,  y1,  x2,  y2) {
        // 目标矩阵之和由四个相邻矩阵运算获得
        return preSum[x2+1][y2+1] - preSum[x1][y2+1] - preSum[x2+1][y1] + preSum[x1][y1];
    }
}

// 370. 区间加法
// 输入: length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]] [startIndex, endIndex, inc]
// 输出: [-2,0,3,5,3]

var no370_getModifiedArray = function(length, updates) {
  let nums = new Array(length).fill(0)
  let diff = nums


  // 差分法基本方法 -->
  function difference(nums) {
    for(let i = 1; i < length; i++) {
      diff[i] = diff[i] - diff[i-1]
    }
  }

  function increment(i, j, val) {
    diff[i] += val
    j+1 < length && (diff[j+1] -= val)
  }

  function returnRes() {
    let res = [diff[0]]
    for(let i = 1; i < length; i++ ) {
      res[i] = res[i-1] + diff[i]
    }
    return res
  }
  // <-- 差分法基本方法 

  difference(nums)
  for(let [i, j ,val] of updates) {
    increment(i, j, val)
  }

  return returnRes()
};

// console.log('no370_getModifiedArray', no370_getModifiedArray(5, [[1,3,2],[2,4,3],[0,2,-2]]))