import { Router } from 'express';
import choferRouter from './Chofer';
import clienteRouter from './Cliente';
import discoRouter from './Disco';
import viajeRouter from './Viaje';



const routes = Router();


routes.use('/Disco' , discoRouter  )
routes.use('/Chofer' , choferRouter  )
routes.use('/Viaje' , viajeRouter  )
routes.use('/cliente' , clienteRouter  )




export default routes;