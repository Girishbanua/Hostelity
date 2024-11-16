/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../styles/_Requests.scss";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Requests = () => {
  const REQ_URL = "http://localhost:4000/api/getRequests";
  const [aplcntData, setAplicantData] = useState([]);
  const [requestMsg, setRequestMsg] = useState("0");

  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    setOpen(true);
    handleFind();
  };
  const onCloseModal = () => setOpen(false);

  const [rooms, setRooms] = useState([]);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(REQ_URL);
        
        if (res.data.result.length === 0) {
          return setRequestMsg("No Requests Available");
        }
        console.log("response: ", res.data.result);
        const result = res.data.result;
        console.log("result: ", result);
        setAplicantData(result);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  const handleFind = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/getAllRoom");
      const result = res.data.result;
      console.log("result: ", result);
      setRooms(result);
      console.log("rooms: ", rooms);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  const RequestComp = ({
    rtype,
    name,
    email,
    rid,
    rdt,
    roomNum,
    nRoomType,
    msg,
  }) => {
    return (
      <div className="request">
        <div className="requestDetails">
          <div>
            <h3>Request ID: </h3>
            <p>
              <b>{rid}</b>
            </p>
          </div>
          <div>
            <h3>Request Type: </h3>
            <p>
              <b>{rtype}</b>
            </p>
          </div>
          <div>
            <h3>Request Date:</h3>
            <p>
              <b>{rdt}</b>
            </p>
          </div>
          <div>
            <h3>{rtype} Details:</h3>
            {rtype === "room change" ? (
              <ul>
                <li>
                  New Room Type: <b> {nRoomType}</b>
                </li>
                <li>
                  Reason: <b>{msg}</b>
                </li>
              </ul>
            ) : rtype === "payment" ? (
              <ul>
                <li>
                  Transaction ID: <b>{}</b>
                </li>
                <li>
                  Transaction Date: <b>{}</b>
                </li>
              </ul>
            ) : (
              <p>
                <b>{msg}</b>
              </p>
            )}
          </div>
          <div>
            <h3>Request By:</h3>
            <p>
              <b>{name}</b>
            </p>
          </div>
          <div>
            <h3>Room Number:</h3>
            <p>{roomNum}</p>
          </div>
          <div>
            <h3>Email ID: </h3>
            <i>{email}</i>
          </div>
        </div>
        <div className="approve-reject-buttons">
          <button className="approve" disabled>Approve</button>
          <button className="reject" onClick={() => {alert("Request Rejected")}}>Reject</button>
          {rtype === "room change" && (
            <button
              className="check"
              onClick={() => {
                onOpenModal();
                handleFind();
              }}
            >
              Check
            </button>
          )}
          {rtype === "payment" && <button className="check">Validate</button>}

          {/****************** Modal starts here ************************ */}
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            styles={{
              modal: {
                borderRadius: "10px",
                width: "70vw",
                minHeight: "400px",
                padding: "20px",
                fontSize: "1.2rem",
              },
              overlay: {
                background: "rgba(218, 107, 67, 0.3)",
              },
              closeButton: {
                background: "coral",
                borderRadius: "5px",
              },
              closeIcon: {
                color: "white",
              },
            }}
          >
            <h2>Vacant Rooms</h2>
            <div
              className="roomDetails"
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {rooms
                .filter(
                  (room) =>
                    room.roomType ===
                    (nRoomType === "single room"
                      ? "1"
                      : nRoomType === "double room"
                      ? "2"
                      : "4")
                )
                .map((room, index) => {
                  console.log("room: ", nRoomType);
                  return (
                    <div
                      key={index}
                      className="vacantRoomList"
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        margin: "10px 0",
                        width: "300px",
                        background: "coral",
                        color: "white",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <p>Room Number:</p>
                        <b>{room.roomNumber}</b>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <p>Room Type:</p>
                        <b style={{fontSize: "0.8rem" }}>
                          {room.roomType === "1"
                            ? "Single Room"
                            : room.roomType === "2"
                            ? "Double SharingRoom"
                            : room.roomType === "3"
                            ? "Triple Sharing Room"
                            : "Quad Sharing Room"}
                        </b>
                      </div>
                      <div>
                        <p>Occupants: <b>{room.students.length}</b> </p>
                        <div style={{ fontSize: "0.85rem" }}>
                          <ul style={{ listStyle: "none", margin: "10px 0" }}>
                          {room.students.length > 0 ? (
                            room.students.map((student, index) => 
                              <li key={index}>{index+1}.{" "}{student.name}</li>
                            )
                          ) : (
                            <li><i>No Occupants</i></li>
                          )}
                          </ul>                          
                        </div>
                      </div>                      
                      <button
                        style={{
                          border: "none",
                          padding: "10px",
                          borderRadius: "5px",
                          fontSize: "1rem",
                          width: "100%",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                        disabled={Number(room.roomType) === room.students.length}
                      >
                        Assign
                      </button>
                    </div>
                  );
                })}
            </div>
          </Modal>
          {/****************** Modal ends here ************************ */}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="requestsBox"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.25 }}
    >
      <div className="reqNav">
        <h1>Requests</h1>
        <div className="searchBox">
          <label htmlFor="search">Search Request ID: </label>
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            placeholder="Enter request ID"
          />
          <label htmlFor="filter">Filter: </label>
          <select name="filter" id="filter">
            <option value="all">all</option>
            <option value="room">room change</option>
            <option value="pay">payment requests</option>
            <option value="issue">other issues </option>
          </select>
          <img src="/images/filter.png" alt="sort" />
        </div>
      </div>
      <div className="requestsContainer">
        {requestMsg != "0" ? (
          <div className="noReq">
            <img src="/images/error.png" alt="error" />
            <p>{requestMsg}</p>
          </div>
        ) : (
          aplcntData.map((data) => {
            return (
              <RequestComp
                key={data._id}
                rtype={data.rtype}
                rid={data.rid}
                rdt={data.rdt}
                msg={data.msg}
                nRoomType={data.nRoomType}
                roomNum={data.roomNum}
                name={data.name}
                email={data.email}
              />
            );
          })
        )}
      </div>
    </motion.div>
  );
};

export default Requests;
