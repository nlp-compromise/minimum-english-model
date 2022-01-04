import arr from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'

import { learn, convert, compress, uncompress, reverse, validate } from '/Users/spencer/mountain/suffix-thumb/src/index.js'


let pairs = validate(arr)//allow right-side dupes
let model = learn(pairs)
model = compress(model)
model = uncompress(model)
pairs.forEach((a) => {
  let out = convert(a[0], model)
  if (out !== a[1]) {
    console.log(`[ '${a[0]}' -> '${out}'`)
  }
})
// reverse bug:
let rev = reverse(model)
console.log(rev.rules.y)
console.log(convert('buy', rev))