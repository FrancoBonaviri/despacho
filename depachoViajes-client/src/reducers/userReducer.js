import { types } from '../store/types';

const initialState = {
    activeUser: null,
    token: null, 
}


export const userReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.login : 
            return {
                ...state,
                activeUser: action.payload.user,
                token: action.payload.token
            }
        case types.logout :
            return {
                ...state,
                activeUser: null,
                token: null
            } 
        default: 
        return {
            ...state
        }
    }



}