import arr from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'

let have = {}
arr.forEach(a => {
  if (have[a[1]]) {
    console.log(a[0])
    return
  }
  have[a[1]] = true

})