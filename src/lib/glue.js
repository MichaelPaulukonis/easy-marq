const select = arr => arr[Math.floor(Math.random() * arr.length)]

const offsets = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 5, -2, -2, -1, -1]

// builds fragments that are of n-tokens, where n := 5 + offset
// tokens can be of length 1..[unknown]

// TODO: I want a target length, instead of a number of tokens

export const glue2 = targLength => tokens => {
  let tokenIndex = 0
  let line = ''
  const tLength = tokens.length
  const toTake = 5
  while (line.length < targLength) {
    const taker = toTake + select(offsets)
    const endIndex = tokenIndex + taker
    if (endIndex < tLength) {
      line += tokens.slice(tokenIndex, endIndex).join(' ')
    } else {
      const frag = [
        ...tokens.slice(tokenIndex),
        ...tokens.slice(0, endIndex % tLength)
      ]
      line += frag.join(' ')
    }
    tokenIndex = endIndex % tLength
  }
  return line
}

export const glue = count => tokens => {
  let tokenIndex = 0
  const frags = []
  const tLength = tokens.length
  const toTake = 5
  for (let i = 0; i < count; i++) {
    const taker = toTake + select(offsets)
    const endIndex = tokenIndex + taker
    if (endIndex < tLength) {
      frags.push(tokens.slice(tokenIndex, endIndex).join(' '))
    } else {
      const frag = [
        ...tokens.slice(tokenIndex),
        ...tokens.slice(0, endIndex % tLength)
      ]
      frags.push(frag.join(' '))
    }
    tokenIndex = endIndex % tLength
  }
  return frags
}
