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

const isSharp = key =>
  ['A', 'E', 'D', 'G', 'B', 'F-sharp'].some(check => check === key)

const isOnStaff = midi => createNotesOnStaff().includes(midi)

const getDistanceFromMiddleC = (midi, key, accidental) => {
  const notesOnStaff = createNotesOnStaff()
  let value = midi
  if (!notesOnStaff.includes(midi)) {
    const sharp = accidental === 'sharp' || isSharp(key)
    value = sharp ? midi - 1 : midi + 1
  }
  const middleCIndex = _.indexOf(notesOnStaff, 60)
  return _.indexOf(notesOnStaff, value) - middleCIndex
}

export { getDistanceFromMiddleC }
