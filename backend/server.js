const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Basic API route to play Rock-Paper-Scissors
app.post('/play', async (req, res) => {
  const { playerChoice } = req.body;
  const choices = ['rock', 'paper', 'scissors'];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];

  let result;
  if (playerChoice === botChoice) {
    result = 'draw';
  } else if (
    (playerChoice === 'rock' && botChoice === 'scissors') ||
    (playerChoice === 'scissors' && botChoice === 'paper') ||
    (playerChoice === 'paper' && botChoice === 'rock')
  ) {
    result = 'win';
  } else {
    result = 'lose';
  }

  res.json({ playerChoice, botChoice, result });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
