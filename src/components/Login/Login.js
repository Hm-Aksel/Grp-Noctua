import React, { useEffect, useState } from "react";
import backdrop from "../../assets/backdrop.png";
import { db } from "../../firebase/firebase";
import "./Login.css";

import Spinner from "../../Elements/Spinner/Spinner";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Login = () => {
  const [auth, setAuth] = useState(false);
  const initialSignup = {
    name: "",
    username: "",
    email: "",
    passsword: "",
    confirmPassword: "",
  };
  const initialLogin = {
    email: "",
    password: "",
  };

  const [signupState, setSignupState] = useState(initialSignup);
  const [loginState, setLoginState] = useState(initialLogin);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const [nameErr, setNameErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPasseErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");

  const cleanupState = () => {
    setIsSigning(false);
    setSignupState(initialSignup);
    setLoginState(initialLogin);
    setError("");
    setLoading(false);
  };
  const toggleAuth = () => {
    setAuth((auth) => !auth);
    cleanupState();
  };
  const onSubmitLogin = (e) => {
    const { name, password } = loginState;
    e.preventDefault();
    setLoading(true);
  };

  /**
   *
   */

  const [users, setUsers] = useState([]);
  const userCollecionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollecionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();

    users.map((user) => {
      if (user.username === signupState.username) {
        alert("username existe déja");
        // setSignupState({ ...signupState, username: "" });
      }
      if (user.email === signupState.email) {
        alert("email existe déja");
        // setSignupState({ ...signupState, email: "" });
      }
    });
  }, [signupState.username, signupState.email]);

  function validateName(name) {
    if (name.length > 3 && name.length < 20) {
      var nameRegex = /^[ a-zA-Z]+$/;
      return nameRegex.test(name);
    } else {
      return false;
    }
  }

  function validateUserName(username) {
    if (username.length > 3 && username.length < 8) {
      var usernameRegex = /^[a-zA-Z0-9]+$/;
      return usernameRegex.test(username);
    } else {
      return false;
    }
  }

  function validateEmail(Email) {
    var EmailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return EmailRegex.test(Email);
  }

  function validatePassword(password) {
    if (password && password.length > 8) {
      return true;
    } else {
      return false;
    }
  }

  function validateConfirmPassword(confirmPassword) {
    if (signupState.password === confirmPassword) {
      return true;
    }
  }

  //   inscription
  const preSignup = (e) => {
    e.preventDefault();
    setIsSigning(true);
    if (!validateName(signupState.name)) {
      setNameErr("le nom complet doit contenir entre 3 et 20 lettres");
      setError(true);
    } else {
      setNameErr("");
      setError(false);
    }
    if (!validateUserName(signupState.username)) {
      setUsernameErr(
        "le nom d'utilisateur doit contenir entre 3 et 8 caractéres"
      );
      setError(true);
    } else {
      setUsernameErr("");
      setError(false);
    }
    if (!validateEmail(signupState.email)) {
      setEmailErr("Veuillez entrer une email valide");
      setError(true);
    } else {
      setEmailErr("");
      setError(false);
    }
    if (!validatePassword(signupState.password)) {
      setPasseErr("le mot de passe doit étre supérieure a 8 caractéres");
      setError(true);
    } else {
      setPasseErr("");
      setError(false);
    }
    if (!validateConfirmPassword(signupState.confirmPassword)) {
      setConfirmErr("les deux mot de passes doivent correspondre");
      setError(true);
    } else {
      setConfirmErr("");
      setError(false);
    }

    if (error === false) {
      if (users.username === signupState.username) {
        alert("username exist déja");
      } else if (users.email === signupState.email) {
        alert("email exist déja");
      } else {
        const createUser = async () => {
          await addDoc(userCollecionRef, {
            name: signupState.name,
            username: signupState.username,
            email: signupState.email,
            password: signupState.password,
          });
        };
        createUser();
        setSignupState({
          name: "",
          username: "",
          email: "",
          passsword: "",
          confirmPassword: "",
        });
      }
    }
  };

  return (
    <section className="login__section">
      <div className={`login__container ${auth ? "active" : ""}`}>
        <div className="user signinBc">
          <div className="imgBc">
            <img src={backdrop} alt="backdrop" />
          </div>
          <div className="formBc">
            <form autoComplete="off" onSubmit={onSubmitLogin}>
              <h2>Log In</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginState.email}
                onChange={(e) =>
                  setLoginState({ ...loginState, email: e.target.value })
                }
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginState.password}
                onChange={(e) =>
                  setLoginState({ ...loginState, password: e.target.value })
                }
                // required
              />
              <button type="submit" className="button">
                {loading ? <Spinner /> : "Log in"}
              </button>
              {error.length > 0 && <div className="error">{error}</div>}
              <p className="signup">
                Don't have an account? <span onClick={toggleAuth}>Sign up</span>
              </p>
            </form>
          </div>
        </div>
        <div className="user signupBc">
          <div className="formBc">
            <form autoComplete="off" onSubmit={preSignup}>
              <h2>Create an Account</h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={signupState.name}
                onChange={(e) =>
                  setSignupState({ ...signupState, name: e.target.value })
                }
                // required
              />
              {
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    marginBottom: 10,
                    marginLeft: 10,
                  }}
                >
                  {nameErr}
                </p>
              }
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signupState.username}
                onChange={(e) =>
                  setSignupState({ ...signupState, username: e.target.value })
                }
                // required
              />
              {
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    marginBottom: 10,
                    marginLeft: 10,
                  }}
                >
                  {usernameErr}
                </p>
              }

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupState.email}
                onChange={(e) =>
                  setSignupState({ ...signupState, email: e.target.value })
                }
                // required
              />
              {
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    marginBottom: 10,
                    marginLeft: 10,
                  }}
                >
                  {emailErr}
                </p>
              }
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={signupState.password}
                onChange={(e) =>
                  setSignupState({ ...signupState, password: e.target.value })
                }
                // required
              />
              {
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    marginBottom: 10,
                    marginLeft: 10,
                  }}
                >
                  {passErr}
                </p>
              }
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signupState.confirmPassword}
                onChange={(e) =>
                  setSignupState({
                    ...signupState,
                    confirmPassword: e.target.value,
                  })
                }
                // required
              />
              {
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    marginBottom: 10,
                    marginLeft: 10,
                  }}
                >
                  {confirmErr}
                </p>
              }
              {error.length > 0 && <div className="error">{error}</div>}
              <button type="submit" className="button">
                {loading ? <Spinner /> : "Sign up"}
              </button>
              <p className="signup">
                have an account? <span onClick={toggleAuth}>Log in</span>
              </p>
            </form>
          </div>
          <div className="imgBc">
            <img src={backdrop} alt="backdrop" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
