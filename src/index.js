import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/icons.css';
import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers'

const store = createStore(// Se crea un store. Almacenamiento que se provee a toda la aplicación
  reducers, //Todos los Reducers
  {}, //Estado inicial
  applyMiddleware(reduxThunk) 
)

ReactDOM.render(
  <Provider store={ store }> {/* Todo lo que esté dentro de la constante 'store' va a poder ser utilizable dentro de App para manejar sus estados*/}
    <App />
  </Provider>,
  document.getElementById('root')
);
 