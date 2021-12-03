import { apiService } from '../services/apiService'
import { types } from '../store/types'
import Swal from 'sweetalert2';



export const startCreateUser = (email, password, userName, passwordRepeat) => {
    return (dispatch) => {
        return apiService.craeteUser(email, password, userName, passwordRepeat)
        .then( res => {
            dispatch( startLogin( email, password ) );
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
        })
    }
}

export const startLogin = ( email, password ) => {
    return (dispatch) => {

        return apiService.login(email, password)
        .then( res => {
            console.log(res);
            dispatch( login(res.data.user, res.data.token) )
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
        })


    }
}

export const logout = () => ({
    type: types.logout
})


const login = (user, token) => ({
    type: types.login,
    payload: {
        user, 
        token
    }
})