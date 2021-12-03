import { Request, Response } from 'express';
import { Disco } from '../models/Disco';
import { SocketService } from '../services/SocketService';


class discoController {


    static getAll = async (req: Request, res: Response) => {

        
        try {
            
            const discos = await Disco.find();

            return res.json({
                ok: true,
                Discos: discos
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }

    static create = async ( req: Request, res: Response ) => {

        const { Titular, Numero, TelefonoTitular, Marca, Modelo,Patente } = req.body;


        const disco = {
            Titular,
            Numero,
            TelefonoTitular,
            Marca,
            Modelo,
            Patente
        };
        try {
            
            const discoDb = await Disco.create(disco);

            return res.json({
                ok: true,
                Disco: discoDb
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
            
            await Disco.findOneAndDelete({ id: id });

            return res.json({
                ok: true,
                message: "El disco fue eliminado correctamente"
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }     
    }

    static update = async ( req: Request, res: Response ) => {

        const id = req.params.id;
        const { Titular, TelefonoTitular, Marca, Modelo,Patente } = req.body;


        const disco: any = {
            Titular, 
            TelefonoTitular, 
            Marca, 
            Modelo,
            Patente
        };

        Object.keys(disco).forEach( key => {
            if( !disco[key] ) {
                delete disco[key]
            } 
        })

        try {
            
            const discoDb = await Disco.findOneAndUpdate({id: id}, disco, { new : true });

            return res.json({
                ok: true,
                Disco: discoDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }


    } 

}

export default discoController;