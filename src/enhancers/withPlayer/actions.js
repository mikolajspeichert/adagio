const SET_NEW = 'PLAYER/SET_NEW'
const SET_PASSED = 'PLAYER/SET_PASSED'

const actions = {
  SET_NEW,
  SET_PASSED,
}

const createAction = (type, payload) => ({ type, payload })

const setNewNote = clef => createAction(SET_NEW, { clef })
const setNotePassed = clef => createAction(SET_PASSED, { clef })

export { actions, setNewNote, setNotePassed }
