import { html, styleSheet } from "../core";
import { OPEN_POPUP_LOGIN } from './store/types';

styleSheet`
.login-page {
  width: 100%;
  height: 100vh;
}
.login-page__inner {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2)
}
`;

const Login = () => {
  return html`
    <div class="login-page d-flex justify-content-center align-items-center">
      <div class="login-page__inner">
        <h1 class="heading mb-4">Firebase Chat App</h1>
        <button type="button" onClick="dispatch('${OPEN_POPUP_LOGIN}', 'facebook')" class="btn btn-primary shadow-none btn-sm btn-block">Đăng nhập với Facebook</button>
      </div>
    </div>
  `;
}

export default Login;
