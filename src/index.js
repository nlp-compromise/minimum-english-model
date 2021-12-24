import getPairs from '../pairs/index.js'

// let pairs = getPairs('VBZ')
let pairs = getPairs('JJS')

pairs = Object.entries(pairs)
console.log(pairs.length)