
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
  console.log('max', max)
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


  console.log('res,', res)
  return res;
};

// RomanToInt('CXLVIII')

// TODO：✅==========================================================
// 14 最长公共前缀
var longestCommonPrefix = function(strs) {
  let res = '';
  let i ,j = 0;
  let minStr = strs[0]
  // console.log('minStr', minStr, 'strsi')

  for(i = 0; i < minStr.length; i++) {
    let flag = true;
    for( j = 0; j < strs.length - 1; j++ ) {
      // console.log('minStr.charAt(j)', minStr.charAt(i), 'strs[j+1].charAt(i)', strs[j+1].charAt(i) )
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

// TODO：==========================================================

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
  console.log('res', res, 'dis', dis)
  for(let i = 0; i < numLen - 1 ; i++) {
    let L = i+1, R = numLen - 1;
    while(L < R) {
      res = nums[L] + nums[R] + nums[i];
      if(Math.abs(res - target) < dis) {  // 更新
        min = res;
        dis = Math.abs(target - res);
        console.log('min', min, 'dis', dis)
      } else if (res === target) {  // find!
        return res;
      }

      // console.log('res0---', res, 'dis', dis, 'i', nums[i], 'L', nums[L], 'R', nums[R], )
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

console.log('threeSumClosest', threeSumClosest([833,736,953,-584,-448,207,128,-445,126,248,871,860,333,-899,463,488,-50,-331,903,575,265,162,-733,648,678,549,579,-172,-897,562,-503,-508,858,259,-347,-162,-505,-694,300,-40,-147,383,-221,-28,-699,36,-229,960,317,-585,879,406,2,409,-393,-934,67,71,-312,787,161,514,865,60,555,843,-725,-966,-352,862,821,803,-835,-635,476,-704,-78,393,212,767,-833,543,923,-993,274,-839,389,447,741,999,-87,599,-349,-515,-553,-14,-421,-294,-204,-713,497,168,337,-345,-948,145,625,901,34,-306,-546,-536,332,-467,-729,229,-170,-915,407,450,159,-385,163,-420,58,869,308,-494,367,-33,205,-823,-869,478,-238,-375,352,113,-741,-970,-990,802,-173,-977,464,-801,-408,-77,694,-58,-796,-599,-918,643,-651,-555,864,-274,534,211,-910,815,-102,24,-461,-146], -7111))