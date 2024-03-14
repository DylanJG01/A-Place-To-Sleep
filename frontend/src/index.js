import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import { ModalProvider, Modal } from './context/Modal';
import * as sessionActions from './store/session';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';

import { Wrapper } from "@googlemaps/react-wrapper";

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root(){
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAP_API_KEY}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ModalProvider>
          <Provider store={store}>
            <BrowserRouter>
              <App />
              <Modal />
            </BrowserRouter>
          </Provider>
        </ModalProvider>
      </LocalizationProvider>
    </Wrapper>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
