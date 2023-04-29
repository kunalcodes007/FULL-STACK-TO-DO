import React from "react";

const Task = ({ title, description,iscompleted ,updatehandler,deletehandler,id}) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input onChange={()=>updatehandler(id)} type="checkbox" name="" checked={iscompleted}  />
        <button onClick={()=>deletehandler(id)} className="btn"> Delete</button>
      </div>
    </div>
  );
};

export default Task;
