import { html } from "../../../core";
import { formatRelative } from 'date-fns/esm';

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

const ChatItem = ({ isMe, user, message, createdAt }) => {
  return (user && message && createdAt) ? html`
    <div class="messages-item ${isMe && 'me'} align-content-left">
      <div class="main d-flex">
      ${
        user?.photoURL
        ? `<img class="avatar" style="border-radius: 50%;" width="35" height="35" src="${user?.photoURL}" alt="" />`
        : `<span style="width: 35px; height: 35px; background-color: #ccc; border-radius: 50%;" class="d-flex align-items-center justify-content-center">${user?.displayName.charAt(0)}</span>`
      }
        <div class="content">
            <div class="user">
            <span class="name">${user?.displayName}</span>
            <span class="time">${formatDate(createdAt?.seconds)}</span>
            </div>
            <p class="txt">${message}</p>
        </div>
      </div>
    </div>
  ` : '';
}

export default ChatItem;
