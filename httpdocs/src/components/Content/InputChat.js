import { html } from "../../../core";
import { SET_MESSAGE_SEND, SUBMIT_SEND_MESSAGE } from "../../store/types";
import { connect } from "../../store";

const connector = connect(state => ({
    chat: state.chat,
}));

const InputChat = ({ chat: { formMessage } }) => {
  return html`
    <div class="main-content__input-chat d-flex align-items-center">
      <input
        value="${formMessage.message}"
        type="text"
        onkeyup="event.keyCode == 13 && dispatch('${SUBMIT_SEND_MESSAGE}', this.value.trim())"
        class="form-control shadow-none"
        id="message-text"
      />
      <button onClick="dispatch('${SUBMIT_SEND_MESSAGE}', document.getElementById('message-text').value)" style="width: 100px; padding: 7px 0;" type="button" class="btn btn-primary btn-sm shadow-none ml-2">
        <svg width="20" height="20" style="fill: #fff" t="1652509208954" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3205" width="200" height="200"><path d="M914.176 473.386667l-725.333333-341.333334A42.666667 42.666667 0 0 0 129.28 180.992L212.010667 512 129.28 843.008a42.581333 42.581333 0 0 0 59.562667 48.938667l725.333333-341.333334a42.666667 42.666667 0 0 0 0-77.226666zM233.856 776.405333l46.506667-186.026666L554.666667 512l-274.304-78.378667-46.506667-186.026666L795.776 512l-561.92 264.405333z" fill="" p-id="3206"></path></svg>
        <span>Gửi</span>
      </button>
    </div>
  `;
}

export default connector(InputChat);
