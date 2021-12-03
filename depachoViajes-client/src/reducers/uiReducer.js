import { types } from '../store/types';

const initialState = {
    modalNewChofer: false,
    modalNewViaje: false,
    modalNewDisco: false,
    modalNewCliente: false,
    updateTables: false,
}


export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.OpenModalChofer : 
            return {
                ...state,
                modalNewChofer: true,
            }
        case types.OpenModalCliente : 
            return {
                ...state,
               modalNewCliente: true
            }
        case types.OpenModalViaje : 
            return {
                ...state,
               modalNewViaje: true,
            }
        case types.OpenModalDisco : 
            return {
                ...state,
               modalNewDisco: true
            }

            case types.CloseModalChofer : 
            return {
                ...state,
                modalNewChofer: false,
            }
        case types.CloseModalCliente : 
            return {
                ...state,
               modalNewCliente: false
            }
        case types.CloseModalViaje : 
            return {
                ...state,
               modalNewViaje: false,
            }
        case types.CloseModalDisco : 
            return {
                ...state,
               modalNewDisco: false
            }
        case types.UpdateTables : 
        return {
            ...state,
            updateTables: !state.updateTables
        }
        default: 
        return {
            ...state
        }
    }



}