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
import es from 'javascript-time-ago/locale/es.json'
import { apiService } from '../services/apiService';
import TimeAgo from 'javascript-time-ago'
import { useDispatch, useSelector } from 'react-redux';
import { OpenModalViaje, UpdateTables } from '../actions/ui';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateViaje } from '../actions/viajes';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
TimeAgo.addDefaultLocale(es)

const timeAgo = new TimeAgo('es-AR')


export const ViajesHistoricos = () => {
    
    const [viajes, setViajes] = useState([]);

    const { updateTables } = useSelector(state => state.ui)
 
    useEffect(() => {
        apiService.getAllViajesAFinalizar()
        .then( res => {
        setViajes( SortViajes( res.data.Viajes ) )
        })
        .catch( err => {
        Swal.fire('Error', err.message, 'error')
        });

    }, [updateTables])
  

    const SortViajes = ( viajes ) => {
        return viajes.sort((a, b) => new Date(b.FechaConfirmacion) > new Date(a.FechaConfirmacion) ? 1: -1)
    }

    return (
        <div style={{height: '100%', border: '0.5px solid gray', borderRadius: '10px' }}>
            <TableContainer sx={{maxHeight: '87vh'}} component={Paper} >
            <Table sx={{height: '100% !important' , minWidth: '100%', backGroundColor: 'black' }} size="medium" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{ padding:'6px'}}>Direccion</TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Localidad</TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Confimado </TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Disco</TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Cliente</TableCell>
                    <TableCell sx={{ padding:'6px'}} align="left">Acciones</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {viajes.map((viaje) => (
                  <ItemListViajesHistoricos viaje={ viaje }/>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}



const ItemListViajesHistoricos = ({viaje}) => {

    const dispatch = useDispatch();


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

    const handleEditDisco = () => {
        Swal.fire({
            input: 'number',
            title: 'Ingrese el nuevo numero de disco',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: (text) => {
                apiService.cambiarDiscoViaje(viaje._id, text)
                .then( res => {
                    dispatch( UpdateTables() )
                })
                .catch( err => {
                    Swal.fire('Error', err.message, 'error');
                })
            }
          })

        
    }

    return (
    <TableRow
        key={viaje._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0} }}
        onDoubleClick={ handlePress }
        >
         <TableCell sx={{ padding:'6px'}} component="th" scope="row">
        {viaje.Calle + ' ' + viaje.Numero + ' e/ ' + viaje.EntreCalle }
        </TableCell>
        <TableCell sx={{ padding:'6px'}} align="left">{viaje.Localidad}</TableCell>
        <TableCell sx={{ padding:'6px'}} align="left">{ timeAgo.format(new Date( viaje.FechaConfirmacion )) }</TableCell>
        <TableCell sx={{ padding:'6px'}} align="left">{viaje.NumeroDisco}</TableCell>
        <TableCell sx={{ padding:'6px'}} align="left">{ viaje.CodigoCliente}</TableCell>
        <TableCell sx={{ padding:'6px'}} align="left">
            <LocalTaxiIcon sx={{ cursor: 'pointer' }} onClick={ handleEditDisco }/> /
            <EditIcon sx={{ cursor: 'pointer' }} onClick={ handleEdit }/>
        </TableCell>
        </TableRow>
    )
}