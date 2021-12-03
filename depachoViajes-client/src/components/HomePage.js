import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Viajes } from './Viajes';
import { ViajesHistoricos } from './ViajesHistoricos';
import { ViajesACompletar } from './ViajesACompletar';

export const HomePage = () => {
    return (
        <div>
        <Box sx={{ flexGrow: 1 }} style={{ margin : '.6rem'}}>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Viajes />
                </Grid>
                <Grid item xs={5}>
                
                
                    {/* <Grid sx={{ height: '43vh !important', marginBottom: '1rem'}} >
                        <ViajesACompletar />
                    </Grid> */}


                    <Grid sx={{ }}>
                        <ViajesHistoricos />
                    </Grid>
                
                
                </Grid>
            </Grid>
        </Box>
        </div>
    )
}
