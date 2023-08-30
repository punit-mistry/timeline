'use client'
import { useState } from "react"
import Timeline from "./Timeline"
import Landing from "./Components/Landing"
import Header from "./Components/Header"
export default function Home() {
  
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  


  
  return (
   <>
{ isLoggedIn ? <Timeline /> : <Landing />}
   </>
  )
}
