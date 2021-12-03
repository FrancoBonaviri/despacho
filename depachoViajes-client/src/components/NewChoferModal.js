import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { apiService } from '../services/apiService';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { CloseModalChofer } from '../actions/ui';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


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

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));



export const NewChoferModal = () => {

  
  const { modalNewChofer }= useSelector(state => state.ui)
  const dispatch = useDispatch()


  const [formValues, setformValues] = useState({
    telefono: '',
    nombre: '',
    discos: [],
    disco: '',
    DispoId: ''
  });



  const handleChange = ({ target }) => {
    setformValues({
        ...formValues,
        [target.name]: target.value
    })
  } 


  const handleAgregarDisco = () => {
    setformValues({
      ...formValues,
      discos: [...formValues.discos, formValues.disco],
      disco: '',
    })
  }


  const handleConfirm = () => {
    if( isValid() ){
        apiService.nuevoChofer(formValues.nombre, formValues.telefono, formValues.discos, formValues.DispoId)
        .then( res => {
            console.log(res);
            dispatch( CloseModalChofer() );
        })
        .catch( err => {
            console.log(err);
            Swal.fire({title: 'Error', text: err.message, type: 'error'})
            dispatch( CloseModalChofer() );
        });
    }
  }


  const isValid = () => {
    if( formValues.nombre?.trim() != '' && formValues.discos.length > 0 && formValues.telefono?.trim() != '' && formValues.DispoId?.trim() != '' ){
      return true;
    }
    return false;
  }


  return (
      <div>
      <Modal
        open={modalNewChofer}
        onClose={() => dispatch( CloseModalChofer() )}
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
                Nuevo chofer
            </h3>

            <Grid container spacing={2}>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} >
                    <TextField
                        required
                        id="filled-required"
                        label="Nombre"
                        variant="filled"
                        tabIndex="1"
                        name='nombre'
                        value={ formValues.nombre }
                        onChange={ (e) => handleChange(e) }
                    />
                     <TextField
                        required
                        id="filled-required"
                        label="Numero de Telefono"
                        variant="filled"
                        tabIndex="3"
                        name='telefono'
                        value={ formValues.telefono }
                        onChange={ (e) => handleChange(e) }
                      />
                      <TextField
                        required
                        id="filled-required"
                        label="Dispositivo"
                        variant="filled"
                        tabIndex="3"
                        name='DispoId'
                        value={ formValues.DispoId }
                        onChange={ (e) => handleChange(e) }
                      />
                </Grid>

                  <Grid container spacing={2}  item xs={12}>
                      <Typography sx={{ margin: '1rem'}} variant="h6" component="div">
                        Discos: 
                      </Typography>
                      
                      <div style={{ margin: '1rem' }}>
                        { formValues.discos.map( disco => (
                          <p style={{ color: 'white'}}>
                            { disco }   <span style={{ margin: '1rem', borderRadius: '5px', backgroundColor: 'red', padding: '.2rem', cursor: 'pointer'}} onClick={() =>  setformValues({ ...formValues, discos: formValues.discos.filter( d => d != disco) }) }>  Borrar</span>
                          </p>
                        ))}
                      </div>


                    {/* <Grid item xs={12} md={6}>
                      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Discos  
                      </Typography>
                      <Demo>
                        <List dense={true}>
                          { formValues.discos.map( disco => (
                            <ListItem key={disco}>
                              <ListItemText
                                secondary={disco}
                              />
                          </ListItem>
                          ))}
                        </List>
                      </Demo>
                    </Grid> */}

                </Grid>
                

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} >
                    <TextField
                        required
                        id="filled-required"
                        label="Numero de disco"
                        variant="filled"
                        tabIndex="3"
                        name='disco'
                        value={ formValues.disco }
                        onChange={ (e) => handleChange(e) }
                    />
                    <Stack spacing={2} direction="row">
                        <Button onClick={ handleAgregarDisco }  variant="outlined">Agregar</Button>
                    </Stack>                
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
