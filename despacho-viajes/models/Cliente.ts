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
    },
    Localidad: {
        type: String,
        required: [true]
    },
    Calle: {
        type: String,
        required: [true]
    },
    Numero: {
        type: String,
        required: [true]
    },
    EntreCalle: {
        type: String,
        required: [true]
    },

});


clienteSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    return data;
});


interface ICliente extends Document {
    Nombre: string;
    Codigo: string;
    NumeroTelefono: string;
    Localidad: string;
    Calle: string;
    Numero: string;
    EntreCalle: string;
}

export const Cliente = model<ICliente>('Cliente', clienteSchema);