import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import TimeAgo from 'javascript-time-ago'
import Swal from 'sweetalert2';

import es from 'javascript-time-ago/locale/es.json'
import { apiService } from '../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateTables } from '../actions/ui';

TimeAgo.addDefaultLocale(es)

const timeAgo = new TimeAgo('es-AR')

export const ViajesACompletar = () => {

    
  const [viajes, setViajes] = useState([]);
  const { updateTables } = useSelector(state => state.ui)


  useEffect(() => {
    apiService.getAllViajesACompletar()
    .then( res => {
      setViajes( SortViajes(res.data.Viajes) )
    })
    .catch( err => {
      Swal.fire('Error', err.message, 'error')
    });

  }, [updateTables])




  const SortViajes = ( viajes ) => {
    return viajes.sort((a, b) => new Date(b.FechaConfirmacion) < new Date(a.FechaConfirmacion) ? 1: -1)
  }
  

    return (
    <div  style={{height: '100%', border: '0.5px solid gray', borderRadius: '10px' }}>
        <TableContainer sx={{height: '100% !important'}} component={Paper} >
        <Table sx={{height: '100% !important' , minWidth: '100%', backGroundColor: 'black' }} size="medium" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell sx={{ padding:'6px'}}>Direccion</TableCell>
                <TableCell sx={{ padding:'6px'}} align="left">Localidad</TableCell>
                <TableCell sx={{ padding:'6px'}} align="left">Confirmado </TableCell>
                <TableCell sx={{ padding:'6px'}} align="left">Cliente</TableCell>
                <TableCell sx={{ padding:'6px'}} align="left">Disco</TableCell>
                <TableCell sx={{ padding:'6px'}} align="left">Completar</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {viajes.map((viaje) => (
              <ItemListViajesACompletar viaje={ viaje } />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
    )
}



const ItemListViajesACompletar = ({ viaje }) => {

  console.log(viaje);
  const dispatch = useDispatch();

  const handleCompletar = () => {
    apiService.completarViaje(viaje._id)
    .then( res => {
      console.log(res);
      dispatch( UpdateTables() )
    })
    .catch( err => {
      Swal.fire('Error', err.message ,'error')
    })
  }



  return (
    <TableRow
    key={viaje._id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
    <TableCell sx={{ padding:'6px'}} component="th" scope="row">
      {viaje.Calle + ' ' + viaje.Numero + ' e/ ' + viaje.EntreCalle }
    </TableCell>
    <TableCell sx={{ padding:'6px'}} align="left">{viaje.Localidad}</TableCell>
    <TableCell sx={{ padding:'6px'}} align="left">{ timeAgo.format(new Date( viaje.FechaConfirmacion )) }</TableCell>
    <TableCell sx={{ padding:'6px'}} align="left">{ viaje.CodigoCliente }</TableCell>
    <TableCell sx={{ padding:'6px'}} align="left">
        <Chip label={ viaje.NumeroDisco }/>
    </TableCell>
    <TableCell sx={{ padding:'6px'}} align="left">
      <Chip label='Completar' onClick={ handleCompletar }/>
    </TableCell>
    </TableRow>
  )
}