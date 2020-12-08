import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks/auth'

export default function DynamicRoute(props) {
  const { entity } = useAuth()

  if (props.authenticated && !entity) {
    return <Redirect to="/" />
  } else if (props.unauthenticated && entity) {
    return <Redirect to="/chats" />
  } else {
    return <Route component={props.component} {...props} />
  }
}