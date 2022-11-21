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
import { Menu } from "./Menu";
import { PropertyTable } from "../../Components/Tables/PropertyTable";
import { Message } from "../Message/Message";
import { AccessedProperty } from "../AccessedProperty/AccessedProperty";
import back from "../../Assets/backarrow.svg";
export const DashboardRedesign = () => {
  const {
    user,
    setUserData,
    userDataUpdated,
    setItemsCount,
    setItemsValue,
    adminMode,
    adminAccount,
    setUsersCount,
    setUsersData,
    selectedItem,
    setSelectedItem
  } = useUserAuth();
  useEffect(
    () => {
      const fetchUserData = async () => {
        try {
          const data = await getDocs(
            collection(db, "Users", `${user.uid}`, "Personal Items"),
            orderBy("Name", "asc")
          );
          var count = 0;
          var value = 0;
          const items = await Promise.all(
            data.docs.map(async (doc) => {
              count++;
              value += doc.data().Price;
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
          );
          await setItemsCount(count);
          await setItemsValue(value);
          await setUserData(items);
        } catch (error) {
          console.log(error.message);
        }
      };

      if (user) {
        fetchUserData();
      }
    },
    // eslint-disable-next-line
    [user, userDataUpdated]
  );

  useEffect(
    () => {
      const fetchUsers = async () => {
        if (adminAccount) {
          try {
            const data = await getDocs(collection(db, "Users"));
            var count = 0;
            const items = await Promise.all(
              data.docs.map(async (doc) => {
                count++;
                return {
                  ...doc.data(),
                  id: doc.id,
                  email: doc.data().Email,
                };
              })
            );
            await setUsersCount(count);
            await setUsersData(items);
          } catch (error) {
            console.log(error.message);
          }
        }
      };

      if (user) {
        fetchUsers();
      }
    },

    // eslint-disable-next-line
    [user, userDataUpdated]
  );

  return (
    <>
      <div className="dashboard-wrapper pt-5 pb-5">
        <div className="container">
        {selectedItem === "" && <Menu />}
        {selectedItem !== "" && <button
            style={{
              backgroundColor: "inherit",
              border: "none",
              outline: "none",
            }}
            onClick={() => {
             setSelectedItem("");
            }}
          >
            <img src={back} />
          </button>}
        {selectedItem === "property" && <><PropertyOverview/><Items/></> }
        {selectedItem === "users" && <><Message/></> }
        {selectedItem === "shared" && <><AccessedProperty/></> }
        {selectedItem === "admin" && <><UsersOverview />
             <AccessedProperty/></> }
        </div>
      </div>
    </>
  );
};
