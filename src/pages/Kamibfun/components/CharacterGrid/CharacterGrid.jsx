import React from 'react';
import ImageBlock from '../../../../components/ImageBlock/ImageBlock';
import characterData from '../../data/CharacterData';
import './CharacterGrid.css';

const CharacterGrid = () => {
  return (
    <div
      id="character-section"
      className="character-grid mt-6 mx-auto justify-items-center p-4 border-1 border-black rounded-lg font-custom"
      style={{
        width: '85%',
        maxWidth: '1000px',
      }}
    >
      {characterData.map((character) => (
        <div 
          key={character.id} 
          style={{ 
            gridArea: character.style.gridArea,
          }}
        >
          <ImageBlock
            src={character.src}
            alt={character.alt}
            tooltipTitle={character.tooltipTitle}
            tooltipDescription={character.tooltipDescription}
          />
        </div>
      ))}
    </div>
  );
};

export default CharacterGrid;