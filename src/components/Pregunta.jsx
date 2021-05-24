import React,{ Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error'

const Pregunta = ({ guardarRestante, guardarPresupuesto, actualizarPregunta }) => {

    //Definir el state

    const [ cantidad, guardarCantidad ] = useState(0);
    const [ error, guardarError ] = useState(false);

    //Funcion que lee el presupuesto
    const definirPresupuesto = e => {
        if(e.target.value !== ""){
            guardarCantidad( parseInt(e.target.value) );
        }else{
            guardarCantidad(0);
        }
    }

    // Submit para definir presupuesto

    const agregarPresupuesto = e =>{
        e.preventDefault();

        // Validar
        if( cantidad < 1 && error === false ) {
            guardarError(true);
            return;
        }else if(cantidad >= 1 && error === true ){
            guardarError(false);
        }

        // Si se pasa la validacion

        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);

        // guardarError(false);

    }

    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            { error ? <Error mensaje="El presupuesto es incorrecto" /> : null }

            <form 
                action=""
                onSubmit={agregarPresupuesto}
            >
                <input 
                    type="number" 
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />

                <input 
                    type="submit" 
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </Fragment>
     );
}

Pregunta.propTypes = {
    guardarRestante: PropTypes.func.isRequired,
    guardarPresupuesto: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;