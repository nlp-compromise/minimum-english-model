import { learn, convert, compress, uncompress } from '/Users/spencer/mountain/suffix-thumb/src/index.js'
import fileSize from './fileSize.js'

import JJR from '../pairs/JJR.js'
import JJS from '../pairs/JJS.js'
import RBR from '../pairs/RBR.js'
import VBD from '../pairs/VBD.js'
import VBG from '../pairs/VBG.js'
import VBN from '../pairs/VBN.js'
import VBZ from '../pairs/VBZ.js'

const allRules = (model) => {
  let arr = []
  Object.keys(model.rules).forEach(k => {
    arr = arr.concat(model.rules[k])
  })
  return arr
}

const compute = function (wordPairs, tag) {

  let arr = Object.entries(wordPairs)
  let model = learn(arr)
  console.log(`\n\n======${tag}`)
  console.log('  ', arr.length, `words ${fileSize(JSON.stringify(wordPairs))}`)
  console.log('  ', allRules(model).length, 'rules', Object.keys(model.exceptions).length, 'exceptions')
  model = compress(model)
  // console.log(model)
  // console.log(model.rules)
  let res = JSON.stringify(model)
  // console.log(res)
  console.log(fileSize(res))
}


compute(JJR, 'JJR')
compute(JJS, 'JJS')
compute(RBR, 'RBR')
compute(VBD, 'VBD')
compute(VBG, 'VBG')
compute(VBN, 'VBN')
compute(VBZ, 'VBZ')
