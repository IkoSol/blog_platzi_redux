import React from 'react';
import { connect } from 'react-redux'

const Tabla = (props) => {
    
    //const ponerFilas = () => [ //stateLess
    const ponerFilas = () => props.usuarios.map((usuario) =>(  //stateFull
        <tr key={usuario.id}>
            <td>{usuario.name}</td>
            <td>{usuario.email}</td>
            <td>{usuario.website} </td>
        </tr>
    ))

    return (
        <div>
            <table className="tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Enlace</th>
                    </tr>
                </thead>
                <tbody>
                    { ponerFilas()  /*en un componente clase se debe poner this, en un stateLess no se necesita */}
                </tbody>
            </table> 
        </div>
    );
};

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer
}

export default connect(mapStateToProps)(Tabla);