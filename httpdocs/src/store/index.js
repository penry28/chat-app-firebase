import createStore from "../../core/store";
import reducer from "./reducer";

const { attach, connect, dispatch } = createStore(reducer);

window.dispatch = dispatch;

export {
  attach,
  connect
}