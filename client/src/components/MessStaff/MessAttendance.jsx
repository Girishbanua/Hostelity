/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../styles/_MessAttendance.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MessAttendance = () => {
  //this is the url where the data will be stored
  const MES_ATND_URL = "http://localhost:4000/api/messAttend";
  const [students, setStudents] = useState([]);
  const [attndData, setAttndData] = useState([]);
  const navigate = useNavigate();
  //Using useEffect to fetch the data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/registered_Students"
        );
        setStudents(res.data);
        console.log("students: ", res.data);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    fetchData();
  }, []);
  const MES_ATND_TODAY_URL = "http://localhost:4000/api/getTodayAttendance";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(MES_ATND_TODAY_URL);
        const result = res.data.result;
        const today = new Date();
        let dateToday = today.toLocaleDateString();
        const [month, day, year] = dateToday.split("/").map(Number);
        dateToday = `${day}/${month}/${year}`;
        console.log("dateToday: ", dateToday);

        const filteredData = result.filter((data) => data.date === dateToday);

        const stdnts = filteredData[0].student.map((data)=>(data.name))

        setAttndData(stdnts);
        console.log(
          "stdnts: ", Array.isArray(stdnts), stdnts
        );
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    fetchData();
  }, []);
  //selecting students who have opted for mess
  const messStdnt = students.filter((student) => student.mess === "on");
  const total = messStdnt.length;

  // the following variables are for the total calculation at the end of the day
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [totalGuest, setTotalGuest] = useState(0);
  //the following array contains the details of the students who had their meal on that particular day
  const [totalStdnt, setTotalStdnt] = useState([]);
  const guestList = totalStdnt.filter((stdnt) => stdnt.guest > 0);
  const summary = {
    present: totalPresent,
    absent: totalAbsent,
    guest: totalGuest,
  };

  //Mess Component, where individual student details are displayed
  const MessComp = ({ id, student }) => {
    const [guest, setGuest] = useState(0);
    return (
      <tr>
        <td>{id + 1}</td>
        <td>{student.name}</td>
        <td>No</td>
        <td className="btnDiv">
          <button onClick={() => guest > 0 && setGuest(guest - 1)}> - </button>
          <p>{guest}</p>
          <button onClick={() => guest < 4 && setGuest(guest + 1)}> + </button>
        </td>
        <td>
          <button onClick={(e) => addMeal(e, student.name, guest, id)}>
            Yes
          </button>
        </td>
      </tr>
    );
  };
  //add the row on click and increase the present
  const addMeal = (e, name, guest, rid) => {
    const time = new Date().toLocaleTimeString();
    e.preventDefault();
    const newStdnt = { name, guest, time };
    setTotalStdnt((prevStdnt) => [...prevStdnt, newStdnt]);
    removeRow(rid);
    console.log("unique id:", rid);
    setTotalPresent(totalPresent + 1);
    setTotalAbsent(total - 1);
    setTotalGuest(totalGuest + guest);
    console.log("guest list:", guestList);
  };
  // remove the row on click and increase the present
  const removeRow = (rid) => {
    let notRemove = messStdnt;
    notRemove.splice(rid, 1);
    setStudents(notRemove);
    console.log("not remove", notRemove);
  }; 

  //submit the data after the day is over
  const submitData = async (e) => {
    e.preventDefault();
    try {
      // First POST request
      const res = await axios.post(MES_ATND_URL, {
        student: totalStdnt,
        summary,
        guests: guestList,
        messAttender: "admin",
      });
            
      console.log("POST response:", res);
  
      // Second PATCH request, sending `attndData` as an array
      
      const res2 = await axios.patch("http://localhost:4000/api/messPayUpdate", { students: attndData });
      console.log("attndData is",Array.isArray(attndData))
      
      if (res2.status !== 200) {
        console.log("Data not updated");
        return;
      }
      
      console.log("PATCH response:", res2);
      console.log("Attendance data submitted successfully");              
      navigate("/staffDashboard");
    } catch (err) {
      console.log("Error submitting data", err);
    }
  };
  

  return (
    <div className="messAttendance">
      <h1>Mess Attendance</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Name</th>
              <th>Off Day</th>
              <th>Guest Meal</th>
              <th>Attendence</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) => student.mess === "on")
              .map((student, id) => (
                <MessComp
                  key={student._id}
                  id={id}
                  student={student}
                  setTotalGuest={setTotalGuest}
                  totalGuest={totalGuest}
                  rid={student._id}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className="summary">
        <h2>
          Present: <span>{totalPresent}</span>
        </h2>
        <h2>
          Absent: <span>{totalAbsent}</span>
        </h2>
        <h2>
          Guest Meal: <span>{totalGuest}</span>
        </h2>
      </div>

      {totalPresent > 0 && (
        <>
          <h2>Submit Attendance</h2>
          <button onClick={submitData}>Submit</button>
        </>
      )}
    </div>
  );
};
export default MessAttendance;
