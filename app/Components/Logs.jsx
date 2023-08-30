"use client";
import React, { useState, useEffect } from "react";
import supabase from "../supabase";
import Cookies from "js-cookie";
const Logs = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const userCookie = Cookies.get("user");

    let userData = null;
    if (userCookie) {
      try {
        userData = JSON.parse(userCookie);
      } catch (error) {
        // Handle JSON parsing error if needed
        console.error("Error parsing user cookie:", error);
      }
    }

    // Now userData might contain the user data retrieved from the cookie

    let userID = null;
    if (userData && userData.id) {
      userID = userData.id;
    }

    const FetchData = async () => {
      console.log(userID);

      let { data: userData, error } = await supabase
        .from("TimeLine")
        .select("*")
        .eq("userId", userID);
      console.log(error, userData);

      setData(userData);
    };

    FetchData();
  }, []);

  const handleDelete = async (a) => {
    const { error } = await supabase.from("TimeLine").delete().eq("id", a);
    console.log(error);
    if (!error) window.location.reload();
    else alert(error.message);
  };

  const checkDone = async (id) => {
    const { data, error } = await supabase
      .from("TimeLine")
      .update({ Isdone: true })
      .eq("id", id)
      .select();
    console.log(data, error);
  };

  return (
    <div className="mt-10 flex justify-center items-center">
      <table className="w-[50vw]">
        <tr className="border-b-2 border-black text-left ">
          <th></th>
          <th>Date</th>
          <th>Hours</th>
          <th>Note</th>
          <th>Done</th>
          <th>Delete</th>
        </tr>
        {Data.length > 0 ? (
          <>
            {Data.map((res, index) => (
              <tr
                key={index}
                className="h-10 border-b-2"
              >
                <td>{index}.</td>
                <td>{res.date}</td>
                <td>{res.hour}</td>
                <td className={res.Isdone ? "line-through" : ""}>{res.note}</td>

                <td>
                  <button
                    className={`bg-blue-500 p-2 rounded-lg text-white font-bold ${
                      res.Isdone ? "hidden" : ""
                    }`}
                    onClick={() => checkDone(res.id)}
                  >
                    Done
                  </button>
                </td>

                <td>
                  <button
                    className="bg-red-600 w-6 font-bold text-white rounded-full"
                    onClick={() => handleDelete(res.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <span className="text-center">No Data</span>
        )}{" "}
      </table>
    </div>
  );
};

export default Logs;
