
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/config/configureStore';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore;
ReactDOM.render(<React.StrictMode>
      <BrowserRouter>
  <Provider store={store}><App /></Provider>
  </BrowserRouter>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

