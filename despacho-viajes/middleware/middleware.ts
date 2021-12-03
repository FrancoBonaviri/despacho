import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";




export const BodyValidator = ( req: Request, res: Response, next: NextFunction ) => {

    const errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.json({
            ok: false,
            errors: errors.array()
        });
    }
    

    next();
}




export const ValidCreateViaje = ( req: Request, res: Response, next: NextFunction ) => {

    let { PedidoPorWsp, PedidoTelefono } = req.body;


    // if( !PedidoPorWsp && !PedidoTelefono ) {
    //     return res.json({ 
    //         ok: false,
    //         error: 'Debe indicar si el viaje es por wsp o por telefono'
    //     });
    // }
    

    next();
}