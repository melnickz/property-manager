import React from "react";
import { Items } from "../../Components/Items/Items";
import { CustomNav } from "../../Components/Navbar/Navbar";
import { PropertyOverview } from "../../Components/Overview/PropertyOverview";
import "./Dashboard.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { CustomFooter } from "../../Components/Footer/Footer";
import { orderBy } from "firebase/firestore";
import { UsersOverview } from "../../Components/Overview/UsersOverview";
import { Users } from "../../Components/Users/Users";
import admin from "../../Assets/admin.svg";
import property from "../../Assets/property.svg";
import users from "../../Assets/users.svg";
import shared from "../../Assets/shared.svg";
import account from "../../Assets/account.svg";
import { useNavigate } from "react-router-dom";
export const Menu = () => {
  const { adminAccount, setSelectedItem, setEmail, setUserData, setUsersData, setItemsCount, setItemsValue, setUsersCount, logOut, setAdminMode, setAdminAccount } = useUserAuth();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logOut();
      setAdminMode(false);
      setAdminAccount(false);
      setItemsCount(0);
      setItemsValue(0);
      setUserData([]);
      setEmail("");
      setUsersData([]);
      setUsersCount(0);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
    
        <div className="row justify-content-center align-items-center">
          <div className="col mb-3">
            <button
              onClick={() => {
                setSelectedItem("property");
              }}
              className="dashboard-button login-btn btn"
            >
              <img src={property}></img>
              <h3>Property</h3>
            </button>
          </div>
          <div className="col mb-3">
            <button onClick={() => {
                setSelectedItem("users");
              }} className="dashboard-button login-btn btn">
              <img src={users}></img>
              <h3>Users</h3>
            </button>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
        {!adminAccount && 
          <div className="col  mb-3">
            <button onClick={()=>{setSelectedItem("shared")}} className="dashboard-button login-btn btn">
              <img src={shared}></img>
              <h3>Shared</h3>
            </button>
       
          </div>
           }
            {adminAccount && (
        
        <div className="col-6 mb-3">
          <button className="dashboard-button login-btn btn" onClick={() => {
            setSelectedItem("admin");
          }}>
            <img src={admin}></img>
            <h3>Admin</h3>
          </button>
        </div>
   
    )}
          <div className="col  mb-3">
            <button className="dashboard-button login-btn btn" onClick={()=>{handleLogout()}}>
              <img src={account}></img>
              <h3>Logout</h3>
            </button>
          </div>
        </div>
    
    </>
  );
};