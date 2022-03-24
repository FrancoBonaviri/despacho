import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useDispatch, useSelector } from 'react-redux';
import { CloseModalCliente, CloseModalDisco, UpdateTables } from '../actions/ui';
import { apiService } from '../services/apiService';
import Swal from 'sweetalert2';
import { FinishUpdateCliente, StartUpdateCliente } from '../actions/clientes';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  //   width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};  


export const NewClienteModal = () => {



    const { modalNewCliente }= useSelector(state => state.ui)
    const { clienteCode }= useSelector(state => state.clientes)

    const dispatch = useDispatch()


    const [formValues, setformValues] = useState({
        codigo: '',
        nombre: '',
        telefono: '',
        localidad: '', 
        calle: '', 
        numero: '', 
        entreCalle: ''
    });

    useEffect(() => {
        if(  !modalNewCliente ) {
            setformValues({
                codigo: '',
                nombre: '',
                telefono: '',
                localidad: '', 
                calle: '', 
                numero: '', 
                entreCalle: ''
            })
        }
    }, [modalNewCliente])


    useEffect(() => {
        if( clienteCode?.trim() && modalNewCliente ) {
            apiService.getClienteByCode(clienteCode)
            .then( res => {
                setformValues({
                    ...formValues, 
                    codigo: res.data.Cliente.Codigo,
                    nombre: res.data.Cliente.Nombre, 
                    telefono: res.data.Cliente.NumeroTelefono,
                    localidad: res.data.Cliente.Localidad,
                    calle: res.data.Cliente.Calle,
                    numero: res.data.Cliente.Numero,
                    entreCalle: res.data.Cliente.EntreCalle

                });
            })
            .catch( err => { 
                Swal.fire( err.message )
            })
        }
    }, [clienteCode])



    
    const handleChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    } 


    const handleConfirm = async() => {
        if( await isValid() ){

            if( clienteCode?.trim() ){
                apiService.updateCliente(formValues.nombre, formValues.codigo, formValues.telefono, formValues.localidad, formValues.calle, formValues.numero, formValues.entreCalle )
                .then( res => {
                    dispatch( CloseModalCliente() );
                    dispatch( StartUpdateCliente(null) )
                })
                .catch( err => { 
                    Swal.fire( err.message )
                })
                .finally( () => {
                    dispatch( CloseModalCliente())
                })
            }
            else {

                apiService.createCliente(formValues.nombre, formValues.codigo, formValues.telefono, formValues.localidad, formValues.calle, formValues.numero, formValues.entreCalle )
                .then( res => {
                    dispatch( CloseModalCliente() );
                 })
                .catch( err => { 
                    Swal.fire( err.message )
                 })
                 .finally( () => {
                    dispatch( CloseModalCliente())
                 })
            }
            dispatch( UpdateTables() )

        }
    }


    const isValid = async () => {

        if( formValues.codigo?.trim() != '' && (!(clienteCode?.trim()) && await apiService.existCliente( formValues.codigo )) ) {
            Swal.fire('Error', 'El codigo de cliente ya existe', 'error');
            dispatch( CloseModalCliente() )
            return false;
        }

        if( formValues.telefono?.trim() != '' && formValues.nombre?.trim() != '' ) {
            return true;
        }

        return false;
    }

    return (
        <div>
        <Modal
          open={modalNewCliente}
          onClose={() => dispatch( CloseModalCliente() )}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box 
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              ...style
            }} 
            noValidate
            autoComplete="off"
          >
          <div>
              <h3>
                  Nuevo Cliente
              </h3>
  
              <Grid container spacing={2}>
  
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} >
                      <TextField
                          required
                          id="filled-required"
                          label="Codigo Cliente"
                          variant="filled"
                          name='codigo'
                          value={ formValues.codigo }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="1"
                      />
                      <TextField
                          required
                          id="filled-required"
                          label="Nombre"
                          variant="filled"
                          name='nombre'
                          type='text'
                          value={ formValues.nombre }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="3"
                      />
                         <TextField
                          required
                          id="filled-required"
                          label="Telefono"
                          name='telefono'
                          type='tel'
                          value={ formValues.telefono }
                          onChange={ (e) => handleChange(e) }
                          variant="filled"
                          tabIndex="3"
                      />
                  </Grid>
                
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} >
                      <TextField
                          required
                          id="filled-required"
                          label="Localidad"
                          variant="filled"
                          name='localidad'
                          value={ formValues.localidad }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="1"
                      />
                      <TextField
                          required
                          id="filled-required"
                          label="Calle"
                          variant="filled"
                          name='calle'
                          type='text'
                          value={ formValues.calle }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="3"
                      />
                  </Grid>

                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} >
                      <TextField
                          required
                          id="filled-required"
                          label="Numero"
                          variant="filled"
                          name='numero'
                          value={ formValues.numero }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="1"
                      />
                      <TextField
                          required
                          id="filled-required"
                          label="Entre Calle"
                          variant="filled"
                          name='entreCalle'
                          type='text'
                          value={ formValues.entreCalle }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="3"
                      />
                  </Grid>
                
                
                 
              </Grid>
  
  
              <Stack spacing={2} direction="row">
                  <Button onClick={ handleConfirm } sx={{ margin: '10px'}} variant="outlined">Confirmar</Button>
              </Stack>
  
          </div>
          </Box>
        </Modal>
      </div>
    )
}
