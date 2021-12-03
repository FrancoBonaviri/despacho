import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { apiService } from '../services/apiService';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { CloseModalDisco } from '../actions/ui';


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

export const NewDiscoModal = () => {


    const { modalNewDisco }= useSelector(state => state.ui)
    const dispatch = useDispatch()




    const [formValues, setformValues] = useState({
        telefono: '',
        titular: '',
        disco: '',
        marca: '',
        modelo: '',
        patente: '',
    });



    const handleChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    } 


    const handleConfirm = () => {
        if( isValid() ){
            apiService.nuevoDisco(formValues.titular, formValues.disco, formValues.telefono, formValues.marca, formValues.modelo, formValues.patente)
            .then( res => {
                dispatch( CloseModalDisco() );
            })
            .catch( err => {
                Swal.fire({title: 'Error', text: err.message, type: 'error'})
                dispatch( CloseModalDisco() );
            });
        }
    }


    const isValid = () => {
        if( formValues.titular?.trim() != '' && formValues.disco?.trim() != '' && formValues.telefono?.trim() != '' && 
            formValues.marca?.trim() != '' && formValues.modelo?.trim() != '' && formValues.patente?.trim() != ''
        ){
            return true;
        }

        return false;
    }
    return (
        <div>
        <Modal
          open={modalNewDisco}
          onClose={() => dispatch( CloseModalDisco() )}
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
                  Nuevo Disco
              </h3>
  
              <Grid container spacing={2}>
  
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} >
                      <TextField
                          required
                          id="filled-required"
                          label="Nombre Titular"
                          variant="filled"
                          name='titular'
                          value={ formValues.titular }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="1"
                      />
                      <TextField
                          required
                          id="filled-required"
                          label="Numero de disco"
                          variant="filled"
                          name='disco'
                          type='number'
                          value={ formValues.disco }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="3"
                      />
                         <TextField
                          required
                          id="filled-required"
                          label="Telefono Titular"
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
                          label="Marca"
                          variant="filled"
                          name='marca'
                          value={ formValues.marca }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="4"
                      />
                      <TextField
                          required
                          id="filled-required"
                          label="Modelo"
                          variant="filled"
                          name='modelo'
                          type='text'
                          value={ formValues.modelo }
                          onChange={ (e) => handleChange(e) }
                          tabIndex="5"
                      />
                         <TextField
                          required
                          id="filled-required"
                          label="Patente"
                          name='patente'
                          type='text'
                          value={ formValues.patente }
                          onChange={ (e) => handleChange(e) }
                          variant="filled"
                          tabIndex="6"
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
