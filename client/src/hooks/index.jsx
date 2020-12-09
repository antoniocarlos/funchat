import React from 'react';
import { AuthProvider } from './auth'
import { ChatRoomProvider } from './chatRoom'

const Hooks = ({ children }) => {
  return (
    <AuthProvider>
      <ChatRoomProvider>
        {children}
      </ChatRoomProvider>
    </AuthProvider>
  )
}

export default Hooks;