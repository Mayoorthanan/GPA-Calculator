import React, { useState } from "react";

function GPACalculator() {
    const [totcredit, settotcredit] = useState([4, 3]);
    const [totresult, settotresult] = useState(["A", "B"]);

    const [credit, setcredit] = useState("");
    const [result, setresult] = useState("");

    function handlecreditchange(event) {
        const value = event.target.value;

        if (value === "") {
            setcredit("");
            return;
        }

        const num = Number(value);

        if (num > 0 && num < 6) {
            setcredit(num);
        }
        else{
            alert("Please enter credit between 1 to 5");
        }
    }

    function handleresultchange(event) {
        setresult(event.target.value);
    }

    function addModule() {
        if (credit === "" || result.trim() === "") {
            alert("Please enter both credit and result.");
            return;
        }

        settotcredit((prev) => [...prev, credit]);
        settotresult((prev) => [...prev, result.toUpperCase()]);

        setcredit("");
        setresult("");
    }

    return (
        <div>
            <h1>GPA Calculator App</h1>

            <div className="adddetails">
                <span>Module Credit: </span>

                <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Enter Credit"
                    value={credit}
                    onChange={handlecreditchange}
                />

                <input
                    type="text"
                    placeholder="Enter Module Result"
                    value={result}
                    onChange={handleresultchange}
                />

                <button
                    className="addbtn"
                    onClick={addModule}
                >
                    Add
                </button>
            </div>

            <br />

            <table border="3">
                <thead>
                    <tr>
                        <th>Credit</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>
                    {totcredit.map((cre, index) => (
                        <tr key={index}>
                            <td>{cre}</td>
                            <td>{totresult[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GPACalculator;