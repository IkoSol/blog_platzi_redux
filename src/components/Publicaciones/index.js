import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Comentarios from './Comentarios'

import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'

const {traerTodos: usuariosTraerTodos} = usuariosActions
const {
    traerPorUsuario: publicacionesTraerPorUsuario, 
        abrirCerrarPub, 
        traerComentarios,
    } = publicacionesActions

class Publicaciones extends Component {
    
    async componentDidMount(){
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props

        if (!this.props.usuariosReducer.usuarios.length){ //Aquí no se destructura usuariosReducer porque sino no se actualizaría este valor.
            await usuariosTraerTodos() //Con el await va a esperar primero a que ejecute esta action y se complete, para 
        }    
        if (this.props.usuariosReducer.error){
            return;
        }                                     // posteriormmente obtener las publicaciones por usuario. Se debe poner async antes
        if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            publicacionesTraerPorUsuario(key) // del componentDidMount.
        }
    }

    ponerUsuario = () => {
        const { 
            usuariosReducer,
            match: { params: { key } } 
        } = this.props

        if (usuariosReducer.error){
            return <Fatal mensaje={usuariosReducer.error}/>
        }

        if (!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Spinner />
        }

        const nombre = usuariosReducer.usuarios[key].name

        return (
            <h1>
                Publicaciones de { nombre }
            </h1>
        )
    }

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,                   // Aquí si se destructura porque en el render no se genera ningún cambio de estado
            publicacionesReducer: {publicaciones},
            match: { params: { key } } 
        } = this.props

        if (!usuarios.length) return
        if (usuariosReducer.error) return
        if (publicacionesReducer.cargando){
            return <Spinner />
        }
        if (publicacionesReducer.error){
            return <Fatal mensaje={publicacionesReducer.error} />
        }
        if (!publicaciones.length) return
        if (!('publicaciones_key' in usuarios[key])) return

        const { publicaciones_key } = usuarios[key]

        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        )
    }

    mostrarInfo = (publicaciones, pub_key) =>(
        publicaciones.map((publicacion, comment_key) => (
            <div 
                className="pub-title"
                key={publicacion.id}
                onClick={()=>this.mostrarComentarios(pub_key, comment_key, publicacion.comentarios)}
            >
                <h2>{ publicacion.title }</h2>
                <h3>{ publicacion.body }</h3>
                {publicacion.abierto ? <Comentarios comentarios={publicacion.comentarios}/> : ''}
            </div>
        ))
    )

    mostrarComentarios = (pub_key, comment_key, comentarios) => {
        this.props.abrirCerrarPub(pub_key, comment_key)

        if(!comentarios.length){
            this.props.traerComentarios(pub_key, comment_key)
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
            </div>
        );
    }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
    return {
        usuariosReducer,
        publicacionesReducer
    }
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrarPub,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);