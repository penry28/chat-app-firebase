import { html, styleSheet } from '../core'
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Login from './Login';
import { connect } from './store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { SET_USER_AUTH, SET_IS_LOADING, SET_ACCESS_TOKEN } from './store/types';
import Loading from './components/Loading';

styleSheet`
.app-container {
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  color: #000000;
}
`

const connector = connect(state => ({
  auth: state.auth,
  app: state.app
}));

const App = ({ app: { isLoading }, auth: { accessToken, user } }) => {
  onAuthStateChanged(auth, user => {
    if (!accessToken && user) {
      const { displayName, email, uid, photoURL } = user;
      dispatch(SET_USER_AUTH, { displayName, email, uid, photoURL });
      dispatch(SET_ACCESS_TOKEN, user.accessToken);
    }
    dispatch(SET_IS_LOADING, false);
  });

  return (
    isLoading
    ? html`${Loading()}`
    : accessToken && user
    ? html`
      <div class="app-container">
        <div class="app-container__inner d-flex">
          ${Sidebar()}
          ${Content()}
        </div>
      </div>
    `
    : html`${Login()}`
  )
}

export default connector(App);
