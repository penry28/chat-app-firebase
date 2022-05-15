/**
 * Create Store
 * @param {callback} reducer
 */
const createStore = (reducer) => {
  let state = reducer();
  let useStateData = {
    count: 0,
    newValue: null
  };
  let useEffectData = {
    count: 0,
  };
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
      const prevState = state;
      state = reducer(state, action, ...args);

      if (JSON.stringify(prevState) !== JSON.stringify(state)) {
        return render();
      }
      return;
    },
    useState(init) {
      useStateData.count++;
      if (useStateData.count > 1 && useStateData.newData) {
        init = useStateData.newData;
      }
      const setFunction = (newData) => {
        if (typeof newData === 'function') {
          useStateData.newData = newData();
        } else {
          useStateData.newData = newData;
        }
        return render();
      }
      return [init, setFunction];
    },
    useEffect(func, dependencies = null) {
      useEffectData.count++;
      if (Array.isArray(dependencies) && !dependencies.length && useEffectData.count <= 1) {
        func();
      }
    }
  };
};

export const storeLogger = (reducer) => {
  return (prevState, action, args) => {
    // console.group(action);
    // console.table([{ state: prevState, args: args }])
    const nextState = reducer(prevState, action, args);
    // console.table([{ state: nextState, args: args }])
    // console.groupEnd();
    return nextState;
  }
}

export default createStore;
