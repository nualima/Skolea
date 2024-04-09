// SubjectTag.js
import React from 'react';

const subjectColors = {
  "Mathématique": "blue",
  "Sciences": "green",
  "Histoire": "red",
  "Géographie": "yellow",
  "Langues": "purple",
  "Physique": "orange",
  "Chimie": "lightblue",
  "Biologie": "pink",
  "Arts": "brown",
  // Ajoutez d'autres matières et couleurs au besoin
};

const SubjectTag = ({ subject }) => {
  const backgroundColor = subjectColors[subject] || 'grey';
  return (
    <span style={{ backgroundColor, color: 'white', padding: '2px 6px', margin: '2px', display: 'inline-block', borderRadius: '5px', fontSize: 'smaller' }}>
      {subject}
    </span>
  );
};

export default SubjectTag;
