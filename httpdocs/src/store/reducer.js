import { auth, db } from '../firebase/config';
import { USER_DB_NAME, ROOM_DB_NAME } from '../firebase/constants';
import { signInWithPopup, FacebookAuthProvider, getAdditionalUserInfo, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, updateDoc, doc, setDoc } from 'firebase/firestore';
import {
  OPEN_POPUP_LOGIN,
  SET_USER_AUTH,
  SET_IS_LOADING,
  SET_ACCESS_TOKEN,
  SET_IS_SHOW_POPUP_ADD_ROOM,
  SET_NAME_FORM_ROOM,
  SET_DESCRIPTION_ROOM,
  SET_USER_SELECTION_FORM_ROOM,
  SUBMIT_FORM_ADD_ROOM,
  SET_IS_ROOM_FORM_LOADING,
  SET_CURRENT_ROOMS,
  AUTH_LOGOUT,
  SET_CHAT_CURRENT_ROOM,
  SET_USERS_IN_CURRENT_ROOM,
  SET_IS_SHOW_POPUP_ADD_INVITE,
  SET_USERS,
  SET_USER_SELECTION_FORM_INVITE,
  SET_IS_INVITE_FORM_LOADING,
  SUBMIT_FORM_INVITE_USERS
} from './types';

const init = {
  app: {
    isLoading: true,
  },
  auth: {
    accessToken: null,
    user: null,
  },
  room: {
    rooms: [],
    isShowPopupAdd: false,
    isFormLoading: false,
    formData: {
      name: '',
      description: '',
      users: [],
    },
  },
  user: {
    users: []
  },
  chat: {
    currentRoom: null,
    usersInRoom: [],
    isShowPopupInvite: false,
    messages: [],
    textTyping: [],
    isFormLoading: false,
    formDataInvite: {
      users: []
    }
  }
};

