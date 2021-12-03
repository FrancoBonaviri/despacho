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
import { OpenModalChofer, OpenModalCliente } from '../actions/ui';

export const ListadoClientesPage = () => {


    
    const [clientes, setClientes] = useState([]);


    useEffect(() => {
        apiService.getAllClientes()
        .then( res => {
            console.log(res);
            setClientes(res.data.Clientes)
        })
    }, [])


    return (
        <div style={{ margin: '10px', minHeight: '87.9vh' }}>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">Codigo</TableCell>
                        <TableCell align="right">CantidadViajes</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {clientes.map((cliente) => (
                        <ItemListCliente cliente={cliente}/>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}



const ItemListCliente = ( {cliente} ) => {


    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch( OpenModalCliente() );   
    }

    return (
        <TableRow
        key={cliente._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row" sx={{ cursor: 'pointer', '&:hover': { color: 'blue' }}} onClick={ handleEdit }>
            {cliente.Nombre}
        </TableCell>
        <TableCell align="right">{cliente.NumeroTelefono}</TableCell>
        <TableCell align="right">{cliente.Codigo}</TableCell>
        <TableCell align="right">En Desarrollo</TableCell>
        </TableRow>
    )



}