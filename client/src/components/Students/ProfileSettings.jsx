/* eslint-disable react/prop-types */
import "../../styles/_ProfileSettings.scss"
import { motion } from "framer-motion"

const ProfileSettings = ({onCancel}) => {
  return (
    <motion.div className="profileSettings" initial={{ opacity: 0, y: -100}} exit={{ opacity: 0}} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
      <h1>Profile Settings</h1>
      <div className="profileContainer">
        <label>Name: <input type="text" value="Aakash Mohanty" placeholder="Aakash Mohanty"/></label>
        <label>Email: <input type="email" value="aakashmohanty@gmail.com" placeholder="aakashmohanty@gmail.com"/></label>
        <label>Phone: <input type="text" value="7939432915" placeholder="7939432915"/></label>
        <label>Roll No: <input type="text" value="222122130" placeholder="222122130"/></label>
        <label>College: <input type="text" value="CENTRE FOR POST GRADUATE STUDIES" placeholder="CENTRE FOR POST GRADUATE STUDIES"/></label>
        <label>Department: <input type="text" value="COMPUTER SCIENCE AND APPLICATION" placeholder="COMPUTER SCIENCE AND APPLICATION"/></label>
      </div>
      <div className="profilebuttons">
        <button>Update</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </motion.div>
  )
}

export default ProfileSettings
