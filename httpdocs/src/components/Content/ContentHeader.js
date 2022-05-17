import { html, styleSheet } from "../../../core";
import { connect } from "../../store";
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from "../../firebase/config";
import { USER_DB_NAME } from '../../firebase/constants';
import { SET_USERS_IN_CURRENT_ROOM, SET_IS_SHOW_POPUP_ADD_INVITE, DELETE_USER_IN_ROOM } from '../../store/types';
import InvitePopup from './InvitePopup';

styleSheet`
.users-in-room {
  max-width: 400px;
  overflow-y: hidden;
  overflow-x: scroll;
  transform: translateY(7px);
}
.delete-user {
  top: 0px;
  right: 0;
  box-shadow: 0 0 3px rgb(0 0 0 / 20%);
  background: #fff;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
`

const connector = connect(state => ({
  room: state.room,
  chat: state.chat,
  auth: state.auth,
  user: state.user
}));

const ContentHeader = ({ room: { rooms }, chat: { currentRoom, usersInRoom, isShowPopupInvite }, auth, user: { users } }) => {
  const roomSelected = rooms.find(room => room.id === currentRoom);
  // const userQuery = query(collection(db, USER_DB_NAME), where('uid', 'in', [...roomSelected.users]));
  // const unsubscribe = onSnapshot(userQuery, snapshot => {
  //   const usersDocs = [];
  //   snapshot.forEach(doc => {
  //     usersDocs.push({...doc.data(), id: doc.id});
  //   });
  //   dispatch(SET_USERS_IN_CURRENT_ROOM, usersDocs);
  // });
  // console.log(users);
  const usersFiteredInRoom = users.filter(user => {
    return roomSelected?.users.includes(user.uid);
  });
  dispatch(SET_USERS_IN_CURRENT_ROOM, usersFiteredInRoom);

  return roomSelected && html`
    <div class="main-content__header d-flex justify-content-between align-items-center">
      <div class="main-content__header-left">
        <h3 class="room-name mb-0">${roomSelected?.name}</h3>
        <p class="room-description mb-0">${roomSelected?.description}</p>
      </div>
      <div class="main-content__header-right">
        <div class="d-flex align-items-center justify-content-left">
          <div class="users-in-room">
            <ul class="d-flex mb-0">
              ${usersFiteredInRoom && usersFiteredInRoom.map(user => `
                <li class="position-relative mr-1" data-user="${JSON.stringify(user)}">
                  ${
                    user.photoURL
                    ? `<img title="${auth.user.uid === user.uid ? 'Bạn' : user.displayName}" width="30" height="30" style="border-radius: 50%;" src="${user.photoURL}" alt="" />`
                    : `<span title="${auth.user.uid === user.uid ? 'Bạn' : user.displayName}" style="width: 30px; height: 30px; background-color: #ccc; border-radius: 50%;" class="d-flex align-items-center justify-content-center">${user?.displayName.charAt(0)}</span>`
                  }
                  ${roomSelected.userId === auth.user.uid && user.uid !== auth.user.uid ? `
                    <span onClick="dispatch('${DELETE_USER_IN_ROOM}', '${user.uid}')" class="position-absolute delete-user">
                      <svg width="13" height="13" style="cursor: pointer;" t="1652581764669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1903" width="200" height="200"><path d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z" p-id="1904"></path></svg>
                    </span>
                  ` : ''}
                </li>
              `)}
            </ul>
          </div>
          <button onClick="dispatch('${SET_IS_SHOW_POPUP_ADD_INVITE}', true)" type="button" class="invite-user btn btn-primary btn-sm shadow-none ml-2">
            <svg width="17" height="17" style="fill: #FFF" t="1652507155312" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3498" width="200" height="200"><path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h0.1c3 0 4.4-3.6 2.2-5.6-30.8-27.6-65.6-49.7-103.7-65.8-0.4-0.2-0.8-0.3-1.2-0.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.7 18.9-84.8 46-119.3 80.6-34.5 34.5-61.5 74.7-80.4 119.5C147.9 794.5 138 841 137 888.8c-0.1 4.5 3.5 8.2 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1 2.5 1.5 5.5 1.7 8.1 0.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4-32.4-32.5-50.3-75.7-50.3-121.6 0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4c32.4 32.5 50.3 75.7 50.3 121.6 0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="3499"></path></svg>
            <span>Mời</span>
          </button>
        </div>
      </div>
    </div>
    ${isShowPopupInvite && InvitePopup({
      currentRoom: roomSelected,
      usersInRoom
    })}
  `;
}

export default connector(ContentHeader);
