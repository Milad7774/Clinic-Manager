import { useState } from "react";
import toast from 'react-hot-toast';

const Create = () =>{
    const [list, setList] = useState(() => 
    JSON.parse(localStorage.getItem('mylist') || '[]')
    );

    const success = () => toast.success('Operation completed successfully!');

    const failed = () => toast.error('Name Field is empty!');

    //input Data
    const [name, setName] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    //Handle Data
    function handleData(e){
        e.preventDefault();
        if(name === ""){
            failed();
            return;
        }
        else{
            const patients = {
                id: Date.now(),
                name: name,
                phoneNumber: phoneNumber,
                sessions: []
            }

            setList([...list, patients]);
            //sortedList
            let sortedList = [...list, patients];
            sortedList = sortedList.sort((a,b) => a.name.localeCompare(b.name));
            try{
                localStorage.setItem('mylist', JSON.stringify(sortedList));
            }
            catch(err){
                if(err.name === 'QuotaExceededError'){
                    alert("Maximum Storage is Exceeded")
                }
            }
            setName('');
            setPhoneNumber('');
            success();
        }
    }

    return(
        <div className="div-form">
            <form onSubmit={handleData} className="form">
                <h1>Add New Patient</h1>
                <div>
                <label htmlFor = "Spent-ON" >Name<span style={{color: 'red'}}>*</span> :</label>
                <input type = "text" name = "Spent-on" id = "Spent-ON" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor = "Money"> Phone Number: </label>
                    <input type = "text" name = "money" id = "Money" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <button type="submit"> Add </button>
            </form>
        </div>
    )
}
export default Create;