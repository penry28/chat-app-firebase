import { html } from "../../../core";
import BodyChat from './BodyChat';
import InputChat from './InputChat';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from "../../firebase/config";
import { USER_DB_NAME } from '../../firebase/constants';
import { SET_USERS } from '../../store/types';

const ContentBody = () => {
  const userQuery = query(collection(db, USER_DB_NAME));
  const unsubscribe = onSnapshot(userQuery, snapshot => {
    const usersDocs = [];
    snapshot.forEach(doc => {
      usersDocs.push({...doc.data(), id: doc.id});
    });
    dispatch(SET_USERS, usersDocs);
  });

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