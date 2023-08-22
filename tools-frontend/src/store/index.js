import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";
let store;
export function configureStore() {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, logger),
      // comment before deploy in production mode
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
}