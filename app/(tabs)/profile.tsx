import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import io from 'socket.io-client';

const SERVER_URL = 'https://walrus-lenient-surely.ngrok-free.app'; // Replace with your actual server URL

const MyChatComponent: React.FC = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    newSocket.on('message', (message: string) => {
      console.log('Received message:', message);
      setReceivedMessage(message); // Update state with received message
    });

    return () => {
      newSocket.disconnect(); // Clean up on unmount
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '' && socket) {
      socket.emit('message', message); // Emit message to server
      setMessage(''); // Clear input field
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Received Message: {receivedMessage}</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 20, paddingHorizontal: 10 }}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default MyChatComponent;
