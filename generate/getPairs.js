import { streamXml, forEachSync } from './_giga.js'
import fs from 'fs'
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));//eslint-disable-line
import { giga } from '../env.js'

const tag = process.argv[2].trim()
// VBD - made
// VBG - using
// VBN -- participle
// VBP - infinitive
// VBZ - makes

// NNS

// JJR
// JJS
// RBR
// RBS
// const tag = 'JJR'
console.log(tag)

// const ids = ['0004']
let ids = []
for (let i = 1; i <= 50; i += 1) {
  let str = String(i).padStart(4, '0')
  ids.push(str)
}

let all = {}

// kick them off
const parseXml = function (id, tag) {
  let list = []
  const parseEN = function (item) {
    item.w = item.w || []
    let found = item.w.filter(o => o['$'].tree === tag)
    found.forEach(o => {
      let word = o['$text']
      let lem = o['$'].lem
      if (!word || !lem) {
        return
      }
      word = word.toLowerCase()
      lem = lem.toLowerCase()
      if (all.hasOwnProperty(word) && all[word] !== lem) {
        console.log(word, lem, all[word])
        return
      }
      all[word] = lem
    })
    return true
  }
  return new Promise(resolve => {
    const doneMaybe = () => {
      resolve(list)
    }
    streamXml(giga + `${id}.xml`, parseEN, doneMaybe)
  })
}


  ; (async () => {
    await forEachSync(ids, async id => {
      console.log(`\ndoing ${id}:\n`)
      await parseXml(id, tag)
      console.log(Object.entries(all).length, 'pairs ..')
    })
    fs.writeFileSync(resolve(dir, `../pairs/${tag}.js`), 'export default ' + JSON.stringify(all, null, 2))
    // console.log('all-done.')
  })()
