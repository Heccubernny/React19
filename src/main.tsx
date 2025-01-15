import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './utils/i18n';
import 'sweetalert2/src/sweetalert2.scss';

import App from './App.tsx';

import { BrowserRouter } from 'react-router';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const URI = "https://spacex-production.up.railway.app/";

const client = new ApolloClient( {
  uri: URI,
  cache: new InMemoryCache()
} );

createRoot( document.getElementById( 'root' )! ).render(
  <StrictMode>
    <ApolloProvider client={ client }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
