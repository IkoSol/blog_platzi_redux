import axios from 'axios'
import * as usuariosTypes from '../types/usuariosTypes'
import { ACTUALIZAR, CARGANDO, ERROR, COM_ACTUALIZAR, COM_CARGANDO, COM_ERROR } from '../types/publicacionesTypes'

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes

                                                                        // con getState se puede acceder al estado actual (store)
export const traerPorUsuario = (key) => async (dispatch, getState) => { //en el primer paréntesis se manda el argumento que recibe desde publicaciones/index.js
    
    dispatch({
        type: CARGANDO
    })
    
    const { usuarios } = getState().usuariosReducer //puedo tener acceso al estado actual (store) con getState
    const { publicaciones } = getState().publicacionesReducer
    const usuario_id = usuarios[key].id

    try {
        const respuesta = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

        const nuevas = respuesta.data.map((publicacion) => ({
            ...publicacion,
            comentarios: [],
            abierto: false,
        }))
        
        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ]

        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        })
        
        const publicaciones_key = publicaciones_actualizadas.length - 1
        const usuarios_actualizados = [...usuarios]
        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key //ES6 dice que si 'publicaciones_key: publicaciones_key' puedes dejar solo una variable con el mismo nombre
        }

        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        })

    } catch(error){
        console.log(error.message)
        dispatch({
            type: ERROR,
            payload: 'Error al cargar las publicaciones'
        })
    }
}

export const abrirCerrarPub = (pub_key, comment_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer
    const seleccionada = publicaciones[pub_key][comment_key]

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    }

    const publicaciones_actualizadas = [...publicaciones]
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ]
    publicaciones_actualizadas[pub_key][comment_key] = actualizada

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })
}

export const traerComentarios = (pub_key, comment_key) => async (dispatch, getState) => {
    dispatch({
        type: COM_CARGANDO
    })
    
    const { publicaciones } = getState().publicacionesReducer
    const seleccionada = publicaciones[pub_key][comment_key]

    try{
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        }

        const publicaciones_actualizadas = [...publicaciones]
        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ]
        publicaciones_actualizadas[pub_key][comment_key] = actualizada

        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        })
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: COM_ERROR,
            payload: 'Error al cargar los comentarios'
        })
    }
}