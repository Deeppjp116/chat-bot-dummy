import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ChatBot from 'react-simple-chatbot';

function App() {
  const [textValue, setTextValue] = useState('');

  const steps = [
    {
      id: '0',
      message: 'Welcome to react chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Bye!',
      end: true,
    },
  ];

  axios
    .post('')
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });

  const gettextvalue = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <>
      <div>
        <label>Talk:</label>
        <input type='text' value={textValue} onChange={gettextvalue} />
        <br />
        <label>{textValue}</label>
      </div>

      {/* <ChatBot
        steps={steps}
        recognitionEnable={true}
        headerTitle='Speech Synthesis'
        speechSynthesis={{ enable: true, lang: 'en' }}
      /> */}
    </>
  );
}

export default App;
