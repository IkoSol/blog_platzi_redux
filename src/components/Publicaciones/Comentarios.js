import React from 'react';
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import { connect } from 'react-redux'

const Comentarios = (props) => {

    if (props.com_error){
        return <Fatal mensaje={ props.com_error } />
    }

    if(props.com_cargando && !props.comentarios.length && !props.abierto){
       return <Spinner />
    }

    const ponerComentarios = () => (
        props.comentarios.map((comentario) => (
            <li key={comentario.id}>
                <b>
                    <u>
                        { comentario.email }
                    </u>
                </b>
                <br/>
                { comentario.body }
            </li>
        ))
    )

    return (
        <ul>
            { ponerComentarios() }
        </ul>
    );
};

const mapStateToProps = ({ publicacionesReducer}) => publicacionesReducer

export default connect(mapStateToProps)(Comentarios);