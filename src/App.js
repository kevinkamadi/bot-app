import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  useEffect(() => {
    // Fetch data from db.json when the component mounts
    fetch('http://localhost:3000/bots')
      .then((response) => response.json())
      .then((data) => setBots(data.bots))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleBotClick = (bot) => {
    setSelectedBot(bot);
  };

  const handleRemoveBot = (bot) => {
    setBots(bots.filter((b) => b.id !== bot.id));
    setSelectedBot(null);
  };

  return (
    <div className="App">
      <h1>Bots App</h1>
      <div className="original-bots">
        <h2>Original Bots</h2>
        <ul>
          {bots.map((bot) => (
            <li key={bot.id} onClick={() => handleBotClick(bot)}>
              {bot.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="new-bots">
        {selectedBot && (
          <div className="selected-bot">
            <h2>Selected Bot: {selectedBot.name}</h2>
            <button onClick={() => handleRemoveBot(selectedBot)}>Remove</button>
            <BotDetails bot={selectedBot} />
          </div>
        )}
      </div>
    </div>
  );
}

const BotDetails = ({ bot }) => (
  <div className="bot-details">
    <img src={bot.avatar_url} alt={bot.name} />
    <p>Name: {bot.name}</p>
    <p>Health: {bot.health}</p>
    <p>Damage: {bot.damage}</p>
    <p>Armor: {bot.armor}</p>
    <p>Class: {bot.bot_class}</p>
    <p>Catchphrase: {bot.catchphrase}</p>
  </div>
);

export default App;
