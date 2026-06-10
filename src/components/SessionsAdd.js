import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Sessions = () => {
  //Getting ID
  const { id } = useParams();
  //Getting List
  const [list] = useState(() =>
    JSON.parse(localStorage.getItem("mylist") || "[]"),
  );

  //Session Object
  const [sessions, setSessions] = useState(() => list[id].sessions);

  //Toast
  const success = () => toast.success("Added Successfully");

  const failed = () => toast.error("Please Fill All fields or Add (-)");
  //Definig Data

  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));

  const [time, setTime] = useState("");

  const [description, setDescription] = useState("");

  const [paid, setPaid] = useState("");

  //functions

  function handleData(e) {
    e.preventDefault();

    if (description === "" || paid === "") {
      failed();
      return;
    }

    const session = {
      sessionDate: date,
      time: time,
      description: description,
      paid: paid.replace(/,/g, "")
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
    updatedList[id] = { ...list[id], sessions: updatedSessions };
    localStorage.setItem("mylist", JSON.stringify(updatedList));

    // Clear form
    setDescription("");
    setPaid("");
    setTime("");
    setDate(new Date().toLocaleDateString("en-CA"));

    success();
  }

  const formatPrice = (price) => {
    const numbers = price.replace(/\D/g, "");

    return Number(numbers).toLocaleString();
  };

  return (
    <div className="div-form">
      <form onSubmit={handleData} className="form">
        <h1> {list[id].name} </h1>
        <div>
          <label htmlFor="Date">
            Session Date<span style={{ color: "red" }}>*</span>:
          </label>
          <input
            type="Date"
            name="Date"
            id="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Time">
            {" "}
            Time<span style={{ color: "red" }}>*</span>:{" "}
          </label>
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
          <textarea name="descr" id="descritpion" value={description}  onChange={(e) => setDescription(e.target.value)}>
          
          </textarea>
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
};
export default Sessions;
