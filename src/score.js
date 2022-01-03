import { learn, convert, compress, uncompress } from '/Users/spencer/mountain/suffix-thumb/src/index.js'
import fileSize from './fileSize.js'

import JJR from '../pairs/JJR.js'
import JJS from '../pairs/JJS.js'
import RB from '../pairs/RB.js'
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

const growth = (from, to) => {
  from = Number(from.replace(/kb/, ''))
  to = Number(to.replace(/kb/, ''))
  let percent = (to / from - 1) * 100
  return Math.round(percent)
}

let nums = []

const compute = function (wordPairs, tag) {
  let orig = fileSize(JSON.stringify(wordPairs))
  let arr = wordPairs//Object.entries(wordPairs)
  let model = learn(arr, { inverse: false })
  console.log(`\n\n======${tag}`)
  console.log('  ', arr.length.toLocaleString(), `words @ ${orig}`)
  console.log('   → ', allRules(model).length, 'rules,', Object.keys(model.exceptions).length, 'exceptions')
  model = compress(model)
  let res = JSON.stringify(model)
  let change = growth(orig, fileSize(res))
  console.log(fileSize(res), `   ${change}%`)
  nums.push(change)
}


compute(JJR, 'JJR')
compute(JJS, 'JJS')
compute(RB, 'RB')
compute(VBD, 'VBD')
compute(VBG, 'VBG')
compute(VBN, 'VBN')
compute(VBZ, 'VBZ')
let avg = nums.reduce((h, n) => h + n, 0) / nums.length
const round = n => Math.round(n * 10) / 10
console.log('\n\n', round(avg))
