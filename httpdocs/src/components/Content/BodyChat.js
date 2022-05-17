import { html } from "../../../core";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { MESSAGE_DB_NAME } from '../../firebase/constants';
import { connect } from "../../store";
import { SET_MESSAGE_IN_CURRENT_ROOM } from "../../store/types";
import { db } from "../../firebase/config";
import ChatItem from './ChatItem';

const connector = connect(state => ({
  chat: state.chat,
  auth: state.auth,
  user: state.user
}));

const BodyChat = ({ chat: { currentRoom, messages }, auth: { user }, user: { users } }) => {
  const messageQuery = query(collection(db, MESSAGE_DB_NAME), orderBy('createdAt'), where('roomId', '==', currentRoom));
  const unsubscribe = onSnapshot(messageQuery, snapshot => {
    let messageDocs = [];
    snapshot.forEach(doc => {
      messageDocs.push({...doc.data(), id: doc.id});
    });
    messageDocs = messageDocs.map(message => {
      const userSentIndex = users.findIndex(item => item.uid === message.userId);
      if (userSentIndex >= 0) {
        return {
          ...message,
          userSent: users[userSentIndex]
        }
      } else {
        return {
          ...message,
          userSent: null
        }
      }
    })
    dispatch(SET_MESSAGE_IN_CURRENT_ROOM, messageDocs);
    let container = document.querySelector(".main-content__body-chat");
    container.scrollTop = container.scrollHeight;
  });

  return html`
    <div class="main-content__body-chat">
      <div class="inner">
        <div class="messages">
          ${messages.length ? messages.map(message => `
            ${ChatItem({
              isMe: message.userId === user.uid,
              user: message.userSent,
              message: message.message,
              createdAt: message.createdAt
            })}
          `) : ''}
        </div>
      </div>
    </div>
  `;
}

export default connector(BodyChat);
