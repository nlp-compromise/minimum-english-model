import pairs from '/Users/spencer/mountain/minimum-model/pairs/RB.js'
import adj from '/Users/spencer/mountain/minimum-model/root-dictionary/adj.js'

const allAdj = adj.reduce((h, str) => {
  h[str] = true
  return h
}, {})


const justIc = {
  monopolistically: true,
  electrostatically: true,
  therapeutically: true,
  pragmatically: true,
  cosmetically: true,
  arithmetically: true,
  symbolically: true,
  unenthusiastically: true,
  synergistically: true,
  stylistically: true,
  euphemistically: true,
  characteristically: true,
  problematically: true,
  magnetically: true,
  microscopically: true,
  concentrically: true,
  altruistically: true,
  specifically: true,
  electronically: true,
  automatically: true,
  domestically: true,
  historically: true,
  dramatically: true,
  systematically: true,
  strategically: true,
  periodically: true,
  basically: true,
  genetically: true,
  scientifically: true,
  realistically: true,
  drastically: true,
  linguistically: true,
  enthusiastically: true,
  ironically: true,
  systemically: true,
  academically: true,
  democratically: true,
  dynamically: true,
  aesthetically: true,
  intrinsically: true,
  artistically: true,
  organically: true,
  demographically: true,
  syntactically: true,
  hermetically: true,
  athletically: true,
  publically: true,
  emphatically: true,
  sporadically: true,
  hydraulically: true,
  generically: true,
  holistically: true,
  thematically: true,
  unrealistically: true,
  authentically: true,
  metallurgically: true,
  opportunistically: true,
  energetically: true,
  tragically: true,
  chronically: true,
}

let res = pairs.map(a => {
  let inf = a[0]
  if (justIc.hasOwnProperty(inf)) {
    inf = inf.replace(/ically$/, 'ic')
  }
  // inf = inf.replace(/ically$/, 'ic')
  inf = inf.replace(/ially$/, 'ial')
  inf = inf.replace(/ally$/, 'al')
  inf = inf.replace(/fully$/, 'full')
  inf = inf.replace(/ily$/, 'y')
  inf = inf.replace(/ently$/, 'ent')
  inf = inf.replace(/bly$/, 'ble')
  inf = inf.replace(/btly$/, 'btle')
  inf = inf.replace(/uly$/, 'ue')

  inf = inf.replace(/ly$/, '')
  if (!allAdj[inf] && a[0] !== inf) {
    console.log([a[0], inf])
  }
  return [a[0], inf]
})
// console.log(JSON.stringify(res, null, 2))

// idly
// supply
// ambly
// silly
// gently
// tragically
// subtly
// harmfull
// powerfully
// unlawful
// slightly
// only
// simply
// successfully
// early
// namely
// wholly
// family
// silly
