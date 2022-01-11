import NNS from '../pairs/NNS.js'
import VBD from '../pairs/VBD.js'
import VBG from '../pairs/VBG.js'
import VBN from '../pairs/VBN.js'
import VBZ from '../pairs/VBZ.js'
import RB from '../pairs/RB.js'
import JJR from '../pairs/JJR.js'
import JJS from '../pairs/JJS.js'
import { profile } from '/Users/spencer/mountain/suffix-thumb/src/index.js'


const add = function (pairs) {
  let h = {}
  pairs.forEach(a => {
    h[a[0]] = true
    h[a[1]] = true
  })
  return h
}

let others = Object.assign({}, add(NNS), add(VBD), add(VBG), add(VBN), add(VBZ), add(RB), add(JJR), add(JJS))
others = Object.keys(others)
// console.log(others.length)

let ingroup = RB.map(a => a[0])
console.log(profile(ingroup))