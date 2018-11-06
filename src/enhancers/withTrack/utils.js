import _ from 'lodash'

const createNotesOnStaff = () => {
  let n = 19
  let acc = []
  let staff = _.tail(_.range(109))
  while (n < 109) {
    acc.push(n + 1)
    acc.push(n + 3)
    acc.push(n + 6)
    acc.push(n + 8)
    acc.push(n + 10)
    n += 12
  }
  staff = _.difference(staff, acc)
  return staff
}

const destructureNoteData = note => {
  let result = {}
  note.split(';').forEach(field => {
    if (!field) return
    let [key, value] = field.split(':')
    switch (key) {
      case 's':
        result.size = parseInt(value, 10)
        break
      case 't':
        result.type = value
        break
      case 'a':
        result.accidental = value
        break
      case 'm':
        result.midi = parseInt(value, 10)
        break
      case 'd':
        result.dot = parseInt(value, 10)
        break
      default:
        console.log('Something is wrong with track data', key, value)
    }
  })
  return result
}

const isSharp = key =>
  ['A', 'E', 'D', 'G', 'B', 'F-sharp'].some(check => check === key)

const getDistanceFromMiddleC = (midi, key, accidental) => {
  const notesOnStaff = createNotesOnStaff()
  let value = midi
  if (!notesOnStaff.includes(midi)) {
    const sharp = accidental === 's' || isSharp(key) // normal accidental would be included on staff
    value = sharp ? midi - 1 : midi + 1
  }
  const middleCIndex = _.indexOf(notesOnStaff, 60)
  return _.indexOf(notesOnStaff, value) - middleCIndex
}

export { getDistanceFromMiddleC, destructureNoteData }
