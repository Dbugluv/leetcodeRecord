
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

// TODO：❓==========================================================
/* 22. 括号生成
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
*/

var no22_generateParenthesis = function(n) {
    if (n == 0) return [];

    let data = new Map();
    data.set(0, ['']);
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

    for (let i = 1; i <= n; i++) {
      let result = [];
      for (let j = 0; j <= i - 1; j++) {
        let center = data.get(j);
        let right = data.get(i - 1 - j);
        console.log('center', center, 'tight', right)
        for (let k = 0; k < center.length; k++) {
          for (let t = 0; t < right.length; t++) {
            console.log('${center[k]})$', center[k],'{right[t]}', right[t])
            result.push(`(${center[k]})${right[t]}`);
          }
        }
      }
      data.set(i, result);
    }
    return data.get(n);
};

// console.log('no22_generateParenthesis', no22_generateParenthesis(3))


// TODO：✅==========================================================
// 执行用时：88 ms, 在所有 JavaScript 提交中击败了72.35%的用户
// 内存消耗：46 MB, 在所有 JavaScript 提交中击败了75.00%的用户

// 给你一个链表数组，每个链表都已经按升序排列。
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
    console.log('head--', head)
    return head;
  }

  let temp = head.next;
  head.next = no24_swapPairs(head.next.next);  // 交换下一组， temp.next === head.next.next
  console.log('head', head)
  temp.next = head;
  console.log('temp', temp)
  return temp
};

// let test1 = makeList1([1, 2, 3, 4])
// console.log('no24_swapPairs', no24_swapPairs(test1))

// TODO：✅==========================================================
// 206. 反转链表
// 递归效率低
var no206_reverse = (head) => {
  if(head == null || head.next == null){
    return head;
  }
  let newList = reverse(head.next);
  head.next.next = head;
  head.next = null;

  return newList;
}

// TODO：==========================================================
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
  let cnt = 1;
  let cur = head, fast = head.next;
  let newList = head;
  while(fast !== null) {
    for(let i = 0; i < k; i++) {
      
    }
  }
};

let no25 = makeList1([1,2,3,4,5])


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


var no82_deleteDuplicates = function(head) {
  if(!head || !head.next) {
    return head;
  }
  let savePoint = head;
  let repetition;
  while(head) {
    if((head.next && (head.val === head.next.val)) || (head.val === repetition)) {
      repetition = head.val;
    }
    head.next = head.next.next;
  }
  return savePoint.next;
};

// let test1 = makeList1([1,1,1,2,3,3,4,5,6])
// console.log('no82_deleteDuplicates', no82_deleteDuplicates(test1))


// TODO：==========================================================
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