import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Config from './chatBot/config';
import ActionProvider from './chatBot/ActionProvider';
import MessageParser from './chatBot/MessageProvider';

import ChatBot from 'react-chatbot-kit';

function App() {
 

  return (
    <>
      <div style={{ maxWidth: '500px ' }}>
        <ChatBot
          config={Config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </div>
    </>
  );
}

export default App;
