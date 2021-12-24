import { learn, convert, compress, uncompress } from '/Users/spencer/mountain/suffix-thumb/src/index.js'
import fileSize from './src/fileSize.js'
import JJS from './pairs/JJS.js'
import VBD from './pairs/VBD.js'

const measure = function (pairs, tag) {
  let arr = Object.entries(pairs)
  let model = learn(arr)
  console.log('\n\n', tag)
  console.log('   ', arr.length, 'words')
  console.log('     ', fileSize(JSON.stringify(pairs)))
  console.log('   ', model.rules.length, 'rules', Object.keys(model.exceptions).length, 'exceptions')

  // console.log(model)
  // model = compress(model)
  let res = JSON.stringify(model)
  console.log(model)
  console.log(' ', fileSize(res))

}
measure(JJS, 'JJS')
measure(VBD, 'VBD')