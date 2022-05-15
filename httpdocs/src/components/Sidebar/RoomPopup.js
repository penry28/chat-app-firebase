import { html, styleSheet } from '../../../core';
import { useState, useEffect } from '../../store';
import { USER_DB_NAME } from '../../firebase/constants';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { connect } from '../../store';
import {
  SET_IS_SHOW_POPUP_ADD_ROOM,
  SET_NAME_FORM_ROOM,
  SET_DESCRIPTION_ROOM,
  SET_USER_SELECTION_FORM_ROOM,
  SUBMIT_FORM_ADD_ROOM,
} from '../../store/types';

const connector = connect(state => ({
  room: state.room,
  auth: state.auth
}));

styleSheet`
.room-popup {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.room-popup__wrapper {
  background-color: #FFF;
  border-radius: 3px;
  width: 40%;
}
.heading {
  border-bottom: 1px solid #ccc;
  padding: 10px;
}
.content {
  padding: 10px;
}
.users-selection {
  display: flex;
  flex-wrap: wrap;
  max-height: 300px;
  overflow: scroll;
}
.user-selection-item {
  flex: 0 0 50%;
  max-width: 50%;
  padding 3px;
  margin-bottom: 3px;
}
`;

const RoomPopup = ({ room: { formData, isFormLoading }, auth }) => {
  const [users, setUsers] = useState(['hello']);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, USER_DB_NAME));
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      docs = docs.filter(user => user.uid !== auth.user.uid);
      setUsers(docs);
    }
    fetchUsers();
  }, []);

  return html`
    <div class="room-popup">
      <div class="room-popup__wrapper">
        <div class="heading">
          <div class="d-flex justify-content-between align-items-center">
            <span>Thêm Room</span>
            <svg onClick="dispatch('${SET_IS_SHOW_POPUP_ADD_ROOM}', false)" width="20" height="20" style="cursor: pointer;" t="1652581764669" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1903" width="200" height="200"><path d="M544.448 499.2l284.576-284.576a32 32 0 0 0-45.248-45.248L499.2 453.952 214.624 169.376a32 32 0 0 0-45.248 45.248l284.576 284.576-284.576 284.576a32 32 0 0 0 45.248 45.248l284.576-284.576 284.576 284.576a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544.448 499.2z" p-id="1904"></path></svg>
          </div>
        </div>
        <div class="content">
          <div class="form-content">
            <form id="form-room">
              <div class="form-group">
                <input type="text" value="${formData.name}" onblur="dispatch('${SET_NAME_FORM_ROOM}', this.value.trim())" class="form-control shadow-none" placeholder="Nhập tên room" />
              </div>
              <div class="form-group">
                <textarea class="form-control placeholder="Nhập mô tả phòng" onblur="dispatch('${SET_DESCRIPTION_ROOM}', this.value.trim())" shadow-none" >${formData.description}</textarea>
              </div>
              <div class="form-group">
                <div class="users-selection">
                  ${users && users.map((user, index) => `
                    <div key="${index}" class="user-selection-item">
                      <input ${formData.users.includes(user.uid) && 'checked'} id="${user.uid}" type="checkbox" onChange="dispatch('${SET_USER_SELECTION_FORM_ROOM}', ['${user.uid}', event.target.checked])" value="${user.uid}" />
                      <label for="${user.uid}">${user.displayName}</label>
                    </div>
                  `)}
                </div>
              </div>
              <div class="form-group">
                <button type="button" onClick="dispatch('${SUBMIT_FORM_ADD_ROOM}')" class="btn btn-primary shadow-none">
                  ${isFormLoading && `
                    <div style="width: 18px; height: 18px;" class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  `}
                  <span>Thêm room</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default connector(RoomPopup);