export default function reducer(state = init, action, args) {
  switch (action) {
    case OPEN_POPUP_LOGIN:
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then(result => {
          const { isNewUser, providerId } = new getAdditionalUserInfo(result);
          // Add new user into firebase firestore
          if (isNewUser) {
            (async({ displayName, email, uid, photoURL, providerId }) => {
              console.log({ displayName, email, uid, photoURL, providerId });
              try {
                await addDoc(collection(db, USER_DB_NAME), {
                  uid,
                  displayName,
                  email,
                  photoURL,
                  providerId,
                  createdAt: serverTimestamp()
                });
              } catch (err) {
                console.error(err);
              }
            })({...result.user, providerId});
          }
        })
        .catch(err => {
          console.log(err);
        });
      return state;
    case SET_USER_AUTH:
      return {
        ...state,
        auth: {
          ...state.auth,
          user: args
        }
      };
    case SET_IS_LOADING:
      return {
        ...state,
        app: {
          ...state.app,
          isLoading: args
        }
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        auth: {
          ...state.auth,
          accessToken: args
        }
      };
    case SET_IS_SHOW_POPUP_ADD_ROOM:
      return {
        ...state,
        room: {
          ...state.room,
          isShowPopupAdd: args
        }
      };
    case SET_NAME_FORM_ROOM:
      return {
        ...state,
        room: {
          ...state.room,
          formData: {
            ...state.room.formData,
            name: args
          }
        }
      }
    case SET_DESCRIPTION_ROOM:
      return {
        ...state,
        room: {
          ...state.room,
          formData: {
            ...state.room.formData,
            description: args
          }
        }
      };
    case SET_USER_SELECTION_FORM_ROOM:
      const [uid, checked] = args;
      let usersNew = [...state.room.formData.users];
      const indexed = usersNew.findIndex(item => item === uid);
      if (indexed >= 0) {
        if (!checked) {
          usersNew = usersNew.filter(item => item !== uid);
        }
      } else {
        if (checked) {
          usersNew.push(uid);
        }
      }
      return {
        ...state,
        room: {
          ...state.room,
          formData: {
            ...state.room.formData,
            users: usersNew
          }
        }
      };
    case SUBMIT_FORM_ADD_ROOM:
      const { name, users, description } = state.room.formData;
      let isLoading = false;
      const authUID = state.auth.user.uid;
      // Added user auth into room
      users.push(authUID);
      if (name?.length && users.length) {
        isLoading = true;
        const addRoom = async (name, users, description, authUID) => {
          try {
            await addDoc(collection(db, ROOM_DB_NAME), {
              name,
              users,
              description,
              userId: authUID,
              createdAt: serverTimestamp(),
            });
            return {
              ...state,
              room: {
                ...state.room,
                isFormLoading: false
              }
            };
          } catch (err) {
            console.error(err);
          }
        }
        addRoom(name, users, description, authUID)
          .then(() => {
            dispatch(SET_IS_SHOW_POPUP_ADD_ROOM, false);
            dispatch(SET_IS_ROOM_FORM_LOADING, false);
          })
          .catch(() => {
            alert('Thêm dữ liệu không thành công, vui lòng thử lại!');
            dispatch(SET_IS_ROOM_FORM_LOADING, false);
          });
      } else {
        alert('Vui lòng điền đầy đủ thông tin!');
      }
      return {
        ...state,
        room: {
          ...state.room,
          isFormLoading: isLoading
        }
      };
    case SET_IS_ROOM_FORM_LOADING:
      return {
        ...state,
        room: {
          ...state.room,
          isFormLoading: args
        }
      };
    case SET_CURRENT_ROOMS:
      return {
        ...state,
        room: {
          ...state.room,
          rooms: args
        }
      };
    case AUTH_LOGOUT:
      signOut(auth)
        .then(() => {
          dispatch(SET_USER_AUTH, null);
          dispatch(SET_ACCESS_TOKEN, null);
        });
      return state;
    case SET_CHAT_CURRENT_ROOM:
      return {
        ...state,
        chat: {
          ...state.chat,
          currentRoom: args
        }
      };
    case SET_USERS_IN_CURRENT_ROOM:
      return {
        ...state,
        chat: {
          ...state.chat,
          usersInRoom: args
        }
      };
    case SET_IS_SHOW_POPUP_ADD_INVITE:
      return {
        ...state,
        chat: {
          ...state.chat,
          isShowPopupInvite: args
        }
      };
    case SET_USERS:
      return {
        ...state,
        user: {
          ...state.user,
          users: args
        }
      };
    case SET_USER_SELECTION_FORM_INVITE:
      const [uid2, checked2] = args;
      let usersNew2 = [...state.chat.formDataInvite.users];
      const indexed2 = usersNew2.findIndex(item => item === uid2);
      if (indexed2 >= 0) {
        if (!checked2) {
          usersNew2 = usersNew2.filter(item => item !== uid2);
        }
      } else {
        if (checked2) {
          usersNew2.push(uid2);
        }
      }
      return {
        ...state,
        chat: {
          ...state.chat,
          formDataInvite: {
            ...state.room.formDataInvite,
            users: usersNew2
          }
        }
      };
    case SET_IS_INVITE_FORM_LOADING:
      return {
        ...state,
        chat: {
          ...state.chat,
          isFormLoading: args
        }
      };
    case SUBMIT_FORM_INVITE_USERS:
      const usersInvite = state.chat.formDataInvite.users;
      let isLoading2 = false;
      if (usersInvite.length) {
        isLoading2 = true;
        (async (users, usersOld) => {
          const roomRef = doc(db, ROOM_DB_NAME, state.chat.currentRoom);
          const usersUpdate = [...users, ...usersOld.map(item => item.uid)];
          await updateDoc(roomRef, {
            users: usersUpdate
          });
          dispatch(SET_IS_SHOW_POPUP_ADD_INVITE, false);
          dispatch(SET_IS_INVITE_FORM_LOADING, false);
          dispatch(SET_USER_SELECTION_FORM_INVITE, []);
        })(usersInvite, state.chat.usersInRoom);
      } else {
        alert('Thêm dữ liệu không thành công, vui lòng thử lại!');
        dispatch(SET_IS_INVITE_FORM_LOADING, false);
      }
      return {
        ...state,
        chat: {
          ...state.chat,
          isFormLoading: isLoading2
        }
      };
    default:
      return state;
  }
}
