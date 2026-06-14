import { useState } from "react";
import { useParams } from "react-router-dom";
import useSessions from "../SearchBar logic/SessionsManager";


const Sessions = () => {
  //Getting ID And sessions index if Editing
  const { id } = useParams();

  const { index } = useParams();
  //Getting List
  const [list] = useState(() => JSON.parse(localStorage.getItem("mylist") || "[]"));
  //ADD or Edit
  let { add } = useParams();
  
  add = add == 'false' ? Boolean(0) : Boolean(1);

  const {data} = useSessions(list, id, add, index);

  return(
    data
  )
};
export default Sessions;
