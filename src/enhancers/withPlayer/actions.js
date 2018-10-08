const BUMP_INDEX = 'PLAYER/BUMP_INDEX'

const actions = {
  BUMP_INDEX,
}

const createAction = (type, payload) => ({ type, payload })

const bumpIndex = clef => createAction(BUMP_INDEX, { clef })

export { actions, bumpIndex }
