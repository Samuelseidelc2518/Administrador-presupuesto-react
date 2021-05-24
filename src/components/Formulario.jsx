import React, { useState } from 'react';
import Error from './Error'
import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid'; // uuidv4();
import shortid from 'shortid';


const Formulario = ({ actualizarPregunta, guardarGasto, guardarGastos, guardarCrearGasto }) => {

    // states
    const [ nombre, guardarNombre ] = useState('');
    const [ cantidad, guardarCantidad ] = useState(0);
    const [ error, guardarError ] = useState(false);

    //  Cuando el usuario agrega un gasto
    const agregarGasto = e =>{
        e.preventDefault();

        // validar
        if(cantidad < 1 || cantidad === "" || nombre.trim() === ''){
            guardarError(true);
            return;
        }else{
            guardarError(false);
        }

        // construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        
        // console.log(gasto);

        // pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        // resetear el form
        guardarNombre('');
        guardarCantidad(0);

    }

    // Volver a agregar un presupuesto
    const actualizar = () =>{
        actualizarPregunta(true);
        guardarGastos([]);
    }

    return ( 
        <form 
            action=""
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            { error ? <Error mensaje="Los datos no son válidos" /> : null}

            <div className="campo">
                <label htmlFor="Gasto">Nombre Gasto</label>
                <input 
                    type="text"
                    id="Gasto"
                    className="u-full-width"
                    placeholder="Ej. transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label htmlFor="Cantidad">Cantidad Gasto</label>
                <input 
                    type="number"
                    id="Cantidad"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad( parseInt( e.target.value, 10 ) )}
                />
            </div>

            <input 
                type="submit"
                className="button-primary u-full-width" 
                value="Agregar gasto"
            />
            <input 
                type="button"
                className="u-full-width" 
                value="Otro presupuesto"
                onClick={ () => actualizar() }
            />
        </form>
    );
}

Formulario.propTypes = {
    actualizarPregunta: PropTypes.func.isRequired,
    guardarGasto: PropTypes.func.isRequired,
    guardarGastos: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;