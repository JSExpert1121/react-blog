import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import tokenHelper from './actions/token'

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('hit!t-state');
        if (serializedState === null) {
            return {};
        }

        return JSON.parse(serializedState);
    } catch (error) {
        return {};
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('hit!t-state', serializedState);
    } catch (error) {
        console.log('Local Storage: Save failed with code ', error);
    }
};

const peristedState = loadState();
export default function configureStore() {
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        peristedState,
        storeEnhancers(applyMiddleware(thunk))
    );

    if (peristedState.user) {
        tokenHelper.setToken(store.dispatch, peristedState.user.token, peristedState.user.refresh_token, peristedState.user.tokenTime)
    }

    store.subscribe(() => {
        saveState(store.getState());
    });

    return store;
}
