import React from 'react'
import { setDisplayName } from 'recompose'

const withConsumer = (Consumer, expectedPropName) => BaseComponent => {
  const consumerProps = {}
  return setDisplayName('withConsumer')(props => (
    <Consumer>
      {values => {
        consumerProps[expectedPropName] = values
        return <BaseComponent {...props} {...consumerProps} />
      }}
    </Consumer>
  ))
}
export default withConsumer
