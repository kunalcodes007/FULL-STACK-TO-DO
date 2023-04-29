import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
const Header = () => {
  const {isAuthenticated, setisAuthenticated,loading,setloading} = useContext(Context);
  const logouthandler = async (e) => {
    setloading(true);
    try {
     await axios.get(
        `${server}/users/logout`,
        {
          withCredentials: true,
        } 
      );
      toast.success("logged out successfully !");
      setisAuthenticated(false);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(true);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>TO DO APP</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logouthandler} className="btn">Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
