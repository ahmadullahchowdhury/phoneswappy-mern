import React, { useContext, useState } from "react";
import {useNavigate , useLocation , Link} from 'react-router-dom'
import { getAuth  } from "firebase/auth";
import app from "../Firebase/Firebase.init";
import { fireAuthContext } from "../../Context/Context";
import useTitle from "../Hooks/hook";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);


const Register = () => {
  useTitle('Register')

    const [error, setError] = useState('')
  const  navigate = useNavigate()
  const { createUser, profileUpdate } = useContext(fireAuthContext);
 

  const registerBtn = (e) => {
    
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const userDB = {
      name,
      email
    }

    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        handleUserUpdate(name, photoURL );
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)
        // ..
      });

      const handleUserUpdate = (name, photoURL) => {
        const profile = {
          displayName: name,
          photoURL : photoURL
        };
    
        profileUpdate(profile)
          .then(() => {
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userDB),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                toast.success("User signed up Successfully", { autoClose: 1000 });
                getUserToken(email)
              })
              .catch((err) => console.error(err));


          })
          .catch(() => {});
      };
      const getUserToken = email =>{
        fetch(`http://localhost:5000/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
          if(data.accessToken){
            console.log(data.accessToken)
            localStorage.setItem('accessToken', data.accessToken)
            navigate("/login")
          }
        })
      }
    
  };
    return (
        <div className="">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content ">
            <div  className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
              <h1 className="m-3 p-3 text-5xl font-bold">Register now!</h1>
              <form onSubmit={registerBtn} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
              </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
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
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                  <p className="text-orange-700 p-3">{error}</p>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary" >Register</button>
              </div>
              <ToastContainer autoClose={1000}  />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;