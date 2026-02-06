import { createGlobalStyle } from 'styled-components'
import { colors } from './theme'

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    background: ${colors.cream};
    color: ${colors.text};
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
  img { max-width: 100%; display: block; }
`
