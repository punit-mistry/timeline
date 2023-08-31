'use client'

import { useEffect, useState } from "react";
import Timeline from "./Timeline";
import Landing from "./Components/Landing";
import { UserContext } from "./Context";
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(
   null
  );

  useEffect(() => {

    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return (
    <>
    <UserContext >
      <Timeline />
    </UserContext>
    </>
  );
}
