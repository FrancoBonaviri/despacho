import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import { Archivo } from './Archivo';
import { Chat } from './Chat';
import { HomePage } from './HomePage';
import { ListadoChoferesPage } from './ListadoChoferesPage';
import { ListadoClientesPage } from './ListadoClientesPage';
import { ListadoDiscosPage } from './ListadoDiscosPage';
import { ListadoViajesHistoricos } from './ListadoViajesHistoricos';
import Presupuestador from './Presupuestador';


export const Router = () => {
    return (
        <Routes>
          <Route exact path="/" element={ <HomePage />} />
          <Route exact path="/discos" element={ <ListadoDiscosPage />} />
          <Route exact path="/choferes" element={ <ListadoChoferesPage />} />
          <Route exact path="/clientes" element={ <ListadoClientesPage />} />
          <Route exact path="/viajes" element={ <ListadoViajesHistoricos />} />
          <Route exact path="/Archivo" element={ <Archivo />} />
          <Route exact path="/presupuestador" element={ <Presupuestador />} />
          <Route exact path="/chat" element={ <Chat />} />
        </Routes>
    )
}
