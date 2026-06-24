import { useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditPatient = () =>{
    //Data
    let list = JSON.parse(localStorage.getItem('mylist') || '[]');

    const { id } = useParams();

    console.log(id, "id")

    const index = list.findIndex((item) => item.id == id);

    const [name, setName] = useState(list[index].name);

    const [phoneNumber, setPhoneNumber] = useState(list[index].phoneNumber)

    console.log(list, "List");

    console.log(index, 'index');
    //Toast
    const success = () => toast.success("Added Successfully... Redirecting");

    const failed = () => toast.error("Please Fill All fields or Add (-)");

    const phonFailed = () => toast.error("Phone must be Numeric")
    //navigate
    const navigate = useNavigate();

    //functoins
    function handleData(e){
        //Dont make page reload
        e.preventDefault();
        //Validation
        if (name === "") {
            failed();
            return;
        }
        if(isNaN(phoneNumber)){
            phonFailed();
            return
        }
        //Editin logic
        let editedData = [...list];
        console.log(editedData, "edited before")
        console.log(editedData[index], "Targeted")
        editedData[index] = {...list[index], name : name, phoneNumber: phoneNumber};
        console.log(editedData, "Here");
        //Update in localStorage
        localStorage.setItem('mylist', JSON.stringify(editedData));
        //show success
        success();
        //Go back to patients
        setTimeout(() => {
            navigate('/View', { replace : true })
        }, 1000);
    }
    
    return(
        <div className="div-form">
            <form onSubmit={handleData} className="form">
                <h1>Editing { list[index].name }</h1>
                <div>
                <label htmlFor = "Spent-ON" >Name<span style={{color: 'red'}}>*</span> :</label>
                <input type = "text" name = "Spent-on" id = "Spent-ON" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor = "Money"> Phone Number: </label>
                    <input type = "text" name = "money" id = "Money" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <button type="submit"> Edit </button>
            </form>
        </div>
    )
}
export default EditPatient;