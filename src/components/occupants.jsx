import React from 'react';

const Occupants = (props) => {
    // console.log(Object.entries(JSON.parse(props["occupants"])));
  return (
    <div className="occupants-container">
      <h3 className="occupants-heading"></h3>
      <div className="occupants-list">
      <ul>
          {Object.entries(JSON.parse(props["occupants"])).map(([key, value]) => (
            <li key={key}>
              <span className="occupants-key">{key}:</span> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Occupants;