import { useNavigate } from "react-router-dom";
import "../../styles/_StudentSignUp.scss";

const StaffRegister = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="signupContainer">
        <div className="signupBox">
          <h1>Sign Up</h1>
          <form id="signupForm" method="POST">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your Name"
                required                                
              />
            </div>
            <div>
              <label htmlFor="mail">Email</label>
              <input
                type="email"
                id="mail"
                placeholder="Enter your email address"
                required                                
              />
            </div>
            {/*Phone Number*/}
            <div>
              <label htmlFor="phnNumber">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                required
                autoComplete="off"                                
              />
            </div>
            
            {/*Total Duration maximum 3 years*/}
            <div>
              <label htmlFor="totalDuration">Select Job Type: </label>
              <select
                name="duration"
                id="totalDuration"                                
              >
                <option>Clerk</option>
                <option>Mess</option>
                <option>Cleaning</option>
              </select>
            </div>

            {/*Password*/}
            <div>
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                placeholder="Enter a strong password"
                required                                
              />
            </div>
            {/*Confirm Password*/}
            <div>
              <label htmlFor="confirmPass">Confirm Password</label>
              <input
                type="password"
                id="confirmPass"
                placeholder="Enter a strong password"
                required                                
              />
            </div>
                        
            <div className="formBtns">
              <a onClick={() => navigate("/loginas")}>Cancel</a>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StaffRegister