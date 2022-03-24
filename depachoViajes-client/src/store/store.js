import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { clientesReducer } from '../reducers/clienteReducer';
import { uiReducer } from '../reducers/uiReducer';
import { userReducer } from '../reducers/userReducer';
import { viajesReducer } from '../reducers/viajesReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    user: userReducer,
    ui: uiReducer,
    viajes: viajesReducer,
    clientes: clientesReducer
});


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);