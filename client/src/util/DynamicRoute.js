import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuthState } from '../context/auth'

export default function DynamicRoute(props) {
  const { entity } = useAuthState()

  if (props.authenticated && !entity) {
    return <Redirect to="/" />
  } else if (props.unauthenticated && entity) {
    return <Redirect to="/chats" />
  } else {
    return <Route component={props.component} {...props} />
  }
}