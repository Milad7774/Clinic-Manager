import { useState } from "react";
import Nolist from "./Nolist";

const Appointments = () => {
  //Grab data
  let list = JSON.parse(localStorage.getItem("mylist") || '[]');

  let stop = true;

  let sessions = [];

  list.map((itemList, indexList) =>{
    list[indexList].sessions.map((itemSessions, indexSessoins) =>{
      const patientSession = {
        name: itemList.name,
        session: itemSessions.sessionDate,
        time: itemSessions.time,
        phoneNumber: itemList.phoneNumber
      }
      sessions = [...sessions, patientSession]
    })
  })
  console.log(sessions, "Before Sorting")
  sessions.sort((a, b) => {
    const dateCompare = new Date(a.session) - new Date(b.session);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
    });
    console.log(sessions, "After Sorting");



  console.log(list)

  const [notFound, setNotFound] = useState(list.length === 0);

  return (
    <div>
      {notFound && (
        <Nolist display={"You have no Appointments!"} add={false} fun={true} />
      )}
      {!notFound && (
        <div className="div-table">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Session Date</th>
                <th>Session Time</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((item, index) =>{
                return(
                  <tr key={index}>
                    <td> {item.name} </td>
                    <td> {item.phoneNumber} </td>
                    <td> {item.session} </td>
                    <td> {item.time} </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
