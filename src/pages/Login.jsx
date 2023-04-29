import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import axios from 'axios';
const  Login=()=> {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { isAuthenticated, setisAuthenticated ,loading,setloading} = useContext(Context);

  if(isAuthenticated) return <Navigate to={"/"} />
  const submithandler = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { 
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
    setloading(false);

    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(false);
    }
  };

  return (
    <div className='login'>
        <section>
            <form onSubmit={submithandler} >
          <input
            value={email}
            onChange={ (e) => setemail(e.target.value)}
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
                <button disabled={loading} type="submit" placeholder="Submit">Login</button>
                <h4>Or</h4>
                <Link to="/register">Sign Up</Link>
            </form>
        </section>
    </div>
  );
}
export default Login;