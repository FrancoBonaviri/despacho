import React, { useCallback, useEffect, useState } from 'react'
import { Button, Header, Modal, Grid, Input, FormField } from 'semantic-ui-react';



export function ConfigModal({ openProp, setOpen }) {

    const [formValues, setFormValues] = useState({
        tarifa: '',
        bajada: '',
        metrosPorFicha: ''
    })

    useEffect(() => {
        const data = JSON.parse( localStorage.getItem('SYSTEM_CONFIG')  );
        if( data ) {
            setFormValues( { ...data } );
        } 
        else {
            setFormValues({
                tarifa: '',
                bajada: '',
                metrosPorFicha: ''
            })
        }
    }, [openProp])


  const saveData = () => {
    localStorage.setItem('SYSTEM_CONFIG', JSON.stringify( formValues ));
    setOpen( false );
  }


  let paddingStyles = {
    paddingRight: '1rem'
  }

  return (
    <Modal
        style={{ maxHeight: "350px", marginLeft: 'auto !important', marginRight: 'auto !important' }}
        open={ openProp }
    >
         <Modal.Content>
             <Grid columns={ 1 }>


                <Grid.Row>
                    <FormField>
                        <label style={ paddingStyles } htmlFor="inputPassword2">Tarifa</label>
                        <Input type="number" id="inputPassword2" placeholder="Tarifa"  tabIndex="1"
                            onChange={ ({ target }) => setFormValues({ ...formValues, tarifa: target.value})}
                            value={ formValues.tarifa }
                        />
                    </FormField>
                </Grid.Row>
                
                
                <Grid.Row>
                    <FormField>
                        <label style={ paddingStyles } htmlFor="inputPassword2">Bajada de Bandera</label>
                        <Input type="number" id="inputPassword2" placeholder="Bajada de Bandera"  tabIndex="2"
                            onChange={ ({ target }) => setFormValues({ ...formValues, bajada: target.value})}
                            value={ formValues.bajada }
                        />
                    </FormField>
                </Grid.Row>
                
                
                <Grid.Row>
                    <FormField>
                        <label style={ paddingStyles } htmlFor="inputPassword2">Metros por ficha</label>
                        <Input type="number" id="inputPassword2" placeholder="Metros por ficha" tabIndex="3"
                            onChange={ ({ target }) => setFormValues({ ...formValues, metrosPorFicha: target.value})}
                            value={ formValues.metrosPorFicha }

                        />
                    </FormField>
                </Grid.Row>

            
             </Grid>
        </Modal.Content>

        <Modal.Actions>
            <Button negative onClick={() => setOpen( false )}>
                Cancelar
            </Button>
            <Button positive onClick={() => saveData()}>
                Aceptar
            </Button>
        </Modal.Actions>
    </Modal>
  )
}