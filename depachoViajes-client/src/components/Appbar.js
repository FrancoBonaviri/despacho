import React from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from "react-router-dom";
import { OpenModalCalculadora } from '../actions/ui'

export const Appbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenCalculadora = () => {
        dispatch( OpenModalCalculadora() )
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                   <Link style={{ textDecoration: 'none', color: 'white'}} to='/'> Inicio </Link> 
                </Typography>


                <Typography variant="h7" component="div" style={{ paddingRight: '15px' }}>
                    <Link style={{ textDecoration: 'none', color: 'white'}} to='/'>Nuevo Viaje(F2) </Link> 
                </Typography>
                <Typography variant="h7" component="div" style={{ paddingRight: '15px' }} >
                    <Link style={{ textDecoration: 'none', color: 'white'}} to='/'>Nuevo Disco(F3) </Link> 
                </Typography>
                <Typography variant="h7" component="div" style={{ paddingRight: '15px' }}>
                    <Link style={{ textDecoration: 'none', color: 'white'}} to='/'>Nuevo Chofer(F4) </Link> 
                </Typography>
                <Typography variant="h7" component="div" style={{ paddingRight: '15px' }}>
                    <Link style={{ textDecoration: 'none', color: 'white'}} to='/'>Nuevo Cliente(F6) </Link> 
                </Typography>

                <Typography variant="h7" component="div" style={{ paddingRight: '15px' }}>
                    <Link style={{ textDecoration: 'none', color: 'white'}} to='/Archivo'> Archivo </Link> 
                </Typography>
                <Typography variant="h7" component="div" style={{ paddingRight: '15px' }}>
                    <Link style={{ textDecoration: 'none', color: 'white'}} to='/presupuestador'> Presupuestador </Link> 
                </Typography>
                <Typography variant="h7" component="div" style={{ paddingRight: '15px' }}>
                    <p style={{ textDecoration: 'none', color: 'white', cursor: 'pointer'}} onClick={ handleOpenCalculadora }> Calculadora </p> 
                </Typography>

                <Typography variant="h7" component="div" style={{ paddingRight: '15px' }}>
                    <Link style={{ textDecoration: 'none', color: 'white'}} to='/'> Configuracion </Link> 
                </Typography>
                
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                        <MenuItem onClick={handleClose}>Cerrar sesion</MenuItem>
                    </Menu>
                </div>
                
                </Toolbar>
            </AppBar>
        </Box>
    )
}
