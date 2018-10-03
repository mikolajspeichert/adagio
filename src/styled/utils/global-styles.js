import { injectGlobal } from 'styled-components'
import { colors } from '../themes'
/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: ${colors.background};
  }
`
