import { Request, Response } from 'express';
import { Chofer } from '../models/Chofer';
import { Viaje } from '../models/viaje';
const path = require('path');

class choferController {


    static getAll = async (req: Request, res: Response) => {

        
        try {
            
            const choferes = await Chofer.find();

            return res.json({
                ok: true,
                Choferes: choferes
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }

    static create = async ( req: Request, res: Response ) => {

        const { Nombre, Telefono, NumeroDiscos, DispoId } = req.body;


        const chofer = {
            Nombre, Telefono, NumeroDiscos, DispoId
        };
        try {
            
            const choferDb = await Chofer.create(chofer);

            return res.json({
                ok: true,
                Chofer: choferDb
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


        if( !id ) {
            throw new Error('Debe indicar el id del chofer');
        }

        try {
            
            await Chofer.findOneAndDelete({ id: id });

            return res.json({
                ok: true,
                message: "El Chofer fue eliminado correctamente"
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
        const { Nombre, Telfono, NumeroDiscos } = req.body;


        const chofer: any = {
            Nombre, Telfono, NumeroDiscos
        };

        Object.keys(chofer).forEach( key => {
            if( !chofer[key] ) {
                delete chofer[key]
            } 
        })

        try {
            
            const choferDb = await Chofer.findOneAndUpdate({id: id}, chofer, { new : true });

            return res.json({
                ok: true,
                Chofer: choferDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }


    } 

    static uploadDoc = async ( req: Request, res: Response ) => {
        const files = req.files;
        const id = req.params.id;

        if( !(files?.file) ) {
            return res.json({
                ok: false,
                err:'debe enviar un archivo con el nombre de "file" '
            });
        }


        try {
            
            files.file.mv(path.join(__dirname + '/../assets/choferesdoc/' + id +'.'+ files.file.name.split('.')[1]));

            return res.json({
                ok: true,
            });

        } catch (error: any) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }
        
    }


    static isValidDispo = async (req: Request, res: Response ) => {
        try {
            
            const dispoId = req.params.dispo;


            const chofer = await Chofer.findOne({ DispoId: dispoId });


            if( chofer ) {
                return res.json({
                    ok: true,
                    chofer: chofer
                });
            }

            return res.json({
                ok: false,
                msg: 'dispositivo no encontrado'
            });

        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }


    static getPrevMessages = async (req: Request, res: Response ) => {
        try {
            
            const disco = req.params.disco;            


            let messages = [];
            const viajes = await Viaje.find({ $and: [{ Estado: {$in: ['2','3','4']}}, { NumeroDisco: disco } ] });


            viajes.forEach( viaje => {
                messages.push('Viaje a finalizar en: ' + viaje.Calle + ' ' + viaje.Numero + ' e/ ' + viaje.EntreCalle + ' \n Observaciones: ' + viaje.Comentario )
            })

            return res.json({
                ok: true,
                messages
            });
            

        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }

}

export default choferController;