import { useState } from "react";
import Nolist from "./Nolist";

const Appointments = () => {
  //Grab data
  let list = JSON.parse(localStorage.getItem("mylist") || '[]');

  let stop = true;

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
              {list.map((itemList, index) => (
                list[index].sessions.map((item, indexSessions) =>{
                    if(new Date(item.sessionDate).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)){
                        stop = false
                        return(
                            <tr key={index++}>
                                <td>{ itemList.name }</td>
                                <td> {itemList.phoneNumber} </td>
                                <td> {item.sessionDate} </td>
                                <td> {item.time} </td>
                            </tr>
                            )
                    }
                    else if(index + 1 == list.length && indexSessions + 1 == list[index].sessions.length && stop){
                        setNotFound(true)
                    }
                })
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
