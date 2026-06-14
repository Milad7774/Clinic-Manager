import toast from "react-hot-toast";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const useSessions = (list, id, add, index) => {

    const navigate = useNavigate();
    //Definig Returned Data
    let data;
    //Checking if the user Adding or Editing
    if(add  == true){
        console.log("I Ran ADD")
        Add()
    }
    else{
        console.log("I Ran Edit")
        Edit()
    }
  function Add() {
    //Toast
    const success = () => toast.success("Added Successfully... Redirecting");

    const failed = () => toast.error("Please Fill All fields or Add (-)");

    //Definig Data
    let index = list.findIndex((item) => item.id === Number(id));

    //Session Object
    const [sessions, setSessions] = useState(() => list[index].sessions);

    const [date, setDate] = useState(
      sessions.Date || new Date().toLocaleDateString("en-CA"),
    );

    const [time, setTime] = useState("");

    const [description, setDescription] = useState("");

    const [paid, setPaid] = useState("");

    //functions
    function handleData(e) {
      e.preventDefault();
      //Validatoin
      if (description === "" || paid === "" || time === "") {
        failed();
        return;
      }

      const session = {
        sessionDate: date,
        time: time,
        description: description,
        paid: paid.replace(/,/g, ""),
      };

      // Update sessions state
      let updatedSessions = [...sessions, session];
      updatedSessions.sort((a, b) => {
        const dateCompare = new Date(a.sessionDate) - new Date(b.sessionDate);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      });
      setSessions(updatedSessions);

      // Update list in localStorage
      const updatedList = [...list];
      updatedList[index] = { ...list[index], sessions: updatedSessions };
      localStorage.setItem("mylist", JSON.stringify(updatedList));

      success();
      setTimeout(() =>{
        navigate(`/PatientSessions/${id}`, { replace: true });
      }, 1000)
    }

    const formatPrice = (price) => {
      const numbers = price.replace(/\D/g, "");

      return Number(numbers).toLocaleString();
    };

     data = (
      <div className="div-form">
        <form onSubmit={handleData} className="form">
          <h1> {list[index].name} </h1>
          <div>
            <label htmlFor="Date">Session Date:</label>
            <input
              type="Date"
              name="Date"
              id="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Time"> Time: </label>
            <input
              type="time"
              name="time"
              id="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="descr"> Desctiption: </label>
            <textarea
              name="descr"
              id="descritpion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="paid"> Paid: </label>
            <input
              type="text"
              name="paid"
              id="paid"
              value={paid}
              onChange={(e) => setPaid(formatPrice(e.target.value))}
            />
          </div>
          <button type="submit"> Add Session </button>
        </form>
      </div>
    );
  }
  function Edit() {
    //Toast
    const success = () => toast.success("Added Successfully... Redirecting");

    const failed = () => toast.error("Please Fill All fields or Add (-)");

    //Definig Data
    let Patient = list.findIndex((item) => item.id === Number(id));

    //Session Object
    const [sessions, setSessions] = useState(() => list[Patient].sessions);

    const [date, setDate] = useState(() => sessions[index].sessionDate);

    const [time, setTime] = useState(sessions[index].time);

    const [description, setDescription] = useState(sessions[index].description);

    const [paid, setPaid] = useState(sessions[index].paid);

    //functions
    function handleData(e) {
      e.preventDefault();
      //Validatoin
      if (description === "" || paid === "" || time === "") {
        failed();
        return;
      }

      const session = {
        sessionDate: date,
        time: time,
        description: description,
        paid: paid.replace(/,/g, ""),
      };

      // Update sessions state
      let updatedSessions = [...sessions];
      updatedSessions[index] = session; 
      updatedSessions.sort((a, b) => {
        const dateCompare = new Date(a.sessionDate) - new Date(b.sessionDate);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      });
      setSessions(updatedSessions);

      // Update list in localStorage
      const updatedList = [...list];
      updatedList[Patient] = { ...list[Patient], sessions: updatedSessions };
      localStorage.setItem("mylist", JSON.stringify(updatedList));

      success();
      //After All is done redirect to Patient
      setTimeout(() =>{
        navigate(`/PatientSessions/${id}`, { replace: true });
      }, 1000)
    }

    const formatPrice = (price) => {
      const numbers = price.replace(/\D/g, "");

      return Number(numbers).toLocaleString();
    };

     data = (
      <div className="div-form">
        <form onSubmit={handleData} className="form">
          <h1> Editing {list[index].name} </h1>
          <div>
            <label htmlFor="Date">Session Date:</label>
            <input
              type="Date"
              name="Date"
              id="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Time"> Time: </label>
            <input
              type="time"
              name="time"
              id="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="descr"> Desctiption: </label>
            <textarea
              name="descr"
              id="descritpion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="paid"> Paid: </label>
            <input
              type="text"
              name="paid"
              id="paid"
              value={paid}
              onChange={(e) => setPaid(formatPrice(e.target.value))}
            />
          </div>
          <button type="submit"> Update Session </button>
        </form>
      </div>
    );
  }
  return { data };
};
export default useSessions;
