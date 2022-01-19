import { Request, Response } from 'express';
import { Cliente } from '../models/Cliente';
import { Disco } from '../models/Disco';
import { estadoViaje, Viaje } from '../models/viaje';
import { SocketService } from '../services/SocketService';


class viajeController {


    static getAll = async (req: Request, res: Response) => {

        
        try {
            
            let estado = req.params.state;
            

            if( !estado ) {
                estado = '0'
            }


            const viajes = await Viaje.find({ Estado: estado, FechaPedido: { $gt: new Date('2000-01-01'), $lt: new Date() } });

            return res.json({
                ok: true,
                Viajes: viajes
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }



    
    static getbyId = async (req: Request, res: Response) => {

        
        try {
            
            let id = req.params.id;
        


            const viaje = await Viaje.findById(id);

            return res.json({
                ok: true,
                viaje
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }


    
    static createReserva = async ( req: Request, res: Response ) => {

        const { Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion, MinutosAntesReserva, FechaReserva } = req.body;
        
        const viaje = {
            Calle,
            Numero, 
            EntreCalle, 
            Localidad,
            FechaPedido: new Date(FechaReserva).setMinutes( new Date(FechaReserva).getMinutes() - Number( MinutosAntesReserva ) ),
            Estado: estadoViaje.Pendiente,
            CodigoCliente,
            PedidoTelefono: !!PedidoTelefono,
            PedidoPorWsp: !!PedidoPorWsp,
            Comentario,
            Condicion,
            Reserva: true,
            MinutosAntesReserva,
            FechaReserva
        };
        


        try {
            
            const viajeDb = await Viaje.create(viaje);

            if( CodigoCliente?.trim() != ''  && Telefono?.trim() != '' && !(await Cliente.exists({ Codigo: CodigoCliente })) ){
                await Cliente.create({ NumeroTelefono: Telefono, Codigo: CodigoCliente })
            }

            return res.json({
                ok: true,
                Viaje: viajeDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }


    static create = async ( req: Request, res: Response ) => {

        const { Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion } = req.body;


        const viaje = {
            Calle,
            Numero, 
            EntreCalle, 
            Localidad,
            FechaPedido: new Date(),
            Estado: estadoViaje.Pendiente,
            CodigoCliente,
            PedidoTelefono: !!PedidoTelefono,
            PedidoPorWsp: !!PedidoPorWsp,
            Comentario,
            Condicion
        };
        try {
            
            const viajeDb = await Viaje.create(viaje);

            if( CodigoCliente?.trim() != ''  && Telefono?.trim() != '' && !(await Cliente.exists({ Codigo: CodigoCliente })) ){
                await Cliente.create({ NumeroTelefono: Telefono, Codigo: CodigoCliente })
            }

            return res.json({
                ok: true,
                Viaje: viajeDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }


    } 


    // confirma el viaje (le asigna el disco que va a ir )
    static confirm = async ( req: Request, res: Response ) => {

        const disco = req.query.disco;

        const id = req.query.id;


        if( !id || !disco ) {
           throw new Error('Debe indicar el id y el disco del viaje');
        }
 
        const body: any = {
            NumeroDisco: disco,
            Estado: estadoViaje.EnCurso,
            FechaConfirmacion: new Date()
        }


        try {
            
            if( ! (await Disco.exists({ Numero: disco })) ) {
                return res.json({
                    ok: false,
                    err: "El Numero de disco no existe"
                });
            }

            const viajeDb = await Viaje.findByIdAndUpdate(id, body, {new : true } );

            if( !viajeDb ){
                throw new Error("No se encontro el viaje.")
            }

            SocketService.emit(viajeDb.NumeroDisco || '', 'Viaje a finalizar en: ' + viajeDb.Calle + ' ' + viajeDb.Numero + ' e/ ' + viajeDb.EntreCalle + ' \n Observaciones: ' + viajeDb.Comentario )

            console.log("TODO AVISAR AL CLIENTE POR WSP")




            return res.json({
                ok: true,
                Viaje: viajeDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }


    } 

    // completa el viaje (le dice al chofer la direccion final)
    //DEPRECATED
    static completar = async ( req: Request, res: Response ) => {

        const id = req.params.id;

        const body: any = {
            Estado: estadoViaje.EnCurso,
        }

        if( !id ) {
            throw new Error('Debe indicar el id del viaje');
        }
  

        try {

            const viajeDb = await Viaje.findByIdAndUpdate(id, body, {new : true } );

            if( !viajeDb ){
                throw new Error("No se encontro el viaje.")
            }

            
            SocketService.emit(viajeDb.NumeroDisco || '', 'Viaje a finalizar en: ' + viajeDb.Calle + ' ' + viajeDb.Numero + ' e/ ' + viajeDb.EntreCalle + ' \n Observaciones: ' + viajeDb.Comentario )
            

            return res.json({
                ok: true,
                Viaje: viajeDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }


    } 

    // finaliza el viaje
    static finalizar = async ( req: Request, res: Response ) => {

        const id = req.query.id;

        const body: any = {
            Estado: estadoViaje.Finalizado,
        }

        if( !id ) {
            throw new Error('Debe indicar el id del viaje');
        }

        try {
            
            const viajeDb = await Viaje.findByIdAndUpdate(id, body, {new : true } );

            return res.json({
                ok: true,
                Viaje: viajeDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }


    } 




    static update = async (req: Request, res: Response) => {
        
        const id = req.params.id;

        const { Calle, Numero, EntreCalle, Localidad, CodigoCliente, PedidoPorWsp, PedidoTelefono, Comentario, Telefono, Condicion } = req.body;

        const body: any = {
            Calle, 
            Numero, 
            EntreCalle, 
            Localidad, 
            CodigoCliente, 
            PedidoPorWsp, 
            PedidoTelefono, 
            Comentario, 
            Telefono,
            Condicion
        }

        if( !id ) {
            throw new Error('Debe indicar el id del viaje');
        }

        try {
            
            const viajeDb = await Viaje.findByIdAndUpdate(id, body, {new : true } );

            if( viajeDb?.Estado == '2') {
                SocketService.emit(viajeDb.NumeroDisco || '', 'Viaje ACTUALIZADO en: ' + viajeDb.Calle + ' ' + viajeDb.Numero + ' e/ ' + viajeDb.EntreCalle + ' \n Observaciones: ' + viajeDb.Comentario )

            }

            return res.json({
                ok: true,
                Viaje: viajeDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }

    static cambiarDisco = async (req: Request, res: Response) => {
        
        const id = req.params.id;

        const { Disco } = req.body;

        const body: any = {
            NumeroDisco: Disco 
        }

        if( !id ) {
            throw new Error('Debe indicar el id del viaje');
        }

        
        try {
            
            const viaje = await Viaje.findById(id);
            
            if( !viaje || viaje.Estado != '2' ) {
                throw new Error('No se le puede cambiar el disco a dicho viaje');
            } 

            // Le aviso al chofer anterior que se le cancelo el viaje => 
            SocketService.emit(viaje.NumeroDisco, 'Viaje en: ' + viaje.Calle + ' ' + viaje.Numero + ' CANCELADO')



            const viajeDb = await Viaje.findByIdAndUpdate(id, body, {new : true } );

            if( !viajeDb ){
                throw new Error("No se encontro el viaje.")
            }
            // Le aviso del viaje al nuevo chofer
            SocketService.emit(viajeDb.NumeroDisco || '', 'Viaje a finalizar en: ' + viajeDb.Calle + ' ' + viajeDb.Numero + ' e/ ' + viajeDb.EntreCalle + ' \n Observaciones: ' + viajeDb.Comentario )

            

            return res.json({
                ok: true,
                Viaje: viajeDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }


    static delete = async ( req: Request, res: Response ) => {

        const id = req.params.id;


        try {
            
            await Viaje.findByIdAndDelete( id );

            return res.json({
                ok: true,
                message: "El viaje fue eliminado correctamente"
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }     
    }

    

}

export default viajeController;