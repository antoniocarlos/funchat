import React from 'react';
import { AuthProvider } from './auth'

const Hooks = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
} 

export default Hooks;