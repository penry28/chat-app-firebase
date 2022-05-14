import { html } from "../../../core";
import BodyChat from './BodyChat';
import InputChat from './InputChat';

const ContentBody = () => {
  return html`
    <div class="main-content__body">
      <div class="main-content__body-inner h-100 d-flex flex-column justify-content-end">
        ${BodyChat()}
        ${InputChat()}
      </div>
    </div>
  `;
}

export default ContentBody;