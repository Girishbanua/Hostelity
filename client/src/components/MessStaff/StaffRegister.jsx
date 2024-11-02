import { useNavigate } from "react-router-dom";
import "../../styles/_StudentSignUp.scss";

const StaffRegister = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="signupContainer">
        <div className="signupBox">
          <h1>Sign Up</h1>
          <form id="signupForm" method="POST" className="messRegstr">
            <section>
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
              </section>
              {/*Phone Number*/}
              <section>
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
                <select name="duration" id="totalDuration">
                  <option>Clerk</option>
                  <option>Mess</option>
                  <option>Cleaning</option>
                </select>
              </div>
            </section>

            {/*Password*/}
            <section>
              <div>
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  id="pass"
                  placeholder="Enter a strong password"
                  required
                />
              </div>
              </section>
              {/*Confirm Password*/}
              <section>
              <div>
                <label htmlFor="confirmPass">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPass"
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </section>

            <div className="formBtns">
              <a onClick={() => navigate("/loginas")}>Cancel</a>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffRegister;
