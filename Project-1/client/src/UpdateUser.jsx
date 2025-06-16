import React from "react";
import axios from 'axios';
import { useEffect ,useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
function UpdateUser(){
    const {id} = useParams();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(0)
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:3001/getUser/"+id)
        .then(result =>{ 
            console.log(result)
            setName(result.data.name)
            setAge(result.data.age)
            setEmail(result.data.email)
    })
        .catch(err => console.log(err))
    },[]

    )
    const update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/updateUser/"+id, {name,email,age})
        .then(result =>{
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={update}>
                    <h2>Update User</h2>
                    <div className = 'mb-2'>
                        <label for = "">Name</label>
                        <input type = "text" placeholder ="Enter Name" className = "form-control" value = {name}
                        onChange={(e) =>setName(e.target.value)}/>
                    </div>

                    <div className = 'mb-2'>
                        <label for = "">Email</label>
                        <input type = "email" placeholder ="Enter Email" className = "form-control" value = {email}
                        onChange={(e) =>setEmail(e.target.value)}/>
                    </div>

                    <div className = 'mb-2'>
                        <label for = "">Age</label>
                        <input type = "text" placeholder ="Enter Age" className = "form-control" value = {age}
                        onChange={(e) =>setAge(e.target.value)}/>
                    </div>


                    <button className="btn btn-success" type="submit" >Update</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateUser;