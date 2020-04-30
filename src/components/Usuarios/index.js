import React, {Component} from 'react'
import { connect } from 'react-redux' //se usa para conectar con los reducers
import * as usuariosActions from '../../actions/usuariosActions'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Tabla from './Tabla'

/* stateLess o componentes funcionales, cuando comienza una función con la palabra reservada 'const' */
/* statFull o clases NO funcionales (o componente clase) no manejan estados, solo manean información o funciones */

//const Usuarios = () => { //componente funcional o stateLess
 class Usuarios extends Component{ //componente no funcional

  componentDidMount(){
    if (!this.props.usuarios.length){
      this.props.traerTodos()
    }
  }

  ponerContenido = () => {
      if (this.props.cargando){
          return <Spinner />
      }

      if (this.props.error){
          return <Fatal mensaje={this.props.error}/>
      }

    return <Tabla usuarios={this.props.usuarios}/>
  }

  render(){ //en un componente clase se debe poner render, en un stateLess no se necesita
    return (
        <React.Fragment>
            <h1>Usuarios</h1>
            {this.ponerContenido()}
        </React.Fragment>
    )
  }
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer
}

export default connect(mapStateToProps, usuariosActions)(Usuarios)