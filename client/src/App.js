import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ApolloProvider from './ApolloProvider'

import './App.scss'

import Home from './pages/Home'
import Register from './pages/Register'
import Chats from './pages/Chats'
import Chat from './pages/Chat'

function App() {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="pt-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/Chat" component={Chat} />
            <Route path="/Chats" component={Chats} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App