
import "../../styles/_StudentPaymentHistory.scss";
import { motion } from "framer-motion";

const StudentPaymentHistory = ({onCancel}) => {
  
  return (
    <motion.div className="stdntpayHistory"initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} >
      <h1>Payment Log</h1>
      <table>
        <tr>
          <th>Name: </th>
          <td>Akash Mohanty</td>
        </tr>
        <tr>
          <th>Balance: </th>
          <td>-1,275</td>
        </tr>
        <tr>
          <th>Latest Amount: </th>
          <td>24,000 </td>
        </tr>
        <tr>
          <th>Payment Date: </th>
          <td>12/09/2024</td>
        </tr>
        <tr>
          <th>Hostel Dues: </th>
          <td>0.00</td>
        </tr>
        <tr>
          <th>Mess Dues: </th>
          <td>1,275</td>
        </tr>
        <tr>
          <th>Meals Consumed: </th>
          <td>32</td>
        </tr>
        <tr>
          <th>Meals Remaining: </th>
          <td>12</td>
        </tr>
      </table>
      <div className="actnBtns">
        <button>Pay</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </motion.div>
  );
};

export default StudentPaymentHistory;
