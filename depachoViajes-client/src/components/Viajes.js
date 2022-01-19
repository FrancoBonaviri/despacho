import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Swal from 'sweetalert2';
import { apiService } from '../services/apiService';
import TimeAgo from 'javascript-time-ago'
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';

// English.
import es from 'javascript-time-ago/locale/es.json'
import { useDispatch, useSelector } from 'react-redux';
import { OpenModalViaje, UpdateTables } from '../actions/ui';
import { UpdateViaje } from '../actions/viajes';

TimeAgo.addDefaultLocale(es)

// Create formatter (English).
const timeAgo = new TimeAgo('es-AR')

export const Viajes = () => {
    

  const [viajes, setViajes] = useState([]);
  const { updateTables } = useSelector(state => state.ui)



  useEffect(() => {
    apiService.getAllViajesPendientes()
    .then( res => {
      setViajes( SortViajes( res.data.Viajes ) )
    })
    .catch( err => {
      Swal.fire('Error', err.message, 'error')
    });

  }, [updateTables])



  const SortViajes = ( viajes ) => {
    return viajes.sort((a, b) => new Date(b.FechaPedido) < new Date(a.FechaPedido) ? 1: -1)
  }



  console.log(viajes);

    return (
        <div style={{border: '0.5px solid gray', borderRadius: '10px' }}>
            <TableContainer component={Paper} sx={{maxHeight: '87vh'}}>
            <Table sx={{ minWidth: '100%', backGroundColor: 'black' }} size="medium" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{ padding:'6px'}}>Direccion</TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Localidad</TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Pedido </TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Cliente</TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Disco</TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Editar</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {viajes.map((viaje) => (
                  <ItemListViaje viaje={ viaje } />
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}




const ItemListViaje = ({ viaje }) => {


  const dispatch = useDispatch();

  const [bgColor, setBgColor] = useState('none')

  useEffect(() => {
    
    let fechaCreacion = moment( new Date( viaje.FechaPedido ));

    if( fechaCreacion.isBefore( moment().subtract(5, 'minutes' ) ) ){
      setBgColor('goldenrod')
    }

    if( fechaCreacion.isBefore( moment().subtract(10, 'minutes' ) ) ){
      setBgColor('red')
    }


  }, [viaje])




  const handleAsignarDisco = () => {
    Swal.fire({
      input: 'number',
      title: 'Ingrese el numero de disco',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        apiService.confirmViaje( text, viaje._id )
        .then( res => {
          console.log(res);
          dispatch( UpdateTables() )
        })
        .catch( err => {
          Swal.fire('Error', err.toString(), 'error')
        })
      }
    })
  }

  const handlePress = () => {
    Swal.fire({
      title: 'Desea eliminar el viaje??',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        apiService.deleteViaje( viaje._id )
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

  const handleEdit = () => {
    dispatch( UpdateViaje( viaje._id ) )
    dispatch( OpenModalViaje() )
  }

  return (
    <TableRow
    key={viaje._id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: bgColor }}
    onDoubleClick={ handlePress }
    
    >
      <TableCell sx={{ padding:'6px'}} component="th" scope="row">
          {viaje.Calle + ' ' + viaje.Numero + ' e/ ' + viaje.EntreCalle }
      </TableCell>
      <TableCell sx={{ padding:'6px'}} align="left">{viaje.Localidad}</TableCell>
      <TableCell sx={{ padding:'6px'}} align="left">{ timeAgo.format(new Date( viaje.FechaPedido )) }</TableCell>
      <TableCell sx={{ padding:'6px'}} align="left">{viaje.CodigoCliente}</TableCell>
      <TableCell sx={{ padding:'6px'}} align="left">
          <Chip label='Asignar' onClick={ handleAsignarDisco }/>
      </TableCell>
      <TableCell sx={{ padding:'6px'}} align="left">
          <EditIcon sx={{ cursor: 'pointer' }} onClick={ handleEdit }/>
      </TableCell>
    </TableRow>
  )


} 