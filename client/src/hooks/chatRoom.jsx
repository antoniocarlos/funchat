import React, { createContext, useCallback, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHATROOMS } from '../graphql';

const ChatRoomContext = createContext();

const ChatRoomProvider = ({ children }) => {

  const [chatRooms, setChatRooms] = useState(() => {
      const { data } = useQuery(GET_CHATROOMS);
      return data.getChatRooms;
    }
  );

  //TODO: implement subscriptions on chatroom creation
  //then transform this on a useEffect
  const getChatRooms = useCallback(() => {
    const { data } = useQuery(GET_CHATROOMS);
    setChatRooms(data.getChatRooms);
  }, [setChatRooms])

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