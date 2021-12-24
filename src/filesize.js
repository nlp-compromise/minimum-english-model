// import fs from 'fs'

// approximate file-size of given text
const fileSize = (txt) => {
  let unit = 'kb'
  let num = Buffer.byteLength(txt, 'utf8')
  num = num / 1000
  if (num > 1000) {
    unit = 'mb'
    num = num / 1000
  }
  num = Math.round(num * 10) / 10//round it
  return num.toLocaleString() + unit
}

export default fileSize

// let file = `/Users/spencer/data/infinite-jest/infinite-jest.txt`
// let str = fs.readFileSync(file).toString()
// console.log(fileSize(str))