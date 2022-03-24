import { Request, Response } from 'express';
import { Cliente } from '../models/Cliente';
import { estadoViaje, Viaje } from '../models/viaje';


class clienteController {



    static getMatchByTel = async (req: Request, res: Response) => {

        try {
            const search = req.query.search;

            const regex = new RegExp(search)

            const clientes = await Cliente.find({ NumeroTelefono: { $regex: regex } });

            return res.json({
                ok: true,
                Clientes: clientes
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    
    static getMatchByCod = async (req: Request, res: Response) => {

        try {
            const search = req.query.search 

            const regex = new RegExp(search)

            const clientes = await Cliente.find({ Codigo: { $regex: regex } });

            return res.json({
                ok: true,
                Clientes: clientes
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }


    static getLastDataByCode = async (req: Request, res: Response) => {

        try {
            const code = req.params.code;
            const cliente = await Cliente.findOne({ Codigo: code });
            if( !cliente ){
                throw new Error('No se encontro el cliente')
            }
            if( cliente.Numero ) {
                const viaje = {
                    Calle: cliente.Calle,
                    EntreCalle: cliente.EntreCalle,
                    Localidad: cliente.Localidad,
                    Numero: cliente.Numero,

                }
                return res.json({
                    ok: true,
                    Cliente: cliente,
                    Viaje: viaje
                });
            }
            const viaje = await Viaje.findOne({ CodigoCliente: code }).sort({FechaPedido: -1}).exec();

            return res.json({
                ok: true,
                Cliente: cliente,
                Viaje: viaje
            });

        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    static getLastDataByTel = async (req: Request, res: Response) => {

        try {
            const tel = req.params.tel;
            const cliente = await Cliente.findOne({ NumeroTelefono: tel });
            if( !cliente ){
                throw new Error('No se encontro el cliente')
            }
            
            const viaje = await Viaje.findOne({ CodigoCliente: cliente?.Codigo }).sort({FechaPedido: -1}).exec();
            
            return res.json({
                ok: true,
                Cliente: cliente,
                Viaje: viaje
            });
            
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }



    static getAll = async (req: Request, res: Response) => {

        try {
            
            const clientes = await Cliente.find();

            return res.json({
                ok: true,
                Clientes: clientes
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }


    static getByCode = async (req: Request, res: Response) => {

        try {

            const code = req.params.code
            
            const clientes = await Cliente.findOne({ Codigo: code });

            return res.json({
                ok: true,
                Cliente: clientes
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    static create = async ( req: Request, res: Response ) => {

        const { Nombre, Codigo, NumeroTelefono, Localidad, Calle, Numero, EntreCalle } = req.body;


        try {
            
            let cliente = {
                Nombre, Codigo, NumeroTelefono, Localidad, Calle, Numero, EntreCalle
            }

            const clienteDb = await Cliente.create(cliente);



            return res.json({
                ok: true,
                Cliente: clienteDb
            })

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    static update = async ( req: Request, res: Response ) => {
        
        let codigo = req.params.codigo;
        const { Nombre, NumeroTelefono, Numero, Localidad, Calle, EntreCalle } = req.body;


        try {
            
            let cliente = {
                Nombre, NumeroTelefono, Numero, Localidad, Calle, EntreCalle
            }

            const clienteDb = await Cliente.findOneAndUpdate({ Codigo: codigo }, cliente, { new: true });



            return res.json({
                ok: true,
                Cliente: clienteDb
            })

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }

    } 



    static delete = async ( req: Request, res: Response ) => {
        
        let id = req.params.id;

        try {
            
            await Cliente.findByIdAndDelete(id);


            return res.json({
                ok: true,
                msg: 'Cliente eliminado'
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }

    } 
}

export default clienteController;