import React from 'react'
import Occupants from './occupants';
import { ReactComponent as PhoneIcon } from '../icons/addresscard.svg';
import { ReactComponent as Address } from '../icons/addres.svg';
import { ReactComponent as Occupant } from '../icons/property.svg';
import { ReactComponent as Town } from '../icons/town.svg';
import { ReactComponent as Phone } from '../icons/phone.svg';

const Item = (props) => {
    return (
      <div className="grid-container">
        
          <div key={props.id} className="grid-row">
            <div className="grid-cell">
              <span className="grid-label">Postcode:</span>
              <span className="grid-value">{props.postcode}</span>
            </div>
            <div className="grid-cell">
              <PhoneIcon className="icon"></PhoneIcon>
              <span className="grid-label">Name:</span>
              <span className="grid-value">{props.name}</span>
            </div>
            <div className="grid-cell">
              <Address className="icon ad"></Address>  
              <span className="grid-label">Address:</span>
              <span className="grid-value">{props.address}</span>
            </div>
            <div className="grid-cell">
              <Occupant className="icon oc"></Occupant>  
              <span className="grid-label">Occupants:</span>
              <Occupants occupants={props.occupants}></Occupants>
            </div>
            <div className="grid-cell">
              <Phone className="icon po"></Phone>
              <span className="grid-label">Phone:</span>
              <span className="grid-value">{props.phone}</span>
            </div>
            <div className="grid-cell">
              <Town className="icon to"></Town>
              <span className="grid-label">Town:</span>
              <span className="grid-value">{props.town}</span>
            </div>
          </div>
      </div>
    );
  };

export default Item