import { html } from '../../../core'
import { connect } from '../../store';
import { AUTH_LOGOUT } from '../../store/types';

const connector = connect(state => ({
  auth: state.auth
}));

const SidebarHeader = ({ auth: { user } }) => {
  return html`
    <div class="main-sidebar__header d-flex justify-content-between align-items-center">
      <div class="main-sidebar__user-info">
        ${user.photoURL && `<img class="avatar" src="${user.photoURL}" alt="" />`}
        <span class="username">${user.displayName}</span>
      </div>
      <div class="main-sidebar__btns">
        <button onClick="dispatch('${AUTH_LOGOUT}')" type="button" class="btn shadow-none btn-sm d-flex align-items-center">
          <svg t="1652502068760" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1907" width="200" height="200"><path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5-32.6 32.5-70.5 58.1-112.7 75.9-43.6 18.4-90 27.8-137.9 27.8-47.9 0-94.3-9.4-137.9-27.8-42.2-17.8-80.1-43.4-112.7-75.9-32.6-32.5-58.1-70.4-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-0.4-12.3-6.7-12.3z" p-id="1908"></path><path d="M956.9 505.7L815 393.7c-5.3-4.2-13-0.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112c4.1-3.2 4.1-9.4 0-12.6z" p-id="1909"></path></svg>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  `;
}

export default connector(SidebarHeader);
