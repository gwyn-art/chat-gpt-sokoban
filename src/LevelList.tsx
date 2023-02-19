import React, { useEffect, useState } from 'react'
import { LEVELS_STORE_KEY, Level, loadLevels } from './LevelEditor';


type LevelListProps = {
    handlePlay: (level: Level) => void;
}

export const LevelList: React.FC<LevelListProps> = ({ handlePlay }) => {
    const [levels, setLevels] = useState<Level[]>([]);
  
    useEffect(() => {
      const savedLevels = loadLevels()
      if (savedLevels) {
        setLevels(savedLevels);
      }
    }, []);
  
    const handleDelete = (index: number) => {
      const newLevels = [...levels];
      newLevels.splice(index, 1);
      localStorage.setItem(LEVELS_STORE_KEY, JSON.stringify(newLevels));
      setLevels(newLevels);
    };
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level, index) => (
            <tr key={index}>
              <td>{level.name}</td>
              <td>
                <button onClick={() => handlePlay(level)}>Play</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };