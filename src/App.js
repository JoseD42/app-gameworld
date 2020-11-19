import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Container} from 'semantic-ui-react';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import Routes from './components/Routes';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
})

export default class App extends Component{
  render() {
    return (
      <ApolloProvider client={client}>
          <Routes/>
      </ApolloProvider>
    );
  }
}
