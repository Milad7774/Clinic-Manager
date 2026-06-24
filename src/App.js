import NavBar from "./components/NavBar";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Create from "./components/Create";
import View from "./components/View";
import { Toaster } from 'react-hot-toast';
import Sessions from "./components/SessionsAdd";
import PatientSessions from "./components/PatientSessions";
import Appointments from "./components/Appointments";
import PatientDetails from "./components/PatientDetails";

const App = () => {

  return(
    <Router >
    <div>
    <Toaster position="top-right" reverseOrder={false} />
      <div>
      <NavBar/>
      </div>
      <Routes>
        <Route path="/" element = {<Navigate to='/Create' replace/>}/>
        <Route path="/sessions/:id/:add/:index" element = {<Sessions/>}/>
        <Route path="/sessions/:id/:add/" element = {<Sessions/>}/>
        <Route path="/PatientSessions/:id/" element = {<PatientSessions/>}/>
        <Route path="/View" element = { <View/> }/>
        <Route path="/Create" element = { <Create/> }/>
        <Route path="/Appointments" element = { <Appointments/> }/>
        <Route path="/PatientDetails/:id" element = { <PatientDetails/> }/>
      </Routes>
    </div>
    </Router>
  )
}
export default App;
