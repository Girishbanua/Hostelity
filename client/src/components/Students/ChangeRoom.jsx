/* eslint-disable react/prop-types */

import { useState } from "react";
import "../../styles/_ChangeRoom.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { UseAuth } from "../../store/auth";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const ChangeRoom = ({ onCancel, roomNum }) => {
  const sid = localStorage.getItem("StudentID");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [newRoomType, setNewRoomType] = useState("random");
  const { formattedDate } = UseAuth();
  const [msg, setMsg] = useState("");
  let msgID = sid
    .match(/\d/g)
    .filter((digit) => digit != "0")
    .join("");
  msgID = msgID.substring(0, 12);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sid: ", sid);
    console.log("newRoomType: ", newRoomType);
    console.log("msg:", msg);
    console.log("msgID: ", msgID);
    onOpenModal();
  };
  const confirmSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/requestChangeRoom",
        {
          rdt: formattedDate,
          oid: sid,
          rid: msgID,
          roomNum,
          nRoomType: newRoomType,
          msg,
          status: "pending",
          rtype: "room change",
        }
      );
      if (res.status === 200) {
        toast.success("Room change request sent successfully");
        onCancel();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(`Room change request failed: ${error.response.statusText}`);
    }
  };

  return (
    <motion.div
      className="changeRoom"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h1>Change Room</h1>
      <motion.div
        className="note"
        initial={{ opacity: 0, y: -50 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>
          Note: Room change request will be processed within 24 hours and once
          changed, you are not allowed to change the room for the next 6 months
        </p>
      </motion.div>
      <form onSubmit={handleSubmit}>
        {/***********************Room Type Component****************/}
        <div className="roomType">
          <label htmlFor="proom">New Room Type: </label>
          <select
            name="proom"
            id="proom"
            value={newRoomType}
            onChange={(e) => setNewRoomType(e.target.value)}
            required
          >
            <option value="random">Random</option>
            <option value="Single Room">Single Room</option>
            <option value="Dual Room">Dual Room</option>
            <option value="Triple Sharing Room">Triple Sharing Room</option>
            <option value="Quad Sharing Room">Quad Sharing Room</option>
          </select>
        </div>
        <div className="chngMsg">
          <label htmlFor="chngMsg">
            Reason for room change <span>(*required)</span>:{" "}
          </label>
          <br />
          <textarea
            name="chngMsg"
            cols="70"
            rows="10"
            required
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>
        </div>
        <div className="buttons">
          <button type="submit" onSubmit={handleSubmit}>
            Request change
          </button>
          <button onClick={onCancel}>Cancel</button>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            styles={{
              modal: {
                borderRadius: "10px",
                width: "500px",
                minHeight: "400px",
                padding: "20px",
                fontSize: "1.2rem",
              },
              overlay: {
                background: "rgba(218, 107, 67, 0.5)",
                backdropFilter: "blur(5px)",
              },
              closeButton: {
                background: "coral",
                borderRadius: "5px",
              },
            }}
            classNames={{
              modal: "modal",
              overlay: "customOverlay",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <header
                style={{
                  alignSelf: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  margin: "20px 0",
                  color: "coral",
                }}
              >
                Request Details
              </header>
              <p>Date: {formattedDate}</p>
              <br />
              <p>
                Request ID: <b>{msgID}</b>
              </p>
              <p>
                Room Number: <b>{roomNum}</b>
              </p>
              <p>
                New Room Type: <b>{newRoomType}</b>
              </p>
              <p>
                Reason for change: <b>{msg}</b>
              </p>
              <button
                type="submit"
                onClick={() => {
                  onCloseModal();
                  confirmSubmit();
                }}
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  background: "coral",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  margin: "20px 0",
                  alignSelf: "center",
                }}
              >
                Confirm Change
              </button>
            </div>
          </Modal>
        </div>
      </form>
    </motion.div>
  );
};

export default ChangeRoom;
