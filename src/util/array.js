const avg = array =>
  array.reduce((result, time) => result + time, 0) / array.length

const median = array =>
  !array.length ? 0 : array[Math.floor(array.length / 2)]

const mode = array => {
  if (!array.length) return 0
  const counts = {}
  let final = null
  let max = 0
  array.forEach(i => {
    const value = Math.round(i * 10) / 10 // ?
    counts[value] = (counts[value] || 0) + 1
    if (counts[value] > max) {
      max = counts[value]
      final = value
    }
  })
  return final
}

export default {
  avg,
  median,
  mode,
}
