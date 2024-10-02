import "../styles/_Modal.scss";

const Modal = ({ message }) => {
  return (
    <div className="modal">
      <div className="modal_content">        
        <div className="modalHeader">
          <p>Student Registration</p>
        </div>
        <div className="modalBody">
          <h1>{message}</h1>
        </div>
        <div className="modalFooter">
          <button className="loginBtn">Login</button>
          <button className="closeBtn">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
