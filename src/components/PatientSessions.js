import { useState } from "react";
import { useParams } from "react-router-dom";

const PatientSessions = () => {

    //ID
    const { id } = useParams();

    const [list] = useState( () => JSON.parse(localStorage.getItem('mylist')));

    const [patientSessions, setSessions] = useState(() => list[id].sessions)

    const [notFound, setNotFound] = useState(() => list[id].sessions.length === 0)

    //Calculate Amount and sessions
    let totalPaid = 0;

    let totalSessoins = 0;

    patientSessions.map((item) =>{
      totalPaid += Number(item.paid)
      totalSessoins++;
    })
    


    //functions
    function handleDelete(count){
        if(window.confirm("You are About to Delete this Session, Proceed?")){
            console.log('list before is:', list);
            let newList = patientSessions.filter((_, i) => i !== count);
            setSessions(newList);
            //Updating in local storage
            const deletedList = [...list];
            deletedList[id] = {...list[id], sessions: newList }
            localStorage.setItem('mylist', JSON.stringify(deletedList))
        }
        else{
            return;
        }
    }


  return (
    <div>
        <div className="patientName" > {list[id].name} </div>
      <div className="div-table">
        <table className="table">
          <thead>
            <tr>
              <th>Session Number</th>
              <th>Session Date</th>
              <th>Session Time</th>
              <th>Description</th>
              <th>Amount Paid</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patientSessions.map((item, index) => (
              <tr key={index}>
                <td>
                    {index + 1}
                </td>
                <td style={{width: "200px"}}>
                     {item.sessionDate}
                </td>
                <td>
                    {item.time}
                </td>
                <td>
                    {item.description}
                </td>
                <td>
                     { Number(item.paid).toLocaleString()}
                </td>
                <td>
                  <span onClick={() => handleDelete(index)}>&#x274C;</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total">
        <div>
          <span className="total-text"> Total Paid: </span>
          <span className="total-number">{totalPaid.toLocaleString()} SYP</span>
        </div>
        <div>
          <span className="total-text"> Total Sessions: </span>
          <span className="total-number">{totalSessoins}</span>
        </div>
      </div>
    </div>
  );
};

export default PatientSessions;
