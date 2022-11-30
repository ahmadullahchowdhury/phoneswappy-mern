import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from './Components/Layout/Main';
import Error from './Components/Error/Error';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Addproduct from './Components/Addproduct/Addproduct';
import Myproducts from './Components/Myproducts/Myproducts';
import Mybuyers from './Components/Mybuyers/Mybuyers';
import Allseller from './Components/Allseller/Allseller';
import Allbuyer from './Components/Allbuyer/Allbuyer';
import Reporteditems from './Components/Reporteditems/Reporteditems';
import Blogs from './Components/Blog/Blogs';
import Categorydetails from './Components/Categorydetails/Categorydetails';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
// import Blog from './Components/Blog/Blog';
// import Home from './Components/Home/Home';
// import AddService from './Components/AddService/AddService';
// import MyReviews from './Components/MyReviews/MyReviews';
// import Services from './Components/Services/Services';
// import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
// import ServiceDetails from './Components/ServiceDetails.js/ServiceDetails';
// import UpdateReview from './Components/UpdateReview/UpdateReview';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [

        {
          path: "/login",
          element: <Login></Login>,
          errorElement: <Error></Error>
        },
        {
          path: "/register",
          element: <Register></Register>,
          errorElement: <Error></Error>
        },
        {
          path: "/",
          loader :() => fetch(`http://localhost:5000/cat`),
          element: <Home></Home>,
          errorElement: <Error></Error>
        },
        {
          path: "/blog",
          element: <Blogs></Blogs>,
          errorElement: <Error></Error>
        },
        {
          path: "/category/:id",
          element:   <PrivateRoute><Categorydetails></Categorydetails></PrivateRoute>  ,
          loader :({params}) => fetch(`http://localhost:5000/category/${params.id}`),
          errorElement: <Error></Error>
        },
        {
          path: "/dashboard",
          element: <Dashboard></Dashboard>,
          errorElement: <Error></Error>,
          children: [

            {
              path: "/dashboard/addproduct",
              element: <Addproduct></Addproduct>,
              errorElement: <Error></Error>
            },
            {
              path: "/dashboard/myproducts",
              element: <Myproducts></Myproducts>,
              errorElement: <Error></Error>
            },
            {
              path: "/dashboard/mybuyers",
              element: <Mybuyers></Mybuyers>,
              errorElement: <Error></Error>
            },
            {
              path: "/dashboard/allseller",
              element:<Allseller></Allseller> ,
              errorElement: <Error></Error>
            },
            {
              path: "/dashboard/allbuyer",
              element: <Allbuyer></Allbuyer> ,
              errorElement: <Error></Error>
            },
            {
              path: "/dashboard/reporteditems",
              element: <Reporteditems></Reporteditems> ,
              errorElement: <Error></Error>
            },
          ]
        },


        // {
        //   path: "blog",
        //   element: <Blog></Blog>,
        //   errorElement: <Error></Error>
        // },
        // {
        //   path: "/",
        //   loader :() => fetch(`https://b6a11-service-review-server-side-kowcher99.vercel.app/service`),
        //   element: <Home></Home>,
        //   errorElement: <Error></Error>
        // },
        // {
        //   path: "home",
        //   loader :() => fetch(`https://b6a11-service-review-server-side-kowcher99.vercel.app/service`),
        //   element: <Home></Home>,
        //   errorElement: <Error></Error>
        // },
        // {
        //   path: "addservice",
        //   element: <PrivateRoute><AddService></AddService></PrivateRoute> ,
        //   errorElement: <Error></Error>
        // },
        // {
        //   path: "myreview",
        //   element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>,
        //   errorElement: <Error></Error>
        // },
        // {
        //   path: "services",
        //   loader :() => fetch(`https://b6a11-service-review-server-side-kowcher99.vercel.app/services`),
        //   element: <Services></Services>,
        //   errorElement: <Error></Error>
        // },
        // {
        //   path: "services/:id",
        //   loader :({params}) => fetch(`https://b6a11-service-review-server-side-kowcher99.vercel.app/services/${params.id}`),
        //   element: <ServiceDetails></ServiceDetails>,
        //   errorElement: <Error></Error>
        // },
        // {
        //   path: "update-review/:id",
        //   loader :({params}) => fetch(`https://b6a11-service-review-server-side-kowcher99.vercel.app/reviews/${params.id}`),
        //   element: <UpdateReview></UpdateReview>,
        //   errorElement: <Error></Error>
        // },
        { path: '*', element: <Error></Error>},
      ],
    },
  ]);
  return (
    <div className='text-center'>

      <RouterProvider  router={router}></RouterProvider>
    </div>
  );
}

export default App;
