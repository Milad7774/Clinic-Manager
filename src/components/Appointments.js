import { useEffect, useState } from "react";
import Nolist from "./Nolist";
import useSearchBar from "../SearchBar logic/SearchLogic";

const Appointments = () => {
  //Grab data
  let list = JSON.parse(localStorage.getItem("mylist") || "[]");

  const [notFound, setNotFound] = useState(() => true);

  const [stop, setStop] = useState(() => true);

  const [search, setSearch] = useState("");

  let sessions = [];

  list.map((itemList, indexList) => {
    list[indexList].sessions.map((itemSessions) => {
      //Date with time
      let hours = itemSessions.time[0] + itemSessions.time[1];

      let minutes = itemSessions.time[3] + itemSessions.time[4];

      let Date_array = new Date(itemSessions.sessionDate).setHours(
        Number(hours),
        Number(minutes),
      );

      if (Date_array >= new Date() && stop) {
        setStop(false);
        setNotFound(false);
      }

      if (Date_array >= new Date()) {
        const patientSession = {
          name: itemList.name,
          session: itemSessions.sessionDate,
          time: itemSessions.time,
          phoneNumber: itemList.phoneNumber,
        };
        sessions = [...sessions, patientSession];
      }
    });
  });

  //Sorting
  console.log(sessions, "Before Sorting");
  sessions.sort((a, b) => {
    const dateCompare = new Date(a.session) - new Date(b.session);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });
  console.log(sessions, "After Sorting");

  console.log(list);
  //Custom Hook After sorting session by Date
  const {data} = useSearchBar(sessions, search);

  return (
    <div>
      {notFound && (
        <Nolist display={"You have no Appointments!"} add={false} fun={true} />
      )}
      {!notFound && (
        <div>
          <div className="div-table">
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
                  <th>Session Date</th>
                  <th>Session Time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td> {item.name} </td>
                      <td> {item.phoneNumber} </td>
                      <td> {item.session} </td>
                      <td> {item.time} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
