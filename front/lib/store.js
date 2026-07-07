export default function creatStore(initialState = {}) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function setState(patch) {
    state = Object.assign({}, state, patch);
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  return {
    getState,
    setState,
    subscribe,
  };
}
