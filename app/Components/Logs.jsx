"use client";
import React, { useState, useEffect } from "react";
import supabase from "../supabase";
const Logs = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      let { data: TimeLine, error } = await supabase
        .from("TimeLine")
        .select("*");
      setData(TimeLine);
    };
    FetchData();
  }, []);

  const handleDelete = async (a) => {
    const { error } = await supabase.from("TimeLine").delete().eq("id", a);
    console.log(error);
    if (!error) window.location.reload();
    else alert(error.message);
  };

  return (
    <div className="mt-10 flex justify-center items-center">
      <table className="w-[50vw]">
        <tr className="border-b-2 border-black text-left ">
          <th></th>
          <th>Date</th>
          <th>Hours</th>
          <th>Note</th>
          <th>Delete</th>
        </tr>
        {Data ? (
          <>
            {Data.map((res, index) => (
              <tr
                key={index}
                className="h-10 border-b-2"
              >
                <td>{index}.</td>
                <td>{res.date}</td>
                <td>{res.hour}</td>
                <td>{res.note}</td>
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
