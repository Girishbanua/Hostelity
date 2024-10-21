/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../styles/_MessAttendance.scss";
import axios from "axios";

const MessAttendance = () => {
  const MES_ATND_URL = "http://localhost:4000/api/messAttend";
  const [students, setStudents] = useState([]);
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

  //remove the row on click and increase the present
  const messStdnt = students.filter((student) => student.mess === "on");
  const total = messStdnt.length;
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  // the following variables are for the total calculation at the end of the day
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [totalGuest, setTotalGuest] = useState(0);
  const [totalStdnt, setTotalStdnt] = useState([]);

  //Mess Component, where individual student details are displayed
  const MessComp = ({ id, student }) => {
    const [guest, setGuest] = useState(0);
    return (
      <tr>
        <td>{id + 1}</td>
        <td>{student.name}</td>
        <td>No</td>
        <td className="btnDiv">
          <button
            onClick={() => {
              guest > 0 && setGuest(guest - 1);
            }}
          >
            -
          </button>
          <p>{guest}</p>
          <button
            onClick={() => {
              guest < 4 && setGuest(guest + 1);
            }}
          >
            +
          </button>
        </td>
        <td>
          <button onClick={(e) => addMeal(e, student.name, guest, id)}>
            Yes
          </button>
        </td>
      </tr>
    );
  };
  const addMeal = (e, name, guest, rid) => {
    e.preventDefault();
    const time = new Date();
    const crntTime = time.toLocaleTimeString();
    const newStdnt = { name, guest, time: crntTime };
    setTotalStdnt((prevStdnt) => [...prevStdnt, newStdnt]);
    removeRow(rid);
    console.log("unique id:", rid);
  };
  // remove the row on click and increase the present
  const removeRow = (rid) => {
    let notRemove = messStdnt;
    notRemove.splice(rid, 1);
    setStudents(notRemove);
    console.log("not remove", notRemove);
  };
  useEffect(() => {
    console.log("Total student list updated:", totalStdnt); // Log when the total student list updates
  }, [totalStdnt]);

  //submit the data
  const submitData = async (e) => {
    e.preventDefault();
    try {
       await axios.post(MES_ATND_URL, {student: totalStdnt});
      console.log("attendance data submitted successfully");      
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
      <h2>Submit Attendance</h2>
      <button onClick={submitData}>Submit</button>
    </div>
  );
};
export default MessAttendance;
