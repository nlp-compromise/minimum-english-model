import adj from './root-dictionary/adj.js'
// import adverb from './root-dictionary/adverb.js'
// import noun from './root-dictionary/noun.js'
// import verb from './root-dictionary/verb.js'

import nlp from '/Users/spencer/mountain/compromise/src/three.js'

adj.forEach(a => {
  if (nlp(a).has('#Adjective') === false) {
    console.log(a)
  } else {
  }
})


