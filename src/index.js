import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createHttpLink, InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';


import App from './App';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    <ToastContainer
      autoClose={1000}
      hideProgressBar
    />
  </ApolloProvider>,
  document.getElementById('root'),
);
