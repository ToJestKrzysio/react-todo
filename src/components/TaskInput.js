import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase";
import {useState} from "react";

function TaskInput() {
    const [value, setValue] = useState("");

    function handleChange(event) {
        setValue(event.target.value)
    }

    async function handleKeyUp(event) {
        if (event.key === "Enter" && value !== "") {
            const newTask = {
                name: value, status: false
            }
            await addDoc(collection(db, "todos"), newTask);

            setValue("")
        }
    }

    return (<input type="text"
                   value={value}
                   onChange={handleChange}
                   onKeyUp={handleKeyUp}
                   className="input"
                   placeholder="What needs to be done?"
        />);
}

export default TaskInput;
