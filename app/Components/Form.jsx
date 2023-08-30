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
const Form = () => {
  const [data, setData] = useState({
    date: "",
    hour: "",
    note: "",
  });

  const HandleSubmit = async () => {
    if (data.date !== "" && data.hour !== "" && data.note !== "") {
      const { data: ts, error } = await supabase
        .from("TimeLine")
        .insert([data])
        .select();
      console.log(ts, error);
      window.location.reload();
    } else {
      window.alert("Please enter all the required fields");
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
            +
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
