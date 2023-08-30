import React, { useState } from "react";
import Image from "next/image";
import img1 from "../../public/1.svg";
import { CalendarClock } from "lucide-react";
import supabase from "../supabase";
const Landing = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const Submit = async () => {
    let { data: success, error } = await supabase.auth.signInWithPassword({
      email: data.username,
      password: data.password,
    });
    console.log(success, error);

    if (success) {
      localStorage.setItem("isLoggedIn", true);
      window.location.reload(); // Reload the page
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  };

  return (
    <>
      <div className="text-5xl h-20  flex  justify-center items-center text-center font-bold shadow-2xl">
        TimeLine
        <CalendarClock size={58} />
      </div>

      <div className="p-10 flex justify-center items-center flex-col md:flex-row">
        <div className="md:border-r-2    border-black flex justify-center items-center  p-10 m-10">
          <Image
            src={img1}
            width={700}
            className="w-full "
          />
        </div>
        <div className="p-2  flex justify-center items-center ">
          <div className="hover:border-4  border-black shadow-xl flex flex-col gap-5 w-[85vw] md:w-[50vw] h-[50vh] rounded-md  justify-center items-center ">
            <span className="text-4xl font-bold">Login Form</span>
            <input
              type="text"
              className="border p-2 border-black rounded-lg focus:outline-none h-10"
              placeholder="username"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 border-black rounded-lg focus:outline-none h-10"
              placeholder="Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button onClick={Submit}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
