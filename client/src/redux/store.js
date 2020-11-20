import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import rootSagas from "./root.sagas";
import rootReducer from "./root.reducer";
import { persistStore } from "redux-persist";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleWare = createSagaMiddleWare();

const middleWares = [sagaMiddleWare];

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middleWares))
);

sagaMiddleWare.run(rootSagas);
export const persistor = persistStore(store);

export default { store, persistor };
