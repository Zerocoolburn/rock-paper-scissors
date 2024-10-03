import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [result, setResult] = useState(null);

  const playGame = async (choice) => {
    setPlayerChoice(choice);
    try {
      const response = await axios.post('http://localhost:5000/play', { playerChoice: choice });
      setResult(response.data);
    } catch (error) {
      console.error('Error playing the game', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Rock-Paper-Scissors</h1>
      <div>
        <button onClick={() => playGame('rock')}>Rock</button>
        <button onClick={() => playGame('paper')}>Paper</button>
        <button onClick={() => playGame('scissors')}>Scissors</button>
      </div>

      {result && (
        <div>
          <p>Your choice: {result.playerChoice}</p>
          <p>Bot's choice: {result.botChoice}</p>
          <p>Result: {result.result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
