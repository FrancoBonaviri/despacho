import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import { HomePage } from './HomePage';
import { ListadoChoferesPage } from './ListadoChoferesPage';
import { ListadoClientesPage } from './ListadoClientesPage';
import { ListadoDiscosPage } from './ListadoDiscosPage';
import { ListadoViajesHistoricos } from './ListadoViajesHistoricos';


export const Router = () => {
    return (
        <Routes>
          <Route exact path="/" element={ <HomePage />} />
          <Route exact path="/discos" element={ <ListadoDiscosPage />} />
          <Route exact path="/choferes" element={ <ListadoChoferesPage />} />
          <Route exact path="/clientes" element={ <ListadoClientesPage />} />
          <Route exact path="/viajes" element={ <ListadoViajesHistoricos />} />
        </Routes>
    )
}
