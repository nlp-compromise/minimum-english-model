import { forEachSync } from '../_giga.js'
import doSentence from '../sentence.js'
import fs from 'fs'

let ids = []
// const max = 226
for (let i = 2; i <= 22; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}
// ids = ['0004']

const simple = {
  "NN": "NN",
  "NP": "NN",
  "NNS": "NN",
  "NPS": "NN",
  "VB": "VB",
  "VBN": "VB",
  "VBD": "VB",
  "VBG": "VB",
  "VBP": "VB",
  "VBZ": "VB",
  "MD": "VB",
  "JJR": "JJ",
  "JJS": "JJ",
  "RBR": "RB",
  "RBS": "RB",
}

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num)
  return num;
};

const topk = function (arr, len) {
  let obj = {}
  arr.forEach(a => {
    obj[a] = obj[a] || 0
    obj[a] += 1
  })
  let res = Object.keys(obj).map(k => [k, percent(obj[k], len)])
  return res.sort((a, b) => (a[1] > b[1] ? -1 : 0))
}


let all = {}

const cb = (_word, root, pos) => {
  root = root.trim().toLowerCase()
  if (pos === 'CD' || pos === ',' || pos === 'LS') {
    return
  }
  if (!all[root]) {
    all[root] = []
  }
  pos = simple[pos] || pos
  all[root].push(pos)
}

const done = function () {
  console.log('all-done.')
  Object.keys(all).forEach(k => {
    let len = all[k].length
    all[k] = [len, topk(all[k], len)]
  })
  all = Object.entries(all).map(a => {
    let [count, tags] = a[1]
    let tagObj = {}
    tags = tags.filter(tag => tag[1] > 5)
    tags.forEach(tag => {
      tagObj[tag[0]] = tag[1]
    })
    return [a[0], count, tagObj]
  })
  all = all.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1
    } else if (a[1] < b[1]) {
      return 1
    }
    return 0
  })
  let out = all.reduce((h, info) => {
    h[info[0]] = [info[1], info[2]]
    return h
  }, {})
  out = JSON.stringify(out, null, 2)
  fs.writeFileSync('./out.js', 'export default ' + out)
}

  ; (async () => {
    await forEachSync(ids, async id => {
      console.log(`\ndoing ${id}:\n`)
      await doSentence(id, cb)
      console.log('  ', Object.keys(all).length.toLocaleString(), 'lemmas total')
    })
    done()
  })()
