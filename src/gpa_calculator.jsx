import React,{useState} from "react";

function gpa_calculator(){

    const [totresult,settotresult]=useState([4,3]);
    const [totcredit,settotcredit]=useState(["A","B"]);
    const [credit,setcredit]=useState();
    const [result,setresult]=useState("");

    function handlecreditchange(credit){
        if(credit.target.value<6 && credit.target.value>=0){
            settotcredit(t=>[...t,credit]);
            setcredit();

        }
        else{
            alert("Your credit must be 1 to 5.");
            setcredit();
        }
    }

    function handleresultchange(result){
        
        setresult(result.target.value);
        if(newtask.trim()!=""){
            settotresult(t=>[...t,result]);
            setresult("");

        }
        else{
            alert("Input your result of this module");
        }

    }


    return(
    <div>
        <h1>GPA Calculator App</h1>

        <div className="adddetails">
            Module Credit: 
            <input 
            type="number" 
            min={1}
            max={5}
            placeholder="Enter"
            value={credit}
            onChange={handlecreditchange}/>

            <input 
            type="text"
            placeholder="Enter the module result"
            value={result}
            onChange={handleresultchange}/>

            <button
            className="addbtn">
                Add
            </button>

        </div>

        





    </div>);
}

export default gpa_calculator;

/* const gradePoints = {
  "A+": 4.0,
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D": 1.0,
  "F": 0.0
}; */