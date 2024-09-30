const ChangeRoom = () => {
  return (
    <>
      <h1>Change Room</h1>
      <div className="roomType">
        <label htmlFor="proom">Present Room Type: </label>
        <select name="proom" id="proom">
          <option value="1">Single Room</option>
          <option value="2">Dual Room</option>
          <option value="3">Triple Sharing Room</option>
          <option value="4">Quad Sharing Room</option>
        </select>
      </div>
      <div>
        <label htmlFor="nroom">Select New Room Type: </label>
        <select name="nroom" id="nroom">
          <option value="1">Single Room</option>
          <option value="2">Dual Room</option>
          <option value="3">Triple Sharing Room</option>
          <option value="4">Quad Sharing Room</option>
        </select>
      </div>
      <div>
        <button>Change</button>
      </div>
    </>
  );
};

export default ChangeRoom;
