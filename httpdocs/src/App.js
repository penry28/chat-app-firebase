import html from '../core/html';
import { connect } from './store';

const connector = connect(state => state.auth);

const App = (props) => {
  return html`
    <h1>Hello World!</h1>
  `
}

export default connector(App);
