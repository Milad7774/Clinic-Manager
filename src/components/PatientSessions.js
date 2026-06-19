import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const PatientSessions = () => {

    //ID
    const { id } = useParams();
    //Navigation to Add
    const navigate = useNavigate();
    //List with everything
    const [list] = useState( () => JSON.parse(localStorage.getItem('mylist')));

    console.log(list);
    //Get patients index in list
    let index = list.findIndex((item) => item.id === Number(id));
    //Get patietns Records
    const sessions = list[index]
    
    console.log("New Sessions", sessions.sessions, 'index is:', index);

    const [patientSessions, setSessions] = useState(sessions.sessions)


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
            console.log(list, "LIST");
            let newList = patientSessions.filter((_, i) => i !== count);
            console.log("NEWLIST", newList)
            setSessions(newList);
            //Updating in local storage
            const deletedList = [...list];

            console.log(deletedList, "This is deleted list");

            console.log(deletedList[index], "DELETED LIST[",index,"]")
            //Grabbing the patient sessions and replacing it with the deleted ones
            deletedList[index] = {...list[index], sessions: newList }

            console.log("Replaced list[", index, "] With this: ", deletedList[index]);

            localStorage.setItem('mylist', JSON.stringify(deletedList))

            console.log(deletedList, "Deleted to be stored!!");
        }
        else{
            return;
        }
    }


  return (
    <div>
        <div className="patientName" >{sessions.name} <span onClick={() => navigate(`/sessions/${id}/${true}`, {replace: true})} style={{cursor: "pointer"}}> &#10133; </span> </div>
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
                <td style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                  <Link to={`/sessions/${id}/${false}/${index}`}> <span title="Edit Session"> &#128221; </span> </Link> 
                  <span title="Delete Session" onClick={() => handleDelete(index)}>&#x274C;</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total">
        <div className="test">
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
    </div>
  );
};

export default PatientSessions;
