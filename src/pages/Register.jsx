import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { useContext } from "react";
export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { isAuthenticated, setisAuthenticated,loading,setloading } = useContext(Context);
  const submithandler = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(name, email, password);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setisAuthenticated(true);
      setloading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(false);
      console.log(error);
    }
  };

  if(isAuthenticated) return <Navigate to={"/"} />

  return (
    <div className="login">
      <section>
        <form onSubmit={submithandler}>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="name"
            required
          />
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit" placeholder="Submit">
            Signup
          </button>
          <h4>Or</h4>
          <Link to="/register">Login</Link>
        </form>
      </section>
    </div>
  );
}
