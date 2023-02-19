import React, { useState } from 'react';
import Game from './Game';
import { LevelEditor } from './LevelEditor';
import { LevelList } from './LevelList';
import { GameState } from './types';

const App: React.FC = () => {
  const [levels, setLevels] = useState<GameState[]>([]);
  const [screen, setScreen] = useState('game');

  return (
    <div>
      <nav>
        <button onClick={() => setScreen('game')}>Game</button>
        <button onClick={() => setScreen('levelList')} >Custom Level List</button>
        <button onClick={() => setScreen('editor')}>Level Editor</button>
      </nav>
      {screen === 'game' && <Game levels={levels.length > 0 ? levels : undefined} />}
      {screen === 'levelList' && <LevelList handlePlay={levels => {
        setLevels(levels.map(level => level.level));
        setScreen('game')}
       } />}
      {screen === 'editor' && <LevelEditor onSave={() => setScreen('levelList')} />}
    </div>
  );
};

export default App;