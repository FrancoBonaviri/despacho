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
import { OpenModalChofer } from '../actions/ui';



export const ListadoChoferesPage = () => {


    const [choferes, setChoferes] = useState([]);


    useEffect(() => {
        apiService.getAllChoferes()
        .then( res => {
            console.log(res);
            setChoferes(res.data.Choferes)
        })
    }, [])

    return (
        <div style={{ margin: '10px', minHeight: '87.9vh' }}>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Dispositivo</TableCell>
                        <TableCell align="right">Telefono</TableCell>
                        <TableCell align="right">Discos</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {choferes.map((chofer) => (
                        <ItemListChofer chofer={chofer}/>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}



const ItemListChofer = ( {chofer} ) => {


    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch( OpenModalChofer() );   
    }

    return (
        <TableRow
        key={chofer._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row" sx={{ cursor: 'pointer', '&:hover': { color: 'blue' }}} onClick={ handleEdit }>
            {chofer.Nombre}
        </TableCell>
        <TableCell align="right">{chofer.DispoId}</TableCell>
        <TableCell align="right">{chofer.Telefono}</TableCell>
        <TableCell align="right">{chofer.NumeroDiscos.join()}</TableCell>
        </TableRow>
    )



}