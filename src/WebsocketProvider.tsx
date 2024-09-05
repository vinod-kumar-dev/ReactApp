import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { webSocketUrl } from './config';

interface MessageMessage<T> {
  Page: string;
  Message: T;
}

interface WebSocketContextType<T> {
  messages: MessageMessage<T>[];
}

const WebSocketContext = createContext<WebSocketContextType<any> | undefined>(undefined);

export const useWebSocket = <T,>(): WebSocketContextType<T> => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<MessageMessage<any>[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(webSocketUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const message: MessageMessage<any> = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};
