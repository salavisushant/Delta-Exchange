import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoError, addTodoLoading, addTodoSucces } from "../Redux/Action";
import "./member.css"

export const AddMember = () => {
    const [text, setText] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setText({ ...text, [name]: value })
    }

    const handleData = (e) => {
        e.preventDefault()
        dispatch(addTodoLoading);
        fetch("https://delta-xchange.herokuapp.com/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(text)
        })
        .then((d) => d.json())
        .then((res) => {
            dispatch(addTodoSucces)
            console.log(res);
            alert("Member added succesfully")
        })
        .catch((err) => {
            dispatch(addTodoError)
        })
    }

    return (
        <div className="memberbox">
            <h1>Add Members</h1>
            <label><p>Name</p></label>
            <input type="text" name="name" onChange={(e) => handleChange(e)} placeholder="Your Name" />
             <label><p>Company</p></label>
                <select className="selectbtn" name="company" onChange={(e) => handleChange(e)}>
                <option>Select Company</option>
                <option>ABC Infotek</option>
                <option>XYZ corp</option>
                <option>DBC data</option>
                <option>Jorden data</option>
                <option>Alfa Laval</option>
            </select>
            <label><p>Notes</p></label>
            <select className="selectbtn" name="notes" onChange={(e) => handleChange(e)}>
                <option>Select</option>
                <option>high-scorer</option>
                <option>developer</option>
                <option>data-scientist</option>
                <option>designer</option>
                <option>project-manager</option>
                <option>HR</option>
            </select>
             <label><p>Status</p></label>
            <select className="selectbtn" name="status" onChange={(e) => handleChange(e)}>
                <option>Select Status</option>
                <option>Active</option>
                 <option>Closed</option>
            </select>
          
            <br/>
            <button onClick={handleData}>Add Member</button>
        </div>
    )
}
