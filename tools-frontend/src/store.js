import { createStore } from "redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localStorage";
const localstate = loadState();
const store = createStore(
  rootReducer,
  localstate,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
  saveState({
    notes: store.getState().notes,
  });
});
export default store;