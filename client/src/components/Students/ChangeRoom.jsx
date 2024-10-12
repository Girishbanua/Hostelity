
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import "../../styles/_ChangeRoom.scss";


const RoomNumber = ({ lblMsg, newOption }) => {
  return (
    <div className="roomNumber">
      <label htmlFor="prnum">{lblMsg}</label>
      <select name="prnum" id="proomnum">
        <option value="rndm">{newOption}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
      </select>
    </div>
  );
};
const RoomType = ({ lblMsg, newOption }) => {
  return (
    <div className="roomType">
      <label htmlFor="proom">{lblMsg} </label>
      <select name="proom" id="proom">
        <option value="rndm">{newOption}</option>
        <option value="1">Single Room</option>
        <option value="2">Dual Room</option>
        <option value="3">Triple Sharing Room</option>
        <option value="4">Quad Sharing Room</option>
      </select>
    </div>
  );
};


const ChangeRoom = ({onCancel}) => {    
  return ( 
    <div className="changeRoom">      
      <h1>Change Room</h1>
      <div className="rbox">
        <RoomNumber lblMsg="Present Room Number: " newOption="Select"/>
        <RoomType lblMsg="Present Room Type: " newOption="Select" />
      </div>
      <p>(* If you don't know the new room number, please select random)</p>
      <div className="rbox">
        <RoomNumber lblMsg="New Room Number: " newOption="Random"/>
        <RoomType lblMsg="New Room Type: " newOption="Random"/>
      </div>
      <div className="chngMsg">
        <label htmlFor="chngMsg">Reason for room change(if any): </label>
        <br />
        <textarea name="chngMsg" cols="70" rows="10 "></textarea>
      </div>

      <div className="buttons">
        <button>Request change</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ChangeRoom;
