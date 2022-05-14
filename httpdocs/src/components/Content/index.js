import { html } from '../../../core'
import ChatThumnail from './ChatThumnail';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';
import './styles.scss';

const Content = () => {
  return html`
    <div class="main-content">
      <!-- ${ChatThumnail()} -->
      <div class="h-100 d-flex flex-column">
        ${ContentHeader()}
        ${ContentBody()}
      </div>
    </div>
  `;
}

export default Content;
