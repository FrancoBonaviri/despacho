import React, { useState, useCallback, useEffect } from 'react';
import { Appbar } from './components/Appbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NewViajeModal } from './components/NewViajeModal';
import { NewDiscoModal } from './components/NewDiscoModal';
import { NewChoferModal } from './components/NewChoferModal';
import { Router } from './components/router';
import { useDispatch, useSelector } from 'react-redux'
import { OpenModalChofer, OpenModalCliente, OpenModalDisco, OpenModalViaje, UpdateTables } from './actions/ui';
import { NewClienteModal } from './components/NewClienteModal';


export default function App() {



  const dispatch = useDispatch()
  const { modalNewChofer, modalNewViaje, modalNewDisco, modalNewCliente} = useSelector(state => state.ui )


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


  const data = useCallback( () => {
    setInterval( () => {
      console.log('ACTUALIZO');
      dispatch( UpdateTables() )
    }, 60000)}
  )


  useEffect(() => {
    data()
  }, [])



  const onPress = useCallback(document.body.onkeydown = (e) => {

    if( e.key == 'F2' && !modalNewViaje ) { 
      dispatch( OpenModalViaje() )
      return;
    }
    if( e.key == 'F3' && !modalNewDisco ) {
      dispatch( OpenModalDisco() ) 
      return;
    }
    if( e.key == 'F4' && !modalNewChofer ) {
      dispatch( OpenModalChofer() ) 
      return;
    }
    if( e.key == 'F6' && !modalNewCliente ) {
      dispatch( OpenModalCliente() ) 
      return;
    }
  })


  return (
    <ThemeProvider theme={darkTheme} onKeyPress={ onPress}>
      <Appbar />


     <Router/>


      <NewViajeModal/>
      <NewDiscoModal />
      <NewChoferModal />
      <NewClienteModal />
    </ThemeProvider>
  );
}

