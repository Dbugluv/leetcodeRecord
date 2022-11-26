//与jQuery.extend方法，可用于浅拷贝，深拷贝
/* avalon.mix = avalon.fn.mix = function() {
  var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false

  // 如果第一个参数为布尔,判定是否深拷贝
  if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
      i++
  }

  //确保接受方为一个复杂的数据类型
  if (typeof target !== 'object' && typeof target !== 'function') {
      target = {}
  }

  //如果只有一个参数，那么新成员添加于mix所在的对象上
  if (i === length) {
      target = this
      i--
  }

  for (; i < length; i++) {
      //只处理非空参数
      if ((options = arguments[i]) != null) {
          for (name in options) {
              src = target[name]
              copy = options[name]

              // 防止环引用
              if (target === copy) {
                  continue
              }
              if (deep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

                  if (copyIsArray) {
                      copyIsArray = false
                      clone = src && Array.isArray(src) ? src : []

                  } else {
                      clone = src && avalon.isPlainObject(src) ? src : {}
                  }

                  target[name] = avalon.mix(deep, clone, copy)
              } else if (copy !== void 0) {
                  target[name] = copy
              }
          }
      }
  }
  return target
} */

function repeat(target, n) {
  return Array.prototype.join.call({
    length: n+1
  }, target)
}

// var repeat = (function() {
//   let obj = {}, join = Array.prototype.join;
//   console.log('obj', obj)

//   return function(target, n) {
//     console.log('obj---', obj)
//     obj.length = n;
//     return join.call(obj, target)
//   }
// })()

// console.log('rrr', repeat("rubu", 3))

function camelize(target) {
  return target.replace(/[-_][^-_]/g, function(match) {
    console.log('math', match)
    return match.charAt(1).toUpperCase();
  })
}

console.log('camelize', camelize('s-a-ds-fd'))