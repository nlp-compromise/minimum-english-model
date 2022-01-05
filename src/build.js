import { learn } from '/Users/spencer/mountain/suffix-thumb/src/index.js'
import fs from 'fs'

import NNS from '../pairs/NNS.js'
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

let nums = []

const compute = function (wordPairs, tag) {
  let arr = wordPairs//Object.entries(wordPairs)
  let model = learn(arr)
  console.log(`\n\n======${tag}`)
  console.log('  ', arr.length.toLocaleString(), `words `)
  console.log('   → ', allRules(model).length, 'rules,', Object.keys(model.exceptions).length, 'exceptions')
  let res = JSON.stringify(model, null, 2)
  fs.writeFileSync(`./model/${tag}.js`, 'export default ' + res)
}


compute(NNS, 'Plural')
compute(JJR, 'Comparative')
compute(JJS, 'Superlative')
compute(RB, 'Adverb')
compute(VBD, 'PastTense')
compute(VBG, 'Gerund')
compute(VBN, 'Participle')
compute(VBZ, 'PresentTense')
