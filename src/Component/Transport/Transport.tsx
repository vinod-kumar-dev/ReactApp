import { FC, useEffect, useState } from 'react';
import { webSocketUrl } from '../../config';
// Define the type for the WebSocket
type WebSocketType = WebSocket | null;

// Define the type for the messages
type MessageType = string;

const Transport: FC = () => {
  const [socket, setSocket] = useState<WebSocketType>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const ws = new WebSocket(webSocketUrl);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('Hello from the client!');
    }
  };

  return (
    <div>
      <h1>WebSocket Demo</h1>
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Transport;
