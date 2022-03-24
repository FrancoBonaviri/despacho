import { types } from "../store/types"

export const StartUpdateCliente = (clienteCode) => ({
    type: types.StartUpdateCliente,
    payload: clienteCode
})

