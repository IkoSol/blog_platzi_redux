import axios from 'axios' //permite usar todos los métodos http de web post put etc
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes'

export const traerTodos = () => async (dispatch) => {

    dispatch({
        type: CARGANDO
    })
    try{
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
        dispatch({
            type: TRAER_TODOS,
            payload: respuesta.data //Es respuesta.data porque 'respuesta' es el objeto que dentro contiene el parámetro 'data'
        })
    } catch(error) {
        //console.log('Error: ', error.message)
        dispatch({
            type: ERROR,
            payload: 'Something went wrong. Try again later.'
        })
    }
}