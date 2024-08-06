import React, { useState } from "react";
import axios from 'axios';

function Create({ onAdd }) {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', { task })
            .then(result => {
                onAdd(result.data);
                setTask(""); // Clear the input field after adding the task
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="create_form">
            <input 
                type="text" 
                placeholder="Enter Task" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
