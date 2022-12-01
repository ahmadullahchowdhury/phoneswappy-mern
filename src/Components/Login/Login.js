import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../Firebase/Firebase.init";
import { fireAuthContext } from "../../Context/Context";


const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  let location = useLocation();
  const [dbEmail, setDbEmail ] = useState('')
  let from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { user, signUser, googleLoginPopUp } =  useContext(fireAuthContext)

  useEffect(() => {
    fetch(`https://phone-resale-server.vercel.app/user?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        setDbEmail(data.email)
        console.log(data.email)
      });
  }, [user?.email]);

  const loginBtn = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      console.log(email, password);
      signUser(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          navigate(from, {replace: true})
          // console.log(userDB)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage)
        });

    };

    const googleLoginHandler = () => {
      googleLoginPopUp().then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        // The signed-in user info.
        const user = result.user;

        

        const userDB = {
          name: user.displayName,
          email: user.email,
          userRole: 'Buyer'
        }

        if(dbEmail){
            return 0
        }else{

            fetch("https://phone-resale-server.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userDB),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
    
              })
              .catch((err) => console.error(err));
    
          navigate(from, {replace: true})
        }


        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)
        // The email of the user's account used.

        // ...
      });

    }

  return (
    <div>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content ">
          <div className="-mt-6">
            <h1 className="m-3 p-3 text-4xl font-bold">Welcome to!</h1>
            <h1 className="m-3 p-3 text-5xl font-bold">PhoneSwappy!</h1>
            <h1 className="m-3 p-3 text-3xl font-bold">Please Login now!</h1>
            <h1 className="m-3 p-3 text-3xl font-bold">To Buy and Sell Phone!</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

              <form onSubmit={loginBtn}  className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="input input-bordered"
                  />
                  <p className="text-orange-700 p-3"></p>
                  <label className="label">
                    <Link
                      to="/register"
                      className="label-text-alt link link-hover"
                    >
                      New to This Site? Goto Register.
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary m-2">Login</button>
                  <button onClick={googleLoginHandler} className="btn btn-info m-2">Google Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
