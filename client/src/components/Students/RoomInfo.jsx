import { useNavigate } from "react-router-dom"
import "../../styles/_RoomInfo.scss"
const RoomInfo = () => {
  const navigate = useNavigate()
  return (
    <div className="roomInfo">
      <h1>Room No. 05</h1>
      <div>
        <label htmlFor="rmtype">Room Type: </label>
        <p>Quad Sharing</p>
      </div>
      <div>
        <label htmlFor="rmMates">Boarders: </label>
        <table>
            <thead>
                <tr><th>Sl.No.</th><th>Name</th><th>College</th></tr>            
            </thead>
            <tbody>
                <tr><td>1</td><td>Ayush Mishra</td><td>Agriculture</td></tr>
                <tr><td>2</td><td>Pankaj Jha</td><td>Vetenary</td></tr>
                <tr><td>3</td><td>Gourav Gupta</td><td>Forestry</td></tr>
                <tr><td>4</td><td>Akash Mohanty</td><td>CPGS</td></tr>
            </tbody>
        </table>
      </div>
      <div><button onClick={() => navigate("/user")}>return</button></div>
    </div>
  )
}

export default RoomInfo
