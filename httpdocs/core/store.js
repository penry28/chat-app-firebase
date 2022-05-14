/**
 * Create Store
 * @param {callback} reducer
 */
const createStore = (reducer) => {
  let state = reducer();
  const roots = new Map();

  function render() {
    for(const [root, component] of roots) {
      root.innerHTML = component();
    }
  }

  return {
    attach(component, root) {
      roots.set(root, component);
      return render();
    },
    /**
     * @params {} selector > View có thể có nhiều màn hình
     * Giả sử chúng ta đang ở màn hình home, thì chúng ta có thể không cần tất cả dữ liệu trong màn store
     * mà chỉ cần một vài dữ liệu trong màn hình home (Tóm lại nó dùng để lựa chọn một dữ liệu trong store)
     */
    connect(selector = state => state) {
      return component => (props, ...args) => (
        component(Object.assign({}, props, selector(state), ...args))
      )
    },
    dispatch(action, ...args) {
      // Trả ra giá trị trước đó của state
      // Dựa vào action để sửa state
      state = reducer(state, action, ...args);
      return render();
    }
  };
};

export default createStore;
