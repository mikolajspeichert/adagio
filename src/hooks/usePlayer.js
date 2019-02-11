import { useState, useEffect, useReducer } from 'react'
import { Map } from 'immutable'
import Animator from 'util/Animator'
import { ENTRY_WIDTH, CORRECT_NOTE_BORDER_VALUE } from 'util/constants'

import { prepareNotes, extractOffset } from './utils'

const initialClefValues = Map({
  index: 0,
  offset: 480,
  correctOffset: -CORRECT_NOTE_BORDER_VALUE,
})

const emptyClefs = {
  treble: null,
  bass: null,
}

const createAction = (type, payload) => ({ type, payload })

const ACTION_TYPES = {
  BUMP: 'bump',
  CALC: 'calc',
}

const bumpIndex = () => {}

const clefReducer = (state, { type, payload }) => {
  console.log('updating')
  switch (type) {
    case ACTION_TYPES.CALC:
      return state
        .updateIn(['treble', 'offset'], offset => (payload.shouldUpdate ? offset - payload.diff : offset))
        .updateIn(['bass', 'offset'], offset => (payload.shouldUpdate ? offset - payload.diff : offset))
        .updateIn(['treble', 'correctOffset'], offset =>
          offset > -CORRECT_NOTE_BORDER_VALUE ? offset - payload.diff : offset
        )
        .updateIn(['bass', 'correctOffset'], offset =>
          offset > -CORRECT_NOTE_BORDER_VALUE ? offset - payload.diff : offset
        )
    case ACTION_TYPES.BUMP:
      return state
        .setIn([payload.clef, 'correctOffset'], payload.currentOffset)
        .updateIn([payload.clef, 'index'], index => index + 1)
        .updateIn([payload.clef, 'offset'], offset => offset + extractOffset(payload.correctNoteOffset))
    default:
      return state
  }
}

const usePlayer = ({ forTrack: track }) => {
  const [timestamp, setTimestamp] = useState(0)
  const [interval, setInterval] = useState(0)
  console.log('rendering')
  const [clefs, dispatchClefAction] = useReducer(
    clefReducer,
    Map({
      bass: initialClefValues,
      treble: initialClefValues,
    })
  )
  const [correctNotes, setCorrectNote] = useState(Map(emptyClefs))
  let notes = emptyClefs
  if (track?.isLoaded) {
    notes = {
      treble: prepareNotes(track.treble, clefs.getIn(['treble', 'index']), 'treble'),
      bass: prepareNotes(track.bass, clefs.getIn(['bass', 'index']), 'bass'),
    }
  }

  // const bumpIndex = clef => {
  //   let currentOffset = clefs.getIn([clef, 'offset'])
  //   if (currentOffset > ENTRY_WIDTH) return
  //   let correctNote = notes[clef][0]
  //   setCorrectNote(correctNotes.setIn([clef], correctNote))
  //   dispatchClefAction(
  //     createAction(ACTION_TYPES.BUMP, {
  //       clef,
  //       currentOffset,
  //       correctNoteOffset: extractOffset(correctNote),
  //     })
  //   )
  // }

  useEffect(() => {
    let loopId = null
    let oldTimestamp = 0
    function onFrame(newTimestamp) {
      setInterval(newTimestamp - oldTimestamp)
      setTimestamp(newTimestamp)
      oldTimestamp = newTimestamp
      loopId = requestAnimationFrame(onFrame)
    }
    onFrame(0)
    return () => {
      window.cancelAnimationFrame(loopId)
    }
  }, [])

  useEffect(
    () => {
      console.log('effect')
    if (isNaN(interval)) return // eslint-disable-line
      const diff = 0.12 * interval
      const shouldUpdate = clefs.getIn(['treble', 'offset']) > 0 && clefs.getIn(['bass', 'offset']) > 0
      dispatchClefAction(
        createAction(ACTION_TYPES.CALC, {
          diff,
          shouldUpdate,
        })
      )
      if (!shouldUpdate) {
        const clefTypes = ['treble', 'bass']
        clefTypes.forEach(clef => {
          const { type } = notes[clef][0]
          if ((type === 'pause' || type === 'tied') && clefs.getIn([clef, 'offset']) <= 0) {
            bumpIndex(clef)
          }
        })
      }
    },
    [timestamp]
  )

  return {
    bumpIndex,
    correctNotes,
    clefs,
    notes,
  }
}

export default usePlayer
