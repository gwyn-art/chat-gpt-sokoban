import React, { useState } from 'react';
import Game from './Game';
import { LevelEditor } from './LevelEditor';

const App: React.FC = () => {
  const [screen, setScreen] = useState('game');

  return (
    <div>
      <nav>
        <button onClick={() => setScreen('game')}>Game</button>
        <button onClick={() => setScreen('editor')}>Level Editor</button>
      </nav>
      {screen === 'game' && <Game />}
      {screen === 'editor' && <LevelEditor />}
    </div>
  );
};

export default App;