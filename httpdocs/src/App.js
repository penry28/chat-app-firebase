import { html, styleSheet } from '../core'
import Sidebar from './components/Sidebar';
import Content from './components/Content';

styleSheet`
.app-container {
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  color: #000000;
}
`

const App = () => {
  return html`
    <div class="app-container">
      <div class="app-container__inner d-flex">
        ${Sidebar()}
        ${Content()}
      </div>
    </div>
  `
}

export default App;
