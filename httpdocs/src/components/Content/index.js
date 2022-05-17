import { html } from '../../../core'
import ChatThumnail from './ChatThumnail';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';
import { connect } from '../../store';
import './styles.scss';

const connector = connect(state => ({
  chat: state.chat
}));

const Content = ({ chat: { currentRoom } }) => {
  return html`
    <div class="main-content">
      ${
        currentRoom
        ? `<div class="h-100 d-flex flex-column">
            ${ContentHeader()}
            ${ContentBody()}
          </div>`
        : `${ChatThumnail()}`
      }
    </div>
  `;
}

export default connector(Content);
