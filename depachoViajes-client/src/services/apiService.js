import axios from 'axios';


class ApiService { 

    constructor() {
        this.URL = 'http://localhost:4500'
    }


    getUsuarioById = async(id, token) => {
        const res = await axios.get(this.URL + '/usuario/' + id, { headers: { 'x-token': token } })
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    login = async( Email, Password ) => {
        const res = await axios.post(this.URL + '/usuario/login', {Email, Password})
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }



    craeteUser = async( Email, Password, UserName, PasswordRepeat ) => {
        const res = await axios.post(this.URL+ '/usuario', {Email, Password, UserName, PasswordRepeat})
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }


    getAllViajesPendientes = async () => {
        const res = await axios.get(this.URL+ '/viaje/0' )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }


    getAllViajesACompletar = async () => {
        const res = await axios.get(this.URL+ '/viaje/1' )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    getAllViajesAFinalizar = async () => {
        const res = await axios.get(this.URL+ '/viaje/2' )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    getAllViajesHistoricos = async () => {
        const res = await axios.get(this.URL+ '/viaje/3' )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }


    getbyId = async (viajeId) => {
        const res = await axios.get(this.URL+ '/viaje/byid/' + viajeId )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }





    nuevoDisco = async (Titular, Numero, TelefonoTitular, Marca, Modelo, Patente) => {
        const res = await axios.post(this.URL+ '/disco', { Titular, Numero, TelefonoTitular, Marca, Modelo, Patente } )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    nuevoChofer = async (Nombre, Telefono, NumeroDiscos, DispoId) => {

        const res = await axios.post(this.URL+ '/chofer', { Nombre, Telefono, NumeroDiscos, DispoId } )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }






    getAllDiscos = async () => {
        const res = await axios.get(this.URL+ '/disco',{} )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }


    
    getAllChoferes = async () => {
        const res = await axios.get(this.URL+ '/chofer',{} )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }


    existCliente = async ( code ) => {
        const res = await axios.get(this.URL+ '/cliente/' + code,{} )
        console.log(res);
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return !!res.data.Cliente;
    }


    
    createCliente = async (  Nombre, Codigo, NumeroTelefono ) => {
        const res = await axios.post(this.URL+ '/cliente'  , { Nombre, Codigo, NumeroTelefono} )
        console.log(res);
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }



    getAllClientes = async( ) => {
        const res = await axios.get(this.URL+ '/cliente',{} )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }




    createViaje = async (Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion) => {
        const res = await axios.post(this.URL+ '/Viaje', {Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion} )
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }

    
    createReservaViaje = async (Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion, MinutosAntesReserva, FechaReserva) => {
        const res = await axios.post(this.URL+ '/Viaje/Reservar', {Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion, MinutosAntesReserva, FechaReserva} )
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }



    updateViaje = async (viajeId, Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion) => {
        const res = await axios.put(this.URL+ '/Viaje/update/' + viajeId, {Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion} )
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }


    cambiarDiscoViaje = async (viajeId, Disco) => {
        const res = await axios.put(this.URL+ '/Viaje/updateDisco/' + viajeId, {Disco} )
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }


    confirmViaje = async (NumeroDisco, ViajeId) => {
        const res = await axios.put(this.URL+ '/Viaje/?disco=' + NumeroDisco + '&id=' + ViajeId)
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    completarViaje = async (ViajeId) => {
        const res = await axios.put(this.URL+ '/Viaje/'  + ViajeId)
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }



    getMatchByTel = async (search) => {
        const res = await axios.get(this.URL+ '/cliente/getMatch/tel?search='  + search)
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }

    getMatchByCode = async (search) => {
        const res = await axios.get(this.URL+ '/cliente/getMatch/cod?search='  + search)
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }

    getLastDataClienteByCode = async (code) => {
        const res = await axios.get(this.URL+ '/cliente/getLastData/code/'  + code)
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }

    getLastDataClienteByTel = async (code) => {
        const res = await axios.get(this.URL+ '/cliente/getLastData/tel/'  + code)
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }
    
    deleteViaje = async (ViajeId) => {
        const res = await axios.delete(this.URL+ '/Viaje/' + ViajeId)
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }


    uploadFileChofer = async ( file, id) => {
        const formData = new FormData()
        formData.append('file', file);
        const res = await axios.put(this.URL + '/chofer/uploadDoc/' + id, formData);
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }


    getPrevMessages = async ( disco ) => {
        const res = await axios.get(this.URL + '/chofer/msg/' + disco);
        if( !res.data.ok ) {
            throw new Error(res.data.msg)
        }
        return res;
    }




}


export const apiService = new ApiService();


