import { Schema, model, Document } from 'mongoose';


const usuarioSchema = new Schema({


});


usuarioSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    return data;
});


interface IUsuario extends Document {
    Titular: string,
    Numero: string,
    TelefonoTitular: string,
    Marca: string,
    Modelo: string,
    Patente: string,
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);