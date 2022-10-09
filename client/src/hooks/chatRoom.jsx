import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CHATROOMS } from '../graphql';

const ChatRoomContext = createContext();

const ChatRoomProvider = ({ children }) => {
  const [chatRooms, setChatRooms] = useState();

  const [getChatRooms] = useLazyQuery(
    GET_CHATROOMS, {
    onCompleted: (data) => {
      setChatRooms(data.getChatRooms);
    }
  }
  );

  useEffect(() => {
    getChatRooms();
  }, [])

  return (
    <ChatRoomContext.Provider value={{
      chatRooms,
      getChatRooms
    }}>
      {children}
    </ChatRoomContext.Provider>
  )
}

function useChatRoom() {
  const context = useContext(ChatRoomContext);
  return context;
}

export { ChatRoomProvider, useChatRoom }