import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader"
import { Dropdown, Grid, Button, Input } from 'semantic-ui-react'
import {ConfigModal} from './Modal.js'
import Swal from 'sweetalert2'

import './Presupuestador.css';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';



const initialStateFormValues = {
  inicio: '',
  destino: '',
  localidadInicio: '',
  localidadFin: ''
}


function Presupuestador() {


  const input1 = useRef();
  const input2 = useRef();

  const ddl1 = useRef();
  const ddl2 = useRef();


  
  const [localidades, setLocalidades] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [googleEntityes, setGoogleEntityes] = useState({
    map: null,
    directionsService: null,
    directionsRenderer: null,
    google: null
  })
  

  useCallback(document.onkeydown = (e) => {
    console.log(e.keyCode);
    if( e.keyCode == 13 ) {
      calculate();
    } else if( e.keyCode == 113 ) {
      setOpenModal( true );
    } else if( e.keyCode == 27 ) {
      setOpenModal( false );
    } 
  })



  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyCF7qf5cBKD8kS7upi--HxFbu4d1jgWDlY",
      version: "weekly",
    });

    // navigator.geolocation.getCurrentPosition(( position ) => { 
      const position = {};     
      loader.load().then((google) => {
        const mapa = new google.maps.Map(document.getElementById("map"), {
          center: { lat:  position?.coords?.latitude || 1 , lng:  position?.coords?.longitude || 1 },
          zoom: 12,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ]
        });
        
        const _directionsrenderer = new google.maps.DirectionsRenderer();
        _directionsrenderer.setOptions({ draggable: true })
        _directionsrenderer.setMap( mapa );
        
        setGoogleEntityes({
          map: mapa,
          directionsRenderer: _directionsrenderer,
          directionsService: new google.maps.DirectionsService(),
          google
        });

        // console.log(googleEntityes.directionsRenderer);
        google.maps.event.addListener( _directionsrenderer ,'directions_changed', () => showPrice(_directionsrenderer) );
        
      });
    // })
  }, [])

  useEffect(() => {
    axios.get('https://apis.datos.gob.ar/georef/api/localidades?provincia=buenos aires&campos=nombre&max=5000')
    .then( res => {
      const arrayTemp = [];
      for( let item of res.data.localidades ) {
        arrayTemp.push({
          key: item.id,
          text: item.nombre,
          value: item.nombre
        })
      }

      setLocalidades( [ ... arrayTemp ] );
    })  
    .catch( err => {
      console.log(err);
    });

  }, [])

  useEffect(() => {
    const Myvariables = JSON.parse(window.localStorage.getItem('SYSTEM_CONFIG'));

    if( !Myvariables || !Myvariables.tarifa || !Myvariables.bajada || !Myvariables.metrosPorFicha ){
      setOpenModal( true )
    }
    
  }, [])
  
  
  const calculate = () => { 

   
    let calleInicio = input1.current.inputRef.current.value;
    let calleInicioArray = calleInicio.split('/');

    let calleFin= input2.current.inputRef.current.value;
    let calleFinArray = calleFin.split('/');

    
    console.log('DIRECCION 1');
    console.log(`Calle ${calleInicioArray[0]} y ${calleInicioArray[1]}, ${ ddl1.current.state.value }, Buenos Aires `);
    console.log('DIRECCION 2');
    console.log(`Calle ${calleFinArray[0]} y ${calleFinArray[1]}, ${ ddl2.current.state.value }, Buenos Aires`);

    var request = {
      origin: `Calle ${calleInicioArray[0]} y ${calleInicioArray[1]}, ${ ddl1.current.state.value }, Buenos Aires, Argentina `,
      destination: `Calle ${calleFinArray[0]} y ${calleFinArray[1]}, ${ ddl2.current.state.value }, Buenos Aires, Argentina`,
      travelMode: googleEntityes.google.maps.TravelMode.DRIVING
    };

    googleEntityes.directionsService.route(request, function(response, status) {
      if (status === 'OK') {
        googleEntityes.directionsRenderer.setDirections(response);


        let distance = response.routes[0].legs[0].distance.value;

        const variables = JSON.parse(window.localStorage.getItem('SYSTEM_CONFIG'));

        const price = Number(variables.bajada) + ( Math.ceil( distance / variables.metrosPorFicha ) * variables.tarifa )

        Swal.fire('Precio estimado: $ ' + price);

      }
    });
  }


  const showPrice = (_directionsrenderer) => {

    const distance = _directionsrenderer.getDirections().routes[0].legs[0].distance.value;
    
    const variables = JSON.parse(window.localStorage.getItem('SYSTEM_CONFIG'));

    const price = Number(variables.bajada) + ( Math.ceil( distance / variables.metrosPorFicha ) * variables.tarifa )

    Swal.fire('Precio estimado: $ ' + price);
  }

  
  
  return (
    <>
    <div className=''>
      
      <Grid columns={ 4 } style={{ paddingTop: '1rem'}}>

        <Grid.Row>
          <Grid.Column>

            <Input 
              placeholder='Calle A / Calle B'
              className='form-control' 
              type='text'
              name="inicio"
              ref={ input1 }
            />

          </Grid.Column>
            
          <Grid.Column>

            <Dropdown
              placeholder='Localidad'
              search
              selection
              options={ localidades }
              ref={ ddl1 }
              />

          </Grid.Column>
            
          <Grid.Column>  

            <Input 
              placeholder='Calle A / Calle B' 
              className='form-control' 
              type='text'
              ref={ input2 }
              />

          </Grid.Column>

          <Grid.Column>

            <Dropdown
              placeholder='localidad'
              search
              selection
              options={ localidades }
              ref={ ddl2 }
              />

          </Grid.Column>

        </Grid.Row>
        
      </Grid>


      <Grid columns={ 1 }>

        <Grid.Row style={{ padding: '0'}}> 
          <Button 
            onClick={ calculate }
            style={{ width: '100%' }}
            color='blue'
            >
            Calcular (Enter)
          </Button>
        </Grid.Row>

        
        <Grid.Row style={{ paddingBottom: '1rem'}}> 
          <Button 
            onClick={ () => setOpenModal( true ) }
            style={{ width: '100%' }}
            color='yellow'
            >
            Configuracion (F2)
          </Button>
        </Grid.Row>
      </Grid>

    <ConfigModal openProp={ openModal } setOpen={ setOpenModal }/>

    </div>
    <div id='map'>
    </div>
    </>
  );
}

export default Presupuestador;