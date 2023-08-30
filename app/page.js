'use client'

import { useEffect, useState } from "react";
import Timeline from "./Timeline";
import Landing from "./Components/Landing";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    // Update the isLoggedIn state based on local storage
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return (
    <>
      {isLoggedIn ? <Timeline /> : <Landing />}
    </>
  );
}
