import { learn, convert, compress, uncompress } from '/Users/spencer/mountain/suffix-thumb/src/index.js'
import fileSize from './fileSize.js'
import JJS from '../pairs/JJS.js'
import VBD from '../pairs/VBD.js'

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
  // console.log(model.rules)
  let res = JSON.stringify(model)
  console.log(fileSize(res))
}

compute(VBD, 'JJR')
compute(JJS, 'JJS')
compute(JJS, 'RBR')
compute(VBD, 'VBD')
compute(VBD, 'VBG')
compute(VBD, 'VBN')
compute(VBD, 'VBZ')