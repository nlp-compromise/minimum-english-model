import { forEachSync } from '../_giga.js'
import doSentence from '../sentence.js'
import fs from 'fs'

let ids = []
// const max = 226
for (let i = 2; i <= 15; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}
// ids = ['0004']

const tag = 'JJS'
// const tag = 'VBN'
// const tag = 'JJR'

let all = {}

const cb = (word, root, pos) => {
  try {
    root = root.trim().toLowerCase()
    word = word.trim().toLowerCase()
    if (pos !== tag) {
      return
    }
    if (!all[word]) {
      all[word] = [root, 0]
    }
    if (all[word][0] === root) {
      all[word][1] += 1
    } else {
      console.log(word, all[word][0], root)
    }
  } catch (e) {
    console.log(e)
  }
}

const done = function () {
  console.log('all-done.')
  all = Object.entries(all).map(a => {
    return [a[0], a[1][0], a[1][1]]
  })
  all = all.filter(a => a[2] > 1)
  all = all.sort((a, b) => {
    if (a[2] > b[2]) {
      return -1
    } else if (a[2] < b[2]) {
      return 1
    }
    return 0
  })
  all = JSON.stringify(all, null, 2)
  fs.writeFileSync(`./pairs/${tag}.js`, 'export default ' + all)
}

  ; (async () => {
    await forEachSync(ids, async id => {
      console.log(`\ndoing ${id}:\n`)
      await doSentence(id, cb)
      console.log('  ', Object.keys(all).length.toLocaleString(), 'lemmas total')
    })
    done()
  })()
