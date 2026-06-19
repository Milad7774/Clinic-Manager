import { useState } from "react";
import { Link } from "react-router-dom";
import useSearchBar from "../SearchBar logic/SearchLogic";

const Patients = ({ list, onDelete }) => {
  //Calculating Number of patients and sessions
  let numPatients = 0;

  let numSessions = 0;

  const [search, setSearch] = useState("");

  const { data } = useSearchBar(list, search);

  list.map((item) => {
    numPatients++;
    if (item.sessions.length > 0) {
      numSessions += item.sessions.length;
    }
  });

  console.log(list);
  return (
    <div>
      {/* <div className="patientName" >Patient</div> */}
      <div className="div-table">
        <div className="wrapper">
          <input
            className="searchBar"
            type="text"
            placeholder="Search Name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
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
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    {" "}
                    <Link
                      title="View Records"
                      to={`/PatientSessions/${item.id}`}
                    >
                      {" "}
                      {item.name}{" "}
                    </Link>
                  </td>
                  <td> {item.phoneNumber} </td>
                  <td>
                    {" "}
                    {item.sessions.length || (
                      <Link to={`/sessions/${item.id}/${true}`}> Add </Link>
                    )}{" "}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <Link
                      to={`/sessions/${item.id}/${true}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span title="Add Session"> &#128137; </span>{" "}
                    </Link>
                    <span
                      title="Delete All Records"
                      onClick={() => onDelete(item.id)}
                    >
                      &#x274C;
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="total">
        <div className="test">
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
    </div>
  );
};
export default Patients;
