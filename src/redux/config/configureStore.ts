import { applyMiddleware, compose, createStore  } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../rootReducer";
const configureStore = () => {
    const middlewares = [thunk];
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = composeEnhancer(applyMiddleware(...middlewares));
    const store = createStore(rootReducer(), enhancers);
    return store;

}

export default configureStore;