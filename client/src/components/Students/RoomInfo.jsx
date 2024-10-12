/* eslint-disable react/prop-types */
import "../../styles/_RoomInfo.scss";
const RoomInfo = ({ onCancel }) => {
  return (
    <div className="roomInfo">
      <h1>Room No. 05</h1>
      <div>
        <h3>Room Type: </h3>
        <p>Quad Sharing</p>
      </div>
      <div>
        <h3>Boarders: </h3>
        <table border={1}>
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Name</th>
              <th>College</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ayush Mishra</td>
              <td>Agriculture</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Pankaj Jha</td>
              <td>Vetenary</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Gourav Gupta</td>
              <td>Forestry</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Akash Mohanty</td>
              <td>CPGS</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={onCancel}>return</button>
      </div>
    </div>
  );
};

export default RoomInfo;
