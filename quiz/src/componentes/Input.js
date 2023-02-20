import React from "react";

const Input = ({ pergunta, options, value, onChange, id, active }) => {
  if (active === false) return null;
  return (
    <fieldset>
      <legend className="legenda">{pergunta}</legend>
      {options.map((option) => (
        <label className="options" key={option}>
          <br />
          <input
            className="radio"
            type="radio"
            id={id}
            value={option}
            onChange={onChange}
            checked={value === option}
          />
          {option}
        </label>
      ))}
    </fieldset>
  );
};

export default Input;
