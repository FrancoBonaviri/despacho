import { types } from '../store/types';

const initialState = {
    viajesPendientes: [],
    viajesHistoricos: [], 
    viajesACompletar: [],
    updateViajeId: null,
}


export const viajesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.ObtenerViajesPendientes : 
            return {
                ...state,
                viajesPendientes: [ ...action.payload ],
            }
        case types.ObtenerViajesHistoricos :
            return {
                ...state,
                viajesHistoricos: [ ...action.payload ],
            } 
        case types.ObtenerViajesACompletar :
            return {
                ...state,
                viajesACompletar: [ ...action.payload ],
            } 
        case types.UpdateViaje :
        return {
            ...state,
            updateViajeId: action.payload ,
        } 
        default: 
        return {
            ...state
        }
    }



}