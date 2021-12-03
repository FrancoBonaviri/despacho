import { Schema, model, Document } from 'mongoose';


const choferSchema = new Schema({
    NumeroDiscos: [{type: String}],
    Telefono: {
        type: String,
        required: [true, "El numero de telefono es requerido"]
    },
    Nombre: { 
        type: String
    },
    DispoId:{
        type: String,
        required: [true, 'Debe indicar el ID del telefono del chofer']
    }
});


choferSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    return data;
});


interface IChofer extends Document {
    NumeroDiscos: Array<string>,
    Telefono: string,
    Nombre: string,
    DispoId: string
}

export const Chofer = model<IChofer>('Chofer', choferSchema);