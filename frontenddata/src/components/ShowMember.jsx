import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import "./showmember.css"

import {
    getTodoError,
    getTodoLoading,
    getTodoSuccess,
    removeTodo,
} from "../Redux/Action";


export const ShowMember = () => {
  const [page, setPage] = useState(1);
  const [form, setForm] = useState("");


    const {  todos} = useSelector((state) => ({
      todos: state.todos,
    }));
    
  const handleChange = async(e) => {
        let { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
      console.log(form);
  }


  
  const dispatch = useDispatch();

    useEffect (() => {
        showMember()
    },[page,form])


  const showMember = async () => {
    if (form.Type) {
      try {
        dispatch(getTodoLoading());
        const data = await fetch(`https://delta-xchange.herokuapp.com/user/${form.Type}?page=${page}&size=5`)
          .then((d) => d.json());
        dispatch(getTodoSuccess(data.user));
        console.log(data.user);
      } catch (err) {
        dispatch(getTodoError(err));
      }
    } else {
      try {
        dispatch(getTodoLoading());
        const data = await fetch(`https://delta-xchange.herokuapp.com/user?page=${page}&size=5`)
          .then((d) => d.json());
        dispatch(getTodoSuccess(data.user));
        console.log(data.user);
      } catch (err) {
        dispatch(getTodoError(err));
      }
    }
  }
    
  const handleDelete = async (_id) => {
    let res= await fetch(`https://delta-xchange.herokuapp.com/user/${_id}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
    });
    console.log(res);
    showMember();
    dispatch(removeTodo(_id))
  };

    return (
      <div style={{ marginTop: "8%" }}>
        <div className="headDiv"><p style={{ marginLeft: "10%" }}>Team Members</p>
          <Link className="btn"  to="/members"><button>Add Members +</button></Link>
        </div>
        <div className="headDiv">
          <select className="firstSel" name="Type"  onChange={handleChange}>
                <option>Select</option>
                <option>high-scorer</option>
                <option>developer</option>
                <option>data-scientist</option>
                <option>designer</option>
                <option>project-manager</option>
                <option>HR</option>
          </select>
          <select className="secondSel">
               <option>Select Status</option>
                <option>Active</option>
                <option>Closed</option>
          </select>
        </div>
      <table className="table">
        <tr className="tablehead">
          <th>Name</th>
          <th>Company</th>
        <th>Status</th>
            <th>Notes</th>
            <th>Manage members</th>
        </tr>
        {todos.map((e) => (
          <tr className="tablerows" key={e._id}>
            
            <td>{e.name}</td>
                <td className="oddcol">{e.company}</td>
                <td>{e.status}</td>
            <td className="oddcol">{e.notes}</td>
            <td><img onClick={() =>handleDelete(e._id)} src="https://img.icons8.com/ios-glyphs/25/000000/filled-trash.png" alt=""/></td>
          </tr>
        ))}
      </table>
      <div className="buttonof">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <h2 style={{marginTop:"-3px"}}>{page}</h2>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
    )
}