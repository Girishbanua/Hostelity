import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/_Students.scss";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((err) => console.log("Error fetching student data", err));
  }, []);

  return (
    <>
      <div className="stdntDetailCntnr">
        <div className="stdntHeader">
          <h1>Registered Students</h1>
        </div>
        <div className="stdntDetails">
          <table>
            <thead>
              <tr>
                <th>Sl.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>College Name</th>                
                <th>Duration</th>
                <th>Mess</th>
                <th>Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td className="leftText">{student.name}</td>
                  <td className="leftText">{student.email}</td>
                  <td>{student.phone}</td>
                  <td className="leftText">{student.college}</td>
                  <td>{student.duration}</td>
                  <td>{student.mess}</td>
                  <td>{student.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
