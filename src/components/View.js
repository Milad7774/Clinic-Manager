import { useState } from "react";
import Nolist from "./Nolist";
import Patients from "./patients";

const View = () => {
  const [list, SetList] = useState(
    JSON.parse(localStorage.getItem("mylist") || "[]"),
  );

  const [notFound, setNotFound] = useState(list.length === 0);
  console.log(notFound, "After");

  function handleDelete(count) {
    if (window.confirm("You are About to Delete this Patient Record, Proceed?")) {
      //Confirm deletion
      console.log("list before is: (",count,'):', list);
      //Removing deleted item
      const newList = list.filter((item) => item.id !== count);
      SetList(newList);
      localStorage.setItem("mylist", JSON.stringify(newList));
      //Display Nolist Component
      if (newList.length == 0) {
        SetList([]);
        setNotFound(true);
      }
      console.log("list After: ", newList);
    }
    else{
        return;
    }
  }

  return (
    <div>
      {notFound && <Nolist display={"You have No Patients records yet!"} add = {true} fun={false}/>}
      {!notFound && <Patients list={list} onDelete={handleDelete} />}
    </div>
  );
};
export default View;
