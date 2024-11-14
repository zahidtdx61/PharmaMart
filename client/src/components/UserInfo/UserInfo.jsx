import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Avatar, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";

const UserInfo = () => {
  const { user, logOut, setIsLoading } = useAuth();
  const { photoURL, displayName } = user || {};
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      // await axiosSecure.get("/user/logout");
      await logOut();
      console.log("Sign out successful");
      navigate("/");
      toast.success("Sign out successful");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        

        <Dropdown>
          <MenuButton className=""><Avatar src={photoURL} /></MenuButton>
          <Menu>
            <MenuItem>{displayName}</MenuItem>
            <MenuItem><Link to="/dashboard">Dashboard</Link></MenuItem>
            <MenuItem onClick={handleSignOut}>Log out</MenuItem>
          </Menu>
        </Dropdown>

        
      </div>
    </>
  );
};

export default UserInfo;
