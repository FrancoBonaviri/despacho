import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { CloseModalViaje, OpenModalViaje, UpdateTables } from '../actions/ui';
import { apiService } from '../services/apiService';
import Swal from 'sweetalert2'
import { UpdateViaje } from '../actions/viajes';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const condiciones = [
  'Con Espera',
  'Con Mascota',
  'Paga con MercadoPago',
  'Paga CuentaDNI',
  'Paga Tarjeta',
  'Con Baul',
  'Con Aire',
];

const ParalelasGenova = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49']

const ParalelasMontevideo = ['122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151', '152', '153', '154', '155', '156', '157', '158', '159', '160', '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189']

export function NewViajeModal() {


  const dispatch = useDispatch()
  const { modalNewViaje } = useSelector(state => state.ui )
  const { updateViajeId } = useSelector(state => state.viajes )
  const [telOptions, setTelOptions] = useState([]);
  const [codOptions, setCodOptions] = useState([])
  const [modalReservaOpen, setModalReservaOpen] = useState(false)

  const [formValues, setFormValues] = useState({
    codigoCliente: '',
    cliente: '',
    localidad: '',
    numero: '',
    calle: '',
    entreCalle: '',
    comentario: '',
    pedidoPor: '', 
    telefono: '',
    condicion: []
  });
  
  
  useEffect(() => {
    if( !modalNewViaje ) {
      dispatch( UpdateViaje( null ) )
      setTelOptions([]);
      setCodOptions([]);
      setFormValues({
        codigoCliente: '',
        cliente: '',
        localidad: '',
        numero: '',
        calle: '',
        entreCalle: '',
        comentario: '',
        pedidoPor: '', 
        telefono: '',
        condicion: [],
      });
    }
  }, [modalNewViaje])


  useEffect(() => {
    if( updateViajeId?.trim() && modalNewViaje) {
      apiService.getbyId(updateViajeId)
      .then( res => {
        setFormValues({
          ...formValues,
          codigoCliente: res.data.viaje.CodigoCliente,
          localidad: res.data.viaje.Localidad,
          numero: res.data.viaje.Numero,
          calle: res.data.viaje.Calle,
          entreCalle: res.data.viaje.EntreCalle,
          comentario: res.data.viaje.Comentario,
          pedidoPor: res.data.viaje.PedidoPorWsp ? 'whatsapp' : 'tel', 
          condicion: res.data.viaje.Condicion
        });
      })
      .catch( err => {
        console.log(err);
      })
    }
  }, [modalNewViaje])

  useEffect(() => {
    preloadEntreCalles()
  }, [formValues.calle, formValues.numero, formValues.localidad])

  const handleChange = ({ target }) => {
    if( target.name == 'telefono'){
      return preloadDataTel(target)
    }
    if( target.name == 'codigoCliente'){
      return preloadDataCod(target)
    }

    setFormValues({
      ...formValues,
      [target.name]: target.value
    })

  }

  const preloadDataTel = (target) => {
    apiService.getMatchByTel(target.value)
    .then( res => {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      });

      setTelOptions( [...res.data.Clientes] )

    })
    .catch( err => {
      console.log(err)
    })
  }

  const preloadDataCod = (target) => {
    apiService.getMatchByCode(target.value)
    .then( res => {
      setFormValues({
        ...formValues,
        [target.name]: target.value
      });

      setCodOptions( [...res.data.Clientes] )

    })
    .catch( err => {
      console.log(err)
    })
  }


  const preloadEntreCalles = () => {
    if( formValues.localidad?.trim()?.toUpperCase() == 'BERISSO' ) {
      preloadEntreCallesBerisso();
    }
    if( formValues.localidad?.trim()?.toUpperCase() == 'LA PLATA' ) {
      preloadEntreCallesLaPlata();
    }
  }

  const preloadEntreCallesBerisso = () => {
    // caso que es paralela a la genova =>
    if( formValues.calle?.trim() && formValues.numero?.trim()?.length > 2 && ParalelasGenova.indexOf(formValues.calle.trim() )) {
      const primerosDosNumeroCalle = formValues.numero.substr(0,2);
      const primeraEntreCalle = Number(primerosDosNumeroCalle) + 122;

      setFormValues({
        ...formValues,
        entreCalle: `${primeraEntreCalle} y ${ primeraEntreCalle + 1 }`
      })
    } 

    // paralelas a la montevideo 
    if( formValues.calle?.trim() &&  ParalelasMontevideo.indexOf(formValues.calle.trim() ) ) {

      // si es de 3 dijitos en numero => 
      if( formValues.numero?.trim()?.length == 3) {
        const primerNumeroCalle = formValues.numero.substr(0,1);
        const primeraEntreCalle = Number(primerNumeroCalle) + 2;

        setFormValues({
          ...formValues,
          entreCalle: `${primeraEntreCalle} y ${ primeraEntreCalle + 1 }`
        })
      }

      // si es de 4 dijitos en numero => 
      if( formValues.numero?.trim()?.length == 4) {
        const primerosDosNumeroCalle = formValues.numero.substr(0,2);
        const primeraEntreCalle = Number(primerosDosNumeroCalle) + 2;
  
        setFormValues({
          ...formValues,
          entreCalle: `${primeraEntreCalle} y ${ primeraEntreCalle + 1 }`
        })
      }


    }

  }

  const preloadEntreCallesLaPlata = () => {

  }


  const handleConfirm = () => {
    console.log(formValues);
    if( isValid() ) {
      if( updateViajeId?.trim() ) {

        apiService.updateViaje(updateViajeId, formValues.calle, formValues.numero, formValues.entreCalle, formValues.localidad, formValues.codigoCliente, !!(formValues.pedidoPor == 'whatsapp'), !!(formValues.pedidoPor == 'tel'), formValues.comentario, formValues.telefono, formValues.condicion   )
        .then( res => {
          dispatch( UpdateTables() )
        })
        .catch( err => {
          Swal.fire('Error', err.message, 'error')
        })
        .finally( () => {
          dispatch( CloseModalViaje() )
        })

      } else {
        apiService.createViaje(formValues.calle, formValues.numero, formValues.entreCalle, formValues.localidad, formValues.codigoCliente, !!(formValues.pedidoPor == 'whatsapp'), !!(formValues.pedidoPor == 'tel'), formValues.comentario, formValues.telefono, formValues.condicion  )
        .then( res => {
          dispatch( UpdateTables() )
        })
        .catch( err => {
          Swal.fire('Error', err.message, 'error')
        })
        .finally( () => {
          dispatch( CloseModalViaje() )
        })
      }
      
    }
  }

  const handleReserva = () => {
    if( isValid() ) {
      localStorage.setItem('formValues', JSON.stringify(formValues));
      setModalReservaOpen(true);
      dispatch( CloseModalViaje() );
    }
  }

  const isValid = () => {
    if( formValues.calle?.trim() != '' && formValues.numero?.trim() != '' && formValues.localida?.trim() != '' ) {
      return true;
    }
    return false;
  }

 
  const autoCompleteByCode = (e, newValue) => {
    if( !newValue ) {
      return;
    }
    apiService.getLastDataClienteByCode(newValue)
    .then( res => {
      setFormValues({
        ...formValues,
        localidad: res.data.Viaje.Localidad,
        calle: res.data.Viaje.Calle,
        entreCalle: res.data.Viaje.EntreCalle,
        numero: res.data.Viaje.Numero,
        codigoCliente: newValue
      })
    })
    .catch( err => {
      console.log(err)
    })
  } 
  
  const autoCompleteByTel = (e, newValue) => {
    if( !newValue ) {
      return;
    }
    apiService.getLastDataClienteByTel(newValue)
    .then( res => {
      setFormValues({
        ...formValues,
        localidad: res.data.Viaje?.Localidad,
        calle: res.data.Viaje?.Calle,
        entreCalle: res.data.Viaje?.EntreCalle,
        numero: res.data.Viaje?.Numero,
        telefono: newValue
      })
    })
    .catch( err => {
      console.log(err)
    })
  }


  const handleCondicionChange = (event) => {
    const {
      target: { value },
    } = event;

    setFormValues({
      ...formValues,
      condicion: typeof value === 'string' ? value.split(',') : value
    });
  };

  return (
    <div>
      <Modal
        open={modalNewViaje}
        onClose={() => dispatch( CloseModalViaje() )}
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
                Nuevo Viaje
            </h3>

            <Grid container spacing={2}>


                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}  >
                  
                  <Autocomplete
                    value={ formValues.codigoCliente }
                    disablePortal
                    id="combo-box-demo"
                    options={ codOptions.map( opt => opt.Codigo) }
                    sx={{ width: 300, display: 'flex', justifyContent: 'center' }}
                    onChange={ autoCompleteByCode }
                    freeSolo
                    renderInput={(params) => 
                      <TextField
                        name='codigoCliente'
                        onChange={ handleChange }
                        value={ formValues.codigoCliente }
                        {...params} 
                        label="Codigo Cliente" 
                      />}
                  />


                  <Autocomplete
                    disablePortal
                    options={ telOptions.map( opt => opt.NumeroTelefono) }
                    sx={{ width: 300, display: 'flex', justifyContent: 'space-around' }}
                    onChange={ autoCompleteByTel }
                    freeSolo
                    renderInput={(params) => 
                      <TextField
                        name='telefono'
                        onChange={ handleChange }
                        value={ formValues.telefono } {...params} 
                        label="Telefono" 
                      />}
                  />
                </Grid>

               <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} >
                    <TextField
                        required
                        id="filled-required"
                        label="Localidad"
                        variant="filled"
                        tabIndex="1"
                        name='localidad'
                        onChange={ handleChange }
                        value={ formValues.localidad }
                    />
                   <TextField
                        required
                        id="filled-required"
                        label="Calle"
                        variant="filled"
                        tabIndex="1"
                        name='calle'
                        onChange={ handleChange }
                        value={ formValues.calle }
                    />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <TextField
                        required
                        id="filled-required"
                        label="Numero"
                        variant="filled"
                        tabIndex="3"
                        name='numero'
                        onChange={ handleChange }
                        value={ formValues.numero }
                    />
                     <TextField
                        required
                        id="filled-required"
                        label="Entre calle"
                        variant="filled"
                        tabIndex="4"
                        name='entreCalle'
                        onChange={ handleChange }
                        value={ formValues.entreCalle }
                    />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                  <TextField
                      id="filled-required"
                      label="Comentario"
                      variant="filled"
                      tabIndex="5"
                      name='comentario'
                      onChange={ handleChange }
                      value={ formValues.comentario }
                  />

                  <FormControl sx={{ m: 1, width: '230px' }}>
                    <InputLabel id="demo-multiple-checkbox-label">Condicion</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={formValues.condicion}
                      onChange={handleCondicionChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {condiciones.map((condicion) => (
                        <MenuItem key={condicion} value={condicion}>
                          <Checkbox checked={formValues.condicion.indexOf(condicion) > -1} />
                          <ListItemText primary={condicion} />
                        </MenuItem>
                      ))}
                  </Select>
                  </FormControl>
                  
                </Grid>



                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Pedido Por</FormLabel>
                    <RadioGroup row aria-label="Pedido Por" name="pedidoPor" onChange={ handleChange } value={ formValues.pedidoPor } sx={{ color: 'white'}}>
                      <FormControlLabel value="whatsapp" control={<Radio />} label="WhastApp" />
                      <FormControlLabel value="tel" control={<Radio />} label="Telefono" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
               
            </Grid>


            <Stack spacing={2} direction="row">
                <Button sx={{ margin: '10px'}} variant="outlined" onClick={ handleConfirm }>Confirmar</Button>
            </Stack>
            {
              ! (updateViajeId?.trim()) &&
              <Stack spacing={2} direction="row">
                  <Button sx={{ margin: '10px'}} variant="outlined" onClick={ handleReserva }>Reservar</Button>
              </Stack>
            }

        </div>
        </Box>
      </Modal>
      <ModalReserva open={ modalReservaOpen } setOpen={ setModalReservaOpen } />
    </div>
  );
}


