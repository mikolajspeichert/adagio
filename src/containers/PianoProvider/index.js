import React from 'react'

const Keys = React.createContext({
  keys: [],
})

const PianoProvider = ({ keys, children }) => (
  <Keys.Provider value={{ keys }}>{children}</Keys.Provider>
)

export default PianoProvider
export const Pressed = Keys.Consumer
