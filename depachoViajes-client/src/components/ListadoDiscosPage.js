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
import { OpenModalDisco } from '../actions/ui';



export const ListadoDiscosPage = () => {


    const [discos, setDiscos] = useState([])


    useEffect(() => {
        apiService.getAllDiscos()
        .then( res => {
            setDiscos( res.data.Discos )
        })
    }, [])


    
    return (
        <div style={{ margin: '10px', minHeight: '87.9vh' }}>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Disco</TableCell>
                        <TableCell align="right">Titular</TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">Marca</TableCell>
                        <TableCell align="right">Modelo</TableCell>
                        <TableCell align="right">Patente</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {discos.map((disco) => (
                        <ItemListDisco disco={disco}/>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}



const ItemListDisco = ( {disco} ) => {


    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch( OpenModalDisco() );   
    }

    return (
        <TableRow
        key={disco.Numero}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row" sx={{ cursor: 'pointer', '&:hover': { color: 'blue' }}} onClick={ handleEdit }>
            {disco.Numero}
        </TableCell>
        <TableCell align="right">{disco.Titular}</TableCell>
        <TableCell align="right">{disco.TelefonoTitular}</TableCell>
        <TableCell align="right">{disco.Marca}</TableCell>
        <TableCell align="right">{disco.Modelo}</TableCell>
        <TableCell align="right">{disco.Patente}</TableCell>
        </TableRow>
    )



}