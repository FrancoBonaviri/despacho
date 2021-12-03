import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useDispatch, useSelector } from 'react-redux';
import { CloseModalCliente, CloseModalDisco } from '../actions/ui';
import { apiService } from '../services/apiService';
import Swal from 'sweetalert2';



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
    const dispatch = useDispatch()


    const [formValues, setformValues] = useState({
        codigo: '',
        nombre: '',
        telefono: '',
    });



    
    const handleChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    } 


    const handleConfirm = async() => {
        if( await isValid() ){
           apiService.createCliente(formValues.nombre, formValues.codigo, formValues.telefono )
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
    }


    const isValid = async () => {

        if( formValues.codigo?.trim() != '' && await apiService.existCliente( formValues.codigo ) ) {
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
