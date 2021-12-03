import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiService } from '../services/apiService';
import { useDispatch } from 'react-redux';





export const ListadoViajesHistoricos = () => {
   
    const [viajes, setViajes] = useState([])


    useEffect(() => {
        apiService.getAllViajesHistoricos()
        .then( res => {
            setViajes( res.data.Viajes )
        })
    }, [])


    
    return (
        <div style={{ margin: '10px', minHeight: '87.9vh' }}>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Direccion</TableCell>
                        <TableCell align="right">Localidad</TableCell>
                        <TableCell align="right">Cliente</TableCell>
                        <TableCell align="right">Disco</TableCell>
                        <TableCell align="right">Finalizado</TableCell>
                        <TableCell align="right">Asignado por</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {viajes.map((viaje) => (
                        <ItemListViajeHistorico viaje={viaje}/>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}



const ItemListViajeHistorico = ( {viaje} ) => {


    const dispatch = useDispatch();

    const handleEdit = () => {
    }

    return (
        <TableRow
        key={viaje._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row" sx={{ cursor: 'pointer', '&:hover': { color: 'blue' }}} onClick={ handleEdit }>
            {viaje.Calle + ' ' + viaje.Numero + ' e/ ' + viaje.EntreCalle }
        </TableCell>
        <TableCell align="right">{viaje.Localidad}</TableCell>
        <TableCell align="right">{viaje.CodigoCliente}</TableCell>
        <TableCell align="right">{viaje.NumeroDisco}</TableCell>
        <TableCell align="right">hace 3 meses</TableCell>
        <TableCell align="right">Usuario 1</TableCell>
        </TableRow>
    )



}