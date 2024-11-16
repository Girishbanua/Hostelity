/* eslint-disable react/prop-types */

import "../../styles/_StudentPaymentHistory.scss";
import { motion } from "framer-motion";

const StudentPaymentHistory = ({ onCancel,Shpay,ohpay, ompay, Mhpay, name, hpay,mpay, lpay, pdate, messOn, balance, days, mrem }) => {
  return (
    <motion.div
      className="stdntpayHistory"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h1>Payment Log</h1>
      <table>
        <tbody>
        <tr>
          <th>Name: </th>
          <td>{name}</td>
        </tr>
        <tr>
          <th>Balance: </th>
          <td><b>{balance}</b></td>
        </tr>
        <tr>
          <th>Last Payment: </th>
          <td>{lpay}</td>
        </tr>
        <tr>
          <th style={{ fontSize:"0.8rem"}}>Last Hostel Payment: </th>
          <td style={{ fontSize:"0.8rem"}}>{ohpay}</td>
        </tr>
        <tr>
          <th style={{ fontSize:"0.8rem"}}>Last Mess Payment: </th>
          <td style={{ fontSize:"0.8rem"}}>{ompay}</td>
        </tr>
        <tr>
          <th>Payment Date: </th>
          <td>{pdate}</td>
        </tr>
        <tr>
          <th>Hostel Dues: </th>
          <td><b>{hpay > 0 ? "No dues" : Shpay}</b></td>
        </tr>
        {messOn && (
          <>
            <tr>
              <th>Mess Dues: </th>
              <td><b>{mpay > 0 ? "No dues" : Mhpay}</b></td>
            </tr>
            <tr>
              <th>Meals Consumed: </th>
              <td>{days*2}</td>
            </tr>
            <tr>
              <th>Meals Remaining: </th>
              <td>{mrem}</td>
            </tr>
          </>
        )}
        </tbody>
      </table>
      <div className="actnBtns">
        <button>Pay</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </motion.div>
  );
};

export default StudentPaymentHistory;
