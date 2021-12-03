import { types } from "../store/types";

export const UpdateViaje = ( viajeId ) => ({
    type: types.UpdateViaje,
    payload: viajeId
})