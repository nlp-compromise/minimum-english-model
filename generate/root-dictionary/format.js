import dict from '../../dict.js'
import fs from 'fs'
import { pack } from 'efrt'

let adjNoun = []
let verbNoun = []
let adjVerb = []
let hard = []
let adj = []
let noun = []
let verb = []
let adverb = []
let keys = Object.keys(dict)
console.log(keys.length.toLocaleString())
let res = 0
keys.forEach((k, n) => {
  let [count, tags] = dict[k]
  if (count <= 1) {
    return
  }
  if (tags.NN > 10 && tags.JJ > 10 && tags.VB > 10) {
    hard.push(k)
    return
  }
  if (tags.NN > 10 && tags.JJ > 10) {
    adjNoun.push(k)
    return
  }
  if (tags.NN > 10 && tags.VB > 10) {
    verbNoun.push(k)
    return
  }
  if (tags.JJ > 10 && tags.VB > 10) {
    adjVerb.push(k)
    return
  }
  if (Object.keys(tags).length > 1) {
    hard.push(k)
    return
  }
  if (tags.JJ) {
    adj.push(k)
    return
  }
  if (tags.NN) {
    noun.push(k)
    return
  }
  if (tags.VB) {
    verb.push(k)
    return
  }
  if (tags.RB) {
    adverb.push(k)
    return
  }
  // console.log(tags)
  res += 1
})
console.log(res.toLocaleString())

const percent = (part, total) => {
  let num = (part / total) * 100;
  num = Math.round(num * 10) / 10;
  return num;
};


const print = function (arr, name) {
  let str = JSON.stringify(arr, null, 2)
  // let small = pack(arr)
  fs.writeFileSync(`./root-dictionary/${name}.js`, str)
  let kb = fs.statSync(`./root-dictionary/${name}.js`).size / 1024
  let per = percent(arr.length, keys.length)
  console.log(arr.length.toLocaleString().padStart(10), '   ', per + '%   ', (Math.round(kb) + 'kb').padStart(8), '   ', name)
}

print(adjNoun, 'adj-noun')
print(verbNoun, 'verb-noun')
print(adjVerb, 'adj-verb')
console.log('   ----')
print(verb, 'verb')
print(noun, 'noun')
print(adj, 'adj')
print(adverb, 'adverb')
