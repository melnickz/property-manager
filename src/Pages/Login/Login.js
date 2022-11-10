import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useUserAuth } from "../../Context/UserAuthContext";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../Context/firebase";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, signUp, user, setAdminAccount } = useUserAuth();
  const [flag, setFlag] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      logIn(email, password).then(async (resp)=>{
       const userAccount = await getDoc(doc(db, "DeletedUsers", `${resp.user.uid}`));
    if (userAccount.exists()){
      await getDoc(doc(db, "DeletedUsers", `${resp.user.uid}`)).then((snapshot) => {
        alert(`Your account was deleted on ${snapshot.get("DeleteDate")}, please login with a different account`);
       });
    }  else {
      return navigate("/dashboard");
    }
    });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      signUp(email, password).then((resp)=>{setDoc(doc(db, "Users", `${resp.user.uid}`), {
        User: true,
      });})
      return navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(
    () => {
      const handleNavigate = async () => {

        if (user) {
          await getDoc(doc(db, "Admins", `${user.uid}`)).then((snapshot) => {
            console.log(snapshot.data());
            if (snapshot.get("Admin") === true) {
              setAdminAccount(true);
            }
          });
        } 
      };
      handleNavigate();
    }, // eslint-disable-next-line
    [user]
  );

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col d-flex text-center justify-content-center">
            <div className="login-box p-4 pt-5 pb-5 mt-3 mb-3 text-start">
              {flag && (
                <>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <label for="formBasicEmail">Email</label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <label for="formBasicPassword">Password</label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <button className="mb-4 btn login-btn" type="Submit">
                        Login
                      </button>
                    </div>
                  </Form>
                  <div className="d-flex">
                    <span>
                      Need an account?{" "}
                      <Link
                        className="login-link"
                        onClick={() => {
                          setFlag(!flag);
                        }}
                      >
                        Sign Up
                      </Link>
                    </span>
                  </div>
                </>
              )}
              {!flag && (
                <>
                  <Form onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <label for="formBasicEmail">Email</label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <label for="formBasicPassword">Password</label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <button className="mb-4 btn login-btn" type="Submit">
                        Sign Up
                      </button>
                    </div>
                  </Form>
                  <div className="d-flex">
                    <span>
                      Have an account?{" "}
                      <Link
                        className="login-link"
                        onClick={() => {
                          setFlag(!flag);
                        }}
                      >
                        Login
                      </Link>
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
