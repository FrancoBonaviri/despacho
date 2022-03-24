import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiService } from '../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { OpenModalChofer, OpenModalCliente, UpdateTables } from '../actions/ui';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { StartUpdateCliente } from '../actions/clientes';





export const ListadoClientesPage = () => {


    
    const [clientes, setClientes] = useState([]);
    const { updateTables } = useSelector(state => state.ui)

    useEffect(() => {
        apiService.getAllClientes()
        .then( res => {
            setClientes(res.data.Clientes)
        })
    }, [updateTables])


    return (
        <div style={{ margin: '10px', minHeight: '87.9vh' }}>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">Codigo</TableCell>
                        <TableCell align="right">Editar</TableCell>
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
        dispatch( StartUpdateCliente(cliente.Codigo))
        dispatch( OpenModalCliente() );   
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Desea eliminar el cliente??',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: (text) => {
              apiService.deleteCliente( cliente._id )
              .then( res => {
                console.log(res);
                dispatch( UpdateTables() )
              })
              .catch( err => {
                Swal.fire('Error', err.message, 'error')
              })
            }
          })
    }


    return (
        <TableRow
        key={cliente._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row"  >
            {cliente.Nombre}
        </TableCell>
        <TableCell align="right">{cliente.NumeroTelefono}</TableCell>
        <TableCell align="right">{cliente.Codigo}</TableCell>
        <TableCell align="right">
            <EditIcon sx={{ cursor: 'pointer' }} onClick={ handleEdit }/>
            <DeleteIcon sx={{ cursor: 'pointer' }} onClick={ handleDelete }/>
        </TableCell>
        </TableRow>
    )



}