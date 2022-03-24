import { types } from '../store/types';

const initialState = {
    clienteCode: null,
}


export const clientesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.StartUpdateCliente : 
            return {
                ...state,
                clienteCode: action.payload
            }
        default: {
            return {
                ...state
            }
        }
    }



}