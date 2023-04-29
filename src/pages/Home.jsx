import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import Task from "./Task";
import { Navigate } from "react-router-dom";

const Home = () => {
const [loading,setloading]=useState(false)
  const[title,settitle]=useState("");
  const [description,setdescription]=useState("");
const [refresh,setrefresh]=useState(false)
  const [tasks,settasks]=useState([])
  const { isAuthenticated} = useContext(Context);
const updatehandler=async(id)=>{
try {
  const {data}=await axios.put(`${server}/task/${id}`,{},{
    withCredentials:true,
  })
  toast.success(data.message)
  setrefresh((prev)=>!prev)

} catch (error) {
  toast.error(error.response.data.message)
}
}

const deletehandler=async (id)=>{
  try {
    const {data}=await axios.delete(`${server}/task/${id}`,{
      withCredentials:true,
    })
    toast.success(data.message)
    setrefresh((prev)=>!prev)
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

const submithandler=async (e)=>{
  e.preventDefault();
try {
  setloading(true)
  const {data}=await axios.post(`${server}/task/new`,{
    title,description
  },{
    withCredentials:true,
    headers:{
      "Content-Type":"application/json",
    },
  });
  settitle("");
  setdescription("");
  toast.success(data.message);
  setloading(false)
  setrefresh((prev)=>!prev)
} catch (error) {
  toast.error(error.response.data.message)
  setloading(false)
}
}
useEffect(()=>{
  axios.get(`${server}/task/my`,{
    withCredentials:true
  }).then((res)=>{
settasks(res.data.tasks)
  }).catch(e=>{
    toast.error(e.response.data.message)
  })
},[refresh])
if(!isAuthenticated) return <Navigate to={"/login"} />

  return <div className="container">
     <div className='login'>
        <section>
            <form onSubmit={submithandler} >
          <input
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="Title"
            required
          />
            <input
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            type="text"
            placeholder="Description"
            required
          />
                <button disabled={loading} type="submit" placeholder="Submit">ADD TASK</button>
            </form>
        </section>
    </div>
    <section className="todosContainer">

{
  tasks.map((i)=>(
    <Task title={i.title} description={i.description} iscompleted={i.iscompleted} updatehandler={updatehandler} deletehandler={deletehandler} id={i. _id} key={i. _id}/>
  ))
}

    </section>
  </div>

};

export default Home;
 