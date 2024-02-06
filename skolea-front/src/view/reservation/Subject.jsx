import React from "react";
import Button from "@mui/material/Button";
import { lighten, darken } from "@mui/material/styles";

const subjects = [
  { id: 1, name: "Mathématiques", color: "#FF5722" },
  { id: 2, name: "Sciences", color: "#2196F3" },
  { id: 3, name: "Histoire", color: "#9C27B0" },
  { id: 4, name: "Géographie", color: "#4CAF50" },
  { id: 5, name: "Langues", color: "#F44336" },
  { id: 6, name: "Physique", color: "#673AB7" },
  { id: 7, name: "Chimie", color: "#FFC107" },
  { id: 8, name: "Biologie", color: "#795548" },
  { id: 9, name: "Arts", color: "#607D8B" },
];

const Subject = ({ onSelect, selectedSubject }) => {
  const getButtonStyle = (subject) => {
    const isSelected = selectedSubject === subject.name;
    const baseColor = subject.color;
    return {
      backgroundColor: isSelected
        ? lighten(baseColor, 0.2)
        : darken(baseColor, 0.2),
      color: "#fff",
      border: isSelected ? "3px solid lightgreen" : "none",
      boxShadow: isSelected ? "0px 0px 12px lightgreen" : "none",
    };
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {subjects.map((subject) => (
        <Button
          key={subject.id}
          variant="contained"
          style={getButtonStyle(subject)}
          onClick={() => onSelect(subject)}
        >
          {subject.name}
        </Button>
      ))}
    </div>
  );
};
export default Subject;
