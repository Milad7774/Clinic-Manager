import { Link } from "react-router-dom";

const Patients = ({ list, onDelete }) => {
  //Calculating Number of patients and sessions
  let numPatients = 0;

  let numSessions = 0;

  list.map((item =>{
    numPatients++;
    if(item.sessions.length > 0){
      numSessions += item.sessions.length
    }
  }))

  
  console.log(list);
  return (
    <div>
      <div className="patientName" > Patients </div>
      <div className="div-table">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Sessions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td> <Link to={`/PatientSessions/${index}`}>  {item.name} </Link></td>
                <td>{item.phoneNumber}</td>
                <td> <Link to={`/sessions/${index}`}> { item.sessions.length || 'Add Now'} </Link></td>
                <td>
                  <span onClick={() => onDelete(index)}>&#x274C;</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="total">
        <div>
          <span className="total-text"> Total Patients: </span>
          <span className="total-number">{numPatients}</span>
        </div>
        <div>
          <span className="total-text"> Total Sessions: </span>
          <span className="total-number">{numSessions}</span>
        </div>
      </div>
    </div>
  );
};
export default Patients;
