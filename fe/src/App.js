import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom"

import { auth } from './firebase';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ActivityForm from "./pages/ActivityForm";
import ActivityList from "./pages/ActivityList";

function App() {
  const [user, setUser] = useState();
  const [userLoaded, setUserLoaded] = useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log('userFirebase', userFirebase)
          const uid = userFirebase.uid;
          // ...
          console.log("uid", uid)
          setUser(userFirebase)
          
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
        setUserLoaded(true);
      });
     
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home user={user} userLoaded={userLoaded} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/activity-form" element={<ActivityForm />} />
      <Route path="/activity-list" element={<ActivityList />} />
    </Routes>
  );
}

export default App;