const ModalReserva = ({ open, setOpen }) => {


  const [newValues, setNewValues] = useState({
    date: new Date(),
    anterioridad: ''
  });

  const [formValues, setFormValues] = useState({});
  
  useEffect(() => {
    const data = JSON.parse( localStorage.getItem('formValues'))
    if( open && !data) {
      setOpen(false)
    } else if( open ) {
      setFormValues({ ...data });
    } else if( !open ) {
      localStorage.removeItem('formValues');
    }
  }, [open])


  console.log(formValues);



  const handleConfirm = () => {
    if( isValid() ) {
      apiService.createReservaViaje(formValues.calle, formValues.numero, formValues.entreCalle, formValues.localidad, formValues.codigoCliente, !!(formValues.pedidoPor == 'whatsapp'), !!(formValues.pedidoPor == 'tel'), formValues.comentario, formValues.telefono, formValues.condicion, newValues.anterioridad, newValues.date  )
      .then( res => {
        console.log(res);
      })
      .catch( err => {
        Swal.fire('Error', err.message, 'error')
      })
      .finally( () => {
        setOpen(false);
      })
    }
  }


  const isValid = () => {

    if( newValues.date && moment( new Date( newValues.date ) ).isAfter(moment()) && newValues.anterioridad > 0 ) {
      return true;
    }
    return false;
  }



  const handleChange = ({ target }) => {
    setNewValues({
      ...newValues,
      [target.name]: target.value
    })

  }


  return (
    
    <Modal
      open={ open }
      onClose={ () => setOpen(false) }
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
       sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        ...style
        }} 
      >
        <h3>
          Reserva
        </h3>


        <Grid container spacing={2}>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}  >
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DateTimePicker
                sx={{ margin: '1rem'}}
                  renderInput={(props) => <TextField {...props} />}
                  label="FECHA"
                  value={ newValues.date }
                  onChange={(newValue) => {
                    setNewValues({ ...newValues, date: newValue });
                  }}
                tabIndex='1'
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}  >
            <TextField
                required
                type='number'
                id="filled-required"
                label="Anterioridad (mins)"
                variant="filled"
                tabIndex="2"
                name='anterioridad'
                onChange={ handleChange }
                value={ newValues.anterioridad }
            />
          </Grid>
          
          
        </Grid>

      
        <Stack spacing={2} direction="row">
            <Button sx={{ margin: '10px'}} variant="outlined" onClick={ handleConfirm }>Confirmar</Button>
        </Stack>

      </Box>

    </Modal>

  )


}