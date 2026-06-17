import React, { useState } from "react";
import { jsPDF } from "jspdf";

function GPACalculator() {
    const [totcredit, settotcredit] = useState([]);
    const [totresult, settotresult] = useState([]);
    const [gpa, setgpa] = useState("");
    const [credit, setcredit] = useState("");
    const [result, setresult] = useState("");

    const grades = {
        "A+": 4.0,
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "D": 1.0,
        "F": 0.0
    };

    function handlecreditchange(event) {
        const value = event.target.value;

        if (value === "") {
            setcredit("");
            return;
        }

        const num = Number(value);

        if (num >= 1 && num <= 5) {
            setcredit(num);
        } else {
            alert("Please enter a credit between 1 and 5.");
        }
    }

    function handleresultchange(event) {
        setresult(event.target.value);
    }

    function addModule() {
        if (credit === "" || result === "") {
            alert("Please enter both credit and grade.");
            return;
        }

        settotcredit((prev) => [...prev, credit]);
        settotresult((prev) => [...prev, result]);

        setcredit("");
        setresult("");
        setgpa("");
    }

    function display() {
        let totalPoints = 0;
        let totalCredits = 0;

        for (let i = 0; i < totcredit.length; i++) {
            const grade = totresult[i];

            if (!(grade in grades)) {
                alert(`Invalid grade found: ${grade}`);
                return;
            }

            totalCredits += totcredit[i];
            totalPoints += totcredit[i] * grades[grade];
        }

        if (totalCredits === 0) {
            alert("No modules available.");
            return;
        }

        setgpa((totalPoints / totalCredits).toFixed(2));
    }

    function deletedata(index) {
        const updatedcredit = totcredit.filter((_, i) => i !== index);
        settotcredit(updatedcredit);

        const updatedresult = totresult.filter((_, i) => i !== index);
        settotresult(updatedresult);

        setgpa("");


    }
    function downloadPDF() {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("GPA Report", 20, 20);

        let y = 40;

        doc.setFontSize(12);
        doc.text("Credit", 20, y);
        doc.text("Grade", 80, y);

        y += 10;

        for (let i = 0; i < totcredit.length; i++) {
            doc.text(String(totcredit[i]), 20, y);
            doc.text(String(totresult[i]), 80, y);
            y += 10;
        }

        y += 10;
        doc.text(`Final GPA: ${gpa}`, 20, y);

        doc.save("GPA_Report.pdf");
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
                    placeholder="Credit"
                    value={credit}
                    onChange={handlecreditchange}
                />

                <select
                    value={result}
                    onChange={handleresultchange}
                >
                    <option value="">Select Grade</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select>

                <button
                    className="addbtn"
                    onClick={addModule}
                >
                    Add
                </button>
            </div>

            <br />

            {totcredit.length > 0 && (
                <table border="3">
                    <thead>
                        <tr>
                            <th>Credit</th>
                            <th>Grade</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {totcredit.map((cre, index) => (
                            <tr key={index}>
                                <td>{cre}</td>
                                <td>{totresult[index]}</td>
                                <td>
                                    <button
                                        className="deletebtn"
                                        onClick={() => deletedata(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <br />

            <button
                className="finishedbtn"
                onClick={display}
            >
                Calculate GPA
            </button>

            <div className="final">
                <h2>
                    Your GPA: <span>{gpa}</span>
                </h2>
            </div>
            <button 
            className="downloadbtn"
            onClick={downloadPDF}>
                Download PDF
            </button>
            <footer>&copy; 2026 S. Mayoorthanan.</footer>
        </div>
    );
}

export default GPACalculator;