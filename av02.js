var array1 = [12, 34, 56, 12, 67]
var array2 = ['js', 'java', 'c#', 'python']

function contains(array, item) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) return true    
  }
  return false
}

// Todas as funções devem ser implementadas sem efeitos colaterais, isto é,
// elas não devem modificar o array de entrada (não são in-place).

function first(array, range=1) {
  if (array.length === 0) {
    return []
  }
  else if (range > 1) {
    var final = new Array(range) 
    for (let i = 0; i < range; i++) {
      final[i] = array[i]
    }
    return final
  }
  return array[0]
}

function last(array, range=1) {
  if (range > 1) {
    var final = new Array(range) 
    for (let i = 0; i < range; i++) {
      final[i] = array[i + array.length - range]      
    }
    return final
  }

  return array[array.length-1]
}

function tail(array) {
  if (array.length === 0) {
    return []
  }
  var final = new Array(array.length - 1) 
  for (let i = 1; i < array.length; i++) {
    final[i-1] = array[i]    
  }
  return final
}

function without(array, num) {
  var final = []
  var parse = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] === num) {
      continue
    }
    final.push(array[i])
  }
  return final
}

function union(...arrays) {
  var final = []
  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      final.push(arrays[i][j])
    }
  }
  return final
}

function unique(array) {
  var final = []
  for (let i = 0; i < array.length; i++) {
    if (contains(final, array[i])) {
      continue
    } else {
      final.push(array[i])
    } 
  }
  return final
}

function intersection(arg1, arg2) {
  var final = []
  for (let i = 0; i < arg1.length; i++) {
    if (contains(arg2, arg1[i]) && contains(final, arg1[i]) == false)
      final.push(arg1[i])
  }
  return final
}

function difference(arg1, arg2) {
  var final = []
  for (let i = 0; i < arg1.length; i++) {
    if (contains(arg2, arg1[i]) == false) final.push(arg1[i])    
  }
  if (arg2.length === 0) return final

  for (let i = 0; i < arg2.length; i++) {
    if (contains(arg1, arg2[i]) == false) final.push(arg2[i])    
  }
  return final
}

function zip(...arrays) {
  var final = [];
  var max = Math.max(...arrays.map(arr => arr.length));
  for (let i = 0; i < max; i++) {
    var inzip = [];
    for (const arr of arrays) inzip.push(arr[i]);
    final.push(inzip);
  }
  return final;
}

function compact(array) {
  var final = []
  for (let i = 0; i < array.length; i++) {
    if (array[i] != null && array[i] != undefined && !(isNaN(array[i])))
      final.push(array[i])
  }
  return final
}

function flatten(array) {
  var final = []
    
  function inflatten(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        inflatten(arr[i])
      } else {
        final.push(arr[i])
      }
    }
  }

  inflatten(array)
  return final
}

function equals(array1, array2) {
  if (array1.length !== array2.length) return false
  for (let i = 0; i < array1.length; i++) {
    if (Array.isArray(array1) && Array.isArray(array2)) {
      if (equals(array1[i], array2[i]) === false) return false
    } else if (array1[i] !== array2[i]) return false
  }
  return true
}

console.log(first(array1)) // 12
console.log(first(array1, 3)) // [12, 34, 56]
console.log(first([], 3)) // []

console.log(last(array1)) // 67
console.log(last(array1, 3)) // [56, 12, 67]

console.log(tail(array1)) // [34, 56, 12, 67]
console.log(tail([])) // []

console.log(without(array1, 34)) // [12, 56, 12, 67]
console.log(without(array1, 12)) // [34, 56, 67]

console.log(union(array1, array2)) // [12, 34, 56, 67, 'js', 'java', 'c#', 'python']
console.log(union(array1, array2, [89, 34, 'ruby', 'js'])) // [12, 34, 56, 67, 'js', 'java', 'c#', 'python', 89, 'ruby']

console.log(unique(array1)) // [12, 34, 56, 67]
console.log(unique(['a', 'a', 'a'])) // []
console.log(unique(['a', 'b', 'a', 'b'])) // ['a', 'b']

console.log(intersection(['a', 4, 'c', 8], [8, 'b', 'c', 34])) // ['c', 8]
console.log(intersection([8, 'a', 4, 'c', 8], [8, 'b', 'c', 34])) // [8, 'c']

console.log(difference(['a', 4, 'c', 8], [8, 'b', 'c', 34])) // ['a', 4, 'b', 34]
console.log(difference([], array1)) // []
console.log(difference(array1, [])) // [12, 34, 56, 12, 67]
console.log(difference(array1, array2)) // [12, 34, 56, 12, 67]
console.log(difference(array1, [56, 67])) // [12, 34, 12]

console.log(zip([12, 45], [67, 90])) // [[12, 67], [45, 90]]
console.log(zip(array2, [67, 90, 52, 56])) // [['js', 67], ['java', 90], ['c#', 52], ['python', 56]]
console.log(zip(array1, [67, 90, 52, 56], ['brendan eich', 'james gosling', 'anders hejlsberg', 'guido van rossum']))
// [['js', 67, 'brendan eich'], ['java', 90, 'james gosling'], ['c#', 52, 'anders hejlsberg'], ['python', 56, 'guido van rossum']]
console.log(zip([12, 45, 89], [67, 90])) // [[12, 67], [45, 90], [89, undefined]]
console.log(zip([12, 45])) // [[12], [45]]

console.log(compact([45, 23])) // [45, 23]
console.log(compact([45, 23, null])) // [45, 23]
console.log(compact([NaN, 23, null, 12])) // [23, 12]
console.log(compact([NaN, 23, null, 12, undefined, 78])) // [23, 12, 78]
console.log(compact([NaN, 23, null, 12, undefined, 78, 0, false, ''])) // [23, 12, 78, 0, false, '']
console.log(compact(array1)) // [12, 34, 56, 12, 67]

var depth = 2 // profundidade
var nested = [34, 54, [45, 23, [78, 90, [65]]], 12]
console.log(flatten([34, 54, [45, 23], 12])) // [34, 54, 45, 23, 12]
console.log(flatten([34, 54, [45, 23], 12, [78, 90]])) // [34, 54, 45, 23, 12, 78, 90]
console.log(flatten([34, 54, [45, 23, [78, 90]], 12])) // [34, 54, 45, 23, [78, 90], 12]
console.log(flatten([34, 54, [45, 23, [78, 90]], 12], depth)) // [34, 54, 45, 23, 78, 90, 12]
console.log(flatten(nested, depth)) // [34, 54, 45, 23, 78, 90, [65], 12]
console.log(flatten(nested, 3)) // [34, 54, 45, 23, 78, 90, 65, 12]
console.log(flatten(array1)) // [12, 34, 56, 12, 67]

console.log(equals([1, 2, 3], [1, 2, 3])) // true
console.log(equals([1, 2, 3], [1, 3, 2])) // false
console.log(equals(array1, array2)) // false
console.log(equals([1, [2, 3], 4], [1, [2, 3], 4])) // true
console.log(equals([1, [2, 3], 4], [1, [3, 2], 4])) // false
console.log(equals(nested, nested)) // true
console.log(equals(nested, [34, 54, [45, 23, [78, 90, [65]]], 12])) // true
console.log(equals([34, 54, [45, 23, [78, 90, [65]]], 12], nested)) // true

console.log(array1) // [12, 34, 56, 12, 67]
console.log(array2) // ['js', 'java', 'c#', 'python']
