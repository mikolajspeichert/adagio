import React, { Fragment } from 'react'
import { compose, withProps, withHandlers, lifecycle } from 'recompose'

import { Scaled } from 'components/Paper'
import Note from 'components/Note'
import EntryField from 'components/EntryField'
import { BASE_OFFSET, BASE_NOTE_WIDTH } from 'util/constants'

const enhance = compose(
  withHandlers({

  }),
  withProps(({ data }) => {
    console.log(data)
  })
)

const entryWidth = 70

const Displayer = enhance(({ clef, data, offset = BASE_OFFSET }) => (
  <Scaled>
    {({ scale }) => (
      /* input clef here */
      <Fragment>
        <EntryField
          offset={(BASE_OFFSET - (entryWidth - BASE_NOTE_WIDTH) / 2) * scale}
          width={entryWidth * scale}
        />
        <Note offset={offset * scale} scale={scale} data={data} />
      </Fragment>
    )}
  </Scaled>
))

export default Displayer
