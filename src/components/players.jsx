import { useState } from "react";

export default function PlayersDetails({ name, symbol, isActive, }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputdetails, setInputDetails] = useState(name);
  let details = <span className="player-name">{inputdetails}</span>;

  function handleClick() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleChange(event) {
    setInputDetails(event.target.value);
  }
  if (isEditing) {
    details = (
      <input
        type="text"
        required
        value={inputdetails}
        onChange={handleChange}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">{details}</span>
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
      
    </li>
  );
}
