import React, { useEffect, useState } from 'react'
import { Level, loadLevels, isLevelValid, deleteLevel } from './LevelEditor';


type LevelListProps = {
    handlePlay: (levels: Level[]) => void;
    handleEdit: (levels: Level) => void;
}

export const LevelList: React.FC<LevelListProps> = ({ handlePlay, handleEdit }) => {
    const [levels, setLevels] = useState<Level[]>([]);
  
    useEffect(() => {
      const savedLevels = loadLevels()
      if (savedLevels) {
        setLevels(savedLevels);
      }
    }, []);
  
    const handleDelete = (index: number) => {
      const newLevels = deleteLevel(index)
      setLevels(newLevels || []);
    };
  
    return (
      <div>
        <button
          onClick={() => handlePlay(levels)}
          disabled={levels.length === 0 || levels.some(level => !isLevelValid(level))}
        >
          Play all
        </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Version</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level, index) => (
            <tr key={index}>
              <td>{level.name}</td>
              <td>{level.version} {!isLevelValid(level) && 'DEPRECATED LEVEL VERSION'}</td>
              <td>
                <button onClick={() => handlePlay([level])} disabled={!isLevelValid(level)}>Play</button>
                <button onClick={() => handleEdit(level)} disabled={!isLevelValid(level)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };