import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import supabase from "../supabase";
const Header = () => {
  const [User, setUser] = useState(false);

  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (user) {
      setUser(true);
      // Store user information in a cookie
      Cookies.set("user", JSON.stringify(user));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const LogOut = async () => {
    let { error } = await supabase.auth.signOut();
    localStorage.clear(); // This will remove all items from localStorage
    // Loop through all cookies and remove them
    const cookies = Object.keys(Cookies.get());
    cookies.forEach((cookie) => {
      Cookies.remove(cookie);
    });
    window.location.reload();
  };

  return (
    <div className="border-b-4 flex justify-between items-center p-3 h-16 font-bold">
      <div>TimeLine</div>
      {User && (
        <>
          <button
            className="bg-black w-18 h-10 text-white font-bold p-2 rounded-lg "
            onClick={LogOut}
          >
            LogOut
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
