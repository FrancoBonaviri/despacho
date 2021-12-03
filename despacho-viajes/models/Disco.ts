import { Schema, model, Document } from 'mongoose';


const discoSchema = new Schema({

    Titular: {
        type: String,
        required: [true, 'El titular es necesario']
    },
    Numero: {
        type: String,
        required: [true, 'El numero de disco es necesario']
    },
    TelefonoTitular: {
        type: String,
        required: [true, 'El Telefono del Titular de disco es necesario']
    },
    Marca: {
        type: String,
        required: [true, 'La Marca de disco es necesario']
    },
    Modelo: {
        type: String,
        required: [true, 'El Modelo de disco es necesario']
    },
    Patente: {
        type: String,
        required: [true, 'La Patente de disco es necesario']
    }

});


discoSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    return data;
});


interface IDisco extends Document {
    Titular: string,
    Numero: string,
    TelefonoTitular: string,
    Marca: string,
    Modelo: string,
    Patente: string,
}

export const Disco = model<IDisco>('Disco', discoSchema);