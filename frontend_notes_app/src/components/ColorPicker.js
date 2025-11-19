import React from 'react';

const ColorPicker = ({ colors, value, onChange }) => {
  return (
    <div className="color-row" role="radiogroup" aria-label="Color picker">
      {colors.map((c) => (
        <button
          key={c}
          role="radio"
          aria-checked={value === c}
          className="color-swatch"
          onClick={() => onChange(c)}
          style={{
            background: c,
            outline: value === c ? `3px solid rgba(0,0,0,0.25)` : 'none'
          }}
          title={c}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
