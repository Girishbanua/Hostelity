/* eslint-disable react/prop-types */
import "../../styles/_RoomInfo.scss";
import { motion } from "framer-motion";
const RoomInfo = ({ onCancel }) => {
  return (
    <motion.div className="roomInfo" initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: 0.5, delay: 0.25}}>
      <h1>Room No. 05</h1>
      <div>
        <h3>Room Type: </h3>
        <p>Quad Sharing</p>
      </div>
      <div>
        <h3>Boarders: </h3>
        <table>
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
    </motion.div>
  );
};

export default RoomInfo;
