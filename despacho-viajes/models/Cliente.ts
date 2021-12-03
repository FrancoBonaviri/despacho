import { Schema, model, Document } from 'mongoose';


const clienteSchema = new Schema({
    
    Nombre: {
        type: String,
        required: [false]
    },
    Codigo: {
        type: String,
        required: [true, 'Debe indicar el codigo del cliente']
    },
    NumeroTelefono: {
        type: String,
        required: [true]
    }

});


clienteSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    return data;
});


interface ICliente extends Document {
    Nombre: string;
    Codigo: string;
    NumeroTelefono: string;
}

export const Cliente = model<ICliente>('Cliente', clienteSchema);