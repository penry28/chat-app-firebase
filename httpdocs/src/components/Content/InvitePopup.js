import { html } from "../../../core";
import { connect } from "../../store";
import { SET_USER_SELECTION_FORM_INVITE, SUBMIT_FORM_INVITE_USERS, SET_IS_SHOW_POPUP_ADD_INVITE } from '../../store/types';

const connector = connect(state => ({
  user: state.user,
  chat: state.chat,
  auth: state.auth
}));

const InvitePopup = ({ user: { users }, chat: { formDataInvite, isFormLoading, usersInRoom }, auth }) => {
  const usersInvite = users.filter(_user => {
    return !usersInRoom.map(item => item.uid).includes(_user.uid);
  });

  return !!usersInRoom.length && html`
  <div class="room-popup">
    <div class="room-popup__wrapper">
      <div class="heading">
        <div class="d-flex justify-content-between align-items-center">
          <span>Mời bạn</span>
          <svg onClick="dispatch('${SET_IS_SHOW_POPUP_ADD_INVITE}', false)" width="20" height="20" style="cursor: pointer;" t="1652581764669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1903" width="200" height="200"><path d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z" p-id="1904"></path></svg>
        </div>
      </div>
      <div class="content">
        <div class="form-content">
          <form id="form-room">
            <div class="form-group">
              <div class="users-selection">
                ${usersInvite && usersInvite.map((user, index) => `
                  <div key="${index}" class="user-selection-item">
                    <input ${formDataInvite.users.includes(user.uid) && 'checked'} id="${user.uid}" type="checkbox" onChange="dispatch('${SET_USER_SELECTION_FORM_INVITE}', ['${user.uid}', event.target.checked])" value="${user.uid}" />
                    <label for="${user.uid}">${user.displayName}</label>
                  </div>
                `)}
              </div>
            </div>
            <div class="form-group">
              <button type="button" onClick="dispatch('${SUBMIT_FORM_INVITE_USERS}')" class="btn btn-primary shadow-none">
                ${isFormLoading && `
                  <div style="width: 18px; height: 18px;" class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                `}
                <span>Mời</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
`
}

export default connector(InvitePopup);
