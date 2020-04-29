import React, {Component} from 'react'
import axios from 'axios' //permite usar todos los métodos http de web post put etc

/* stateLess o componentes funcionales, cuando comienza una función con la palabra reservada 'const' */
/* statFull o clases NO funcionales (o componente clase) no manejan estados, solo manean información o funciones */

//const Usuarios = () => { //componente funcional o stateLess
 class Usuarios extends Component{ //componente no funcional

  constructor(){
   super()
   this.state = {
     usuarios : [],
   } 
  }

  async componentDidMount(){
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
    this.setState({
      usuarios: respuesta.data
    })
  }

  //const ponerFilas = () => [ //stateLess
  ponerFilas = () => ( //stateFull
    this.state.usuarios.map((usuario) =>(
      <tr key={usuario.id}>
        <td>
          {usuario.name}
        </td>
        <td>
          {usuario.email}
        </td>
        <td>
          {usuario.website}
        </td>
      </tr>
    ))
  )

  render(){ //en un componente clase se debe poner render, en un stateLess no se necesita
    return (
        <React.Fragment>
        <table className="tabla">
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Correo
              </th>
              <th>
                Enlace
              </th>
            </tr>
          </thead>
          <tbody>
            { this.ponerFilas()  /*en un componente clase se debe poner this, en un stateLess no se necesita */}
          </tbody>
        </table> 
      </React.Fragment>
    )
  }
}

export default Usuarios