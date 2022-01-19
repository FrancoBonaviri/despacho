import { types } from '../store/types';

const initialState = {
    modalNewChofer: false,
    modalNewViaje: false,
    modalNewDisco: false,
    modalNewCliente: false,
    modalCalculadora: false,
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
        case types.OpenModalCalculadora : 
        return {
            ...state,
            modalCalculadora: true
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
        case types.CloseModalCalculadora : 
        return {
            ...state,
            modalCalculadora: false
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