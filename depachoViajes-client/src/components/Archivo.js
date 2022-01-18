import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ListadoDiscosPage } from './ListadoDiscosPage';
import { ListadoChoferesPage } from './ListadoChoferesPage';
import { ListadoClientesPage } from './ListadoClientesPage';
import { ListadoViajesHistoricos } from './ListadoViajesHistoricos';

function a11yProps(index) {
return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export const Archivo = () => {
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    
    return (
        <div>
             <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ color:'black'}} label="Discos" {...a11yProps(0)} />
                    <Tab sx={{ color:'black'}} label="Choferes" {...a11yProps(1)} />
                    <Tab sx={{ color:'black'}} label="Clientes" {...a11yProps(2)} />
                    <Tab sx={{ color:'black'}} label="Viajes" {...a11yProps(3)} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ListadoDiscosPage />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ListadoChoferesPage />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ListadoClientesPage />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ListadoViajesHistoricos />
                </TabPanel>
            </Box>
        </div>
    )
}
