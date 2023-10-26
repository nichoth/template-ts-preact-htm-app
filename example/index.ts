import { html } from 'htm/preact/index.js'
import { render } from 'preact'
import { Example } from '../src/index.js'

render((html`<${Example} />`), document.getElementById('root')!)
