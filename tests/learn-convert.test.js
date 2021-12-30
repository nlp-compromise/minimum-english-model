import test from 'tape'
import { learn, convert, compress, uncompress, validate } from '/Users/spencer/mountain/suffix-thumb/src/index.js'

import JJR from '../pairs/JJR.js'
import JJS from '../pairs/JJS.js'
import RBR from '../pairs/RBR.js'
import VBD from '../pairs/VBD.js'
import VBG from '../pairs/VBG.js'
import VBN from '../pairs/VBN.js'
import VBZ from '../pairs/VBZ.js'

let all = [
  [JJR, 'JJR'],
  [JJS, 'JJS'],
  [RBR, 'RBR'],
  [VBD, 'VBD'],
  [VBG, 'VBG'],
  [VBN, 'VBN'],
  [VBZ, 'VBZ']
]

test('test:', function (t) {
  all.forEach(a => {
    let [words, name] = a
    let pairs = Object.entries(words)
    pairs = validate(pairs)
    let model = learn(pairs)

    pairs.forEach((a) => {
      let out = convert(a[0], model)
      t.equal(out, a[1], `[${name}] '${a[0]}' -> '${out}'`)
    })
  })
  t.end()
})

