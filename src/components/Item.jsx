import React from 'react'
import Occupants from './occupants';

const Item = (props) => {
    return (
      <div className="grid-container">
        
          <div key={props.id} className="grid-row">
            <div className="grid-cell">
              <span className="grid-label">Postcode:</span>
              <span className="grid-value">{props.postcode}</span>
            </div>
            <div className="grid-cell">
              <span className="grid-label">Name:</span>
              <span className="grid-value">{props.name}</span>
            </div>
            <div className="grid-cell">
              <span className="grid-label">Address:</span>
              <span className="grid-value">{props.address}</span>
            </div>
            <div className="grid-cell">
              <span className="grid-label">Occupants:</span>
              <Occupants occupants={props.occupants}></Occupants>
            </div>
            <div className="grid-cell">
              <span className="grid-label">Town:</span>
              <span className="grid-value">{props.town}</span>
            </div>
          </div>
      </div>
    );
  };

export default Item