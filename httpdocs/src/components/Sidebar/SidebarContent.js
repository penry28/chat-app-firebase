import { html, styleSheet } from '../../../core'
import RoomPopup from './RoomPopup';
import { connect } from '../../store';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ROOM_DB_NAME } from '../../firebase/constants';
import { SET_IS_SHOW_POPUP_ADD_ROOM, SET_CURRENT_ROOMS, SET_CHAT_CURRENT_ROOM } from '../../store/types';

const connector = connect(state => ({
  room: state.room,
  auth: state.auth,
}));

styleSheet`
.main-sidebar__content .rooms-wrap {
  max-height: 60vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
`

const SidebarContent = ({ room, auth: { user } }) => {
  const { isShowPopupAdd, rooms } = room;

  const roomQuery = query(collection(db, ROOM_DB_NAME), where('users', 'array-contains', user.uid));
  const unsubscribe = onSnapshot(roomQuery, snapshot => {
    const roomDocs = [];
    snapshot.forEach(doc => {
      roomDocs.push({...doc.data(), id: doc.id});
    });
    dispatch(SET_CURRENT_ROOMS, roomDocs);
  });

  return (
    html`
      <div class="main-sidebar__content position-relative">
        <h4 class="title">Danh sách các phòng</h4>
        <div class="rooms-wrap">
          <ul class="rooms">
            ${rooms && rooms.map(room => `
              <li data-room="${JSON.stringify(room)}">
                <a href="javascript:;" class="room" onClick="dispatch('${SET_CHAT_CURRENT_ROOM}', '${room.id}')">
                  <span>${room.name}</span>
                  <small class="d-block">${room.userId === user.uid ? '(Quản trị viên)' : '(Khách)'}</small>
                </a>
              </li>
            `)}
          </ul>
        </div>
        <button onClick="dispatch('${SET_IS_SHOW_POPUP_ADD_ROOM}', true)" type="button" class="btn btn-light btn-sm shadow-none">
          <svg width="20" height="20" t="1652506030194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2703" width="200" height="200"><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" p-id="2704"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" p-id="2705"></path></svg>
          <span>Thêm Phòng</span>
        </button>
      </div>
      ${isShowPopupAdd && RoomPopup()}
    `
  );
}

export default connector(SidebarContent);
