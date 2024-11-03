/* eslint-disable react/prop-types */
import "../../styles/_StudentIssue.scss"
import { motion } from "framer-motion"

const Issue = ({onCancel}) => {
  return (
    <motion.div className="issueContainer"initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: 0.5, delay: 0.25}}>
      <h1>Raise an Issue</h1>
      <div>
        <label htmlFor="issue">Issue Type</label>
        <select name="issue" id="issue">
          <option value="1">Room related issue</option>
          <option value="2">Mess related issue</option>
          <option value="3">Payment related issue</option>          
        </select>
      </div>
      <button onClick={onCancel}>Cancel</button>
    </motion.div>
  )
}

export default Issue