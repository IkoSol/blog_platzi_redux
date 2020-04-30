import axios from 'axios' //permite usar todos los métodos http de web post put etc
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes'

export const traerTodas = () => async (dispatch) => {

    dispatch({
        type: CARGANDO
    })
    try{
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos')
        dispatch({
            type: TRAER_TODAS,
            payload: respuesta.data //Es respuesta.data porque 'respuesta' es el objeto que dentro contiene el parámetro 'data'
        })
    } catch(error) {
        //console.log('Error: ', error.message)
        dispatch({
            type: ERROR,
            payload: 'Información de tareas no disponible'
        })
    }
}