import dict from '../../dict.js'
import fs from 'fs'

let adjNoun = []
let verbNoun = []
let adjVerb = []
let hard = []
let adj = []
let noun = []
let verb = []
let keys = Object.keys(dict)
console.log(keys.length.toLocaleString())
let res = 0
keys.forEach(k => {
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
  }
  if (tags.NN) {
    noun.push(k)
  }
  if (tags.VB) {
    verb.push(k)
  }
  res += 1
})
console.log(res.toLocaleString())

console.log(hard.length.toLocaleString(), '  hard')
console.log(adjNoun.length.toLocaleString(), '  adj-Noun')
console.log(verbNoun.length.toLocaleString(), '  verb-Noun')
console.log(adjVerb.length.toLocaleString(), '  adj-Verb')
console.log('=-=-=-=-')
console.log(verb.length.toLocaleString(), '  verb')
console.log(noun.length.toLocaleString(), '  noun')
console.log(adj.length.toLocaleString(), '  adj')

fs.writeFileSync('./dictionary/hard.js', JSON.stringify(hard, null, 2))
fs.writeFileSync('./dictionary/adj-noun.js', JSON.stringify(adjNoun, null, 2))
fs.writeFileSync('./dictionary/verb-noun.js', JSON.stringify(verbNoun, null, 2))
fs.writeFileSync('./dictionary/adj-verb.js', JSON.stringify(adjVerb, null, 2))
fs.writeFileSync('./dictionary/verb.js', JSON.stringify(verb, null, 2))
fs.writeFileSync('./dictionary/noun.js', JSON.stringify(noun, null, 2))
fs.writeFileSync('./dictionary/adj.js', JSON.stringify(adj, null, 2))
