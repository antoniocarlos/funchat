import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Switch } from 'react-router-dom'

import ApolloProvider from './ApolloProvider'

import './App.scss'

import Home from './pages/Home'
import Register from './pages/Register'
import Chats from './pages/Chats'
import Chat from './pages/Chat/Chat'

import Hooks from './hooks'

import DynamicRoute from './util/DynamicRoute'

function App() {
  return (
    <ApolloProvider>
      <Hooks>
        <BrowserRouter>
          <Container className="pt-5">
            <Switch>
              <DynamicRoute exact path="/" component={Home} unauthenticated/>
              <DynamicRoute path="/register" component={Register} unauthenticated/>
              <DynamicRoute path="/Chat/:chatRoom" component={Chat} authenticated/>
              <DynamicRoute path="/Chats" component={Chats} authenticated/>
              <DynamicRoute path="/Chat" component={Chats} authenticated/>
            </Switch>
          </Container>
        </BrowserRouter>
      </Hooks>
    </ApolloProvider>
  )
}

export default App