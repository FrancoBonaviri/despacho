import { Schema, model, Document } from 'mongoose';


const viajeSchema = new Schema({

    Calle: {
        type: String,
        required: [true, 'La calle necesaria']
    },
    Numero: {
        type: String,
        required: [true, 'El numero de calle es necesario']
    },
    EntreCalle: {
        type: String,
        required: [true, 'Las Entre Calles son necesarias']
    },
    Localidad: {
        type: String,
        required: [true, "La localidad es necesaria"]
    },
    NumeroDisco: {
        type: String,
    },
    Estado: {
        type: String,
        required: [ true, 'El estado es necesario' ]
    },
    FechaPedido: {
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    FechaConfirmacion: {
        type: Date
    },
    PedidoPorWsp: {
        type: Boolean,
        default: false
    },
    PedidoTelefono: {
        type: Boolean,
        default: false
    },
    CodigoCliente: {
        type: String
    },
    Comentario: {
        type: String
    },
    Condicion: [{type: String}],
    Reserva: {
        type: Boolean,
        default: false
    },
    MinutosAntesReserva: {
        type: String
    },
    FechaReserva: {
        type: Date,
    }
});

export enum estadoViaje {
    Pendiente,
    ACompletar,
    EnCurso, 
    Finalizado
};


viajeSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    return data;
});


interface IViaje extends Document {
    Calle: string;
    Numero: string;
    EntreCalle: string;
    Estado: string;
    NumeroDisco: string;
    FechaPedido: Date;
    FechaConfirmacion: Date;
    PedidoPorWsp: Boolean;
    PedidoTelefono: Boolean;
    CodigoCliente: string;
    Comentario: string;
    Condicion: Array<string>;
    Reserva: Boolean;
    MinutosAntesReserva: String;
    FechaReserva: Date;
}


export const Viaje = model<IViaje>('Viaje', viajeSchema);