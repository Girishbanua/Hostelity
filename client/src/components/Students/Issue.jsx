const Issue = () => {
  return (
    <>
      <h1>Raise an Issue</h1>
      <div>
        <label htmlFor="issue">Issue Type</label>
        <select name="issue" id="issue">
          <option value="1">Room related issue</option>
          <option value="2">Mess related issue</option>
          <option value="3">Payment related issue</option>          
        </select>
      </div>
    </>
  )
}

export default Issue