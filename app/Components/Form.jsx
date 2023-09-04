"use client";
import React, { useState } from "react";
import {
  AlertDialogAction,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import supabase from "../supabase";
import { useAuthContext } from "../Context";

const Form = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState({
    date: "",
    hour: "",
    note: "",
    Catg: [],
    userId: user.id,
  });

  const HandleSubmit = async () => {
    if (data.date !== "" && data.hour !== "" && data.note !== "") {
      const { data: ts, error } = await supabase
        .from("TimeLine")
        .insert([data])
        .select();
      // const TimeLine = supabase
      //   .channel("custom-all-channel")
      //   .on(
      //     "postgres_changes",
      //     { event: "*", schema: "public", table: "TimeLine" },
      //     (payload) => {
      //       console.log("Change received!", payload);
      //     }
      //   )
      //   .subscribe();
      console.log(ts, error);
    } else {
      window.alert("Please enter all the required fields");
    }
  };

  const handleCatg = (category) => {
    if (!data.Catg.includes(category)) {
      // Check if the category doesn't already exist
      const newCatgArray = [...data.Catg, category];
      setData({ ...data, Catg: newCatgArray });
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="w-52"
          >
            Add +
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className=" flex  flex-col gap-5">
            <div className="font-bold flex justify-between">
              Create a New Note
              <AlertDialogAction>X</AlertDialogAction>
            </div>
            <lable className="block font-bold ">
              Date :
              <input
                type="date"
                name="date"
                className="font-normal p-2 border w-96 m-2 rounded-lg"
                onChange={(e) => setData({ ...data, date: e.target.value })}
              />
            </lable>
            <lable className="block font-bold ">
              Hour :
              <input
                type="number"
                name="hour"
                className="font-normal p-2 border w-96 m-2 rounded-lg"
                value={data.hour}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value); // Convert input to integer
                  if (!isNaN(inputValue) && inputValue <= 24) {
                    setData({ ...data, hour: inputValue });
                  }
                }}
              />
            </lable>
            <lable className="block font-bold ">
              Note :
              <input
                type="text"
                name="note"
                className="font-normal p-2 border w-96 m-2 rounded-lg"
                onChange={(e) => setData({ ...data, note: e.target.value })}
              />
            </lable>
            <label className="block font-bold">
              Catg :
              <textarea
                type="text"
                name="note"
                className="font-normal p-2 border w-96 m-2 rounded-lg"
                value={data.Catg} // Display selected categories in the input field
                onChange={(e) =>
                  setData({ ...data, Catg: e.target.value.split(", ") })
                } // Split input value into an array
              />
              <div className="flex flex-wrap gap-5 p-2 capitalize">
                <button
                  className="bg-yellow-300 p-2 rounded"
                  onClick={() => handleCatg("Shopping")}
                >
                  🛒 Shopping
                </button>
                <button
                  className="bg-blue-300 p-2 rounded"
                  onClick={() => handleCatg("Education")}
                >
                  🏫 Education
                </button>
                <button
                  className="bg-pink-300 p-2 rounded"
                  onClick={() => handleCatg("Personal")}
                >
                  💻 Personal
                </button>
                <button
                  className="bg-purple-300 p-2 rounded"
                  onClick={() => handleCatg("Food")}
                >
                  🥘 Food
                </button>
                <button
                  className="bg-orange-300 p-2 rounded"
                  onClick={() => handleCatg("Travel")}
                >
                  🗺️ Travel
                </button>
                <button
                  className="bg-green-300 p-2 rounded"
                  onClick={() => handleCatg("Fees")}
                >
                  💸 Fees
                </button>
                <button
                  className="bg-red-300 p-2 rounded"
                  onClick={() => handleCatg("Business")}
                >
                  👔 Business
                </button>
              </div>
            </label>
            <AlertDialogAction>
              <Button
                onClick={HandleSubmit}
                className="w-full"
              >
                Save
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Form;
