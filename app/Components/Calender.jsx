"use client";
import React, { useState, useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import supabase from "../supabase";
import Cookies from "js-cookie";
import Logs from "./Logs";
import { useAuthContext } from "../Context/index";

const Calender = () => {
  const [Data, setData] = useState([]);
  const { user } = useAuthContext();
  const FetchData = async () => {
    let { data: userDatas, Usererror } = await supabase
      .from("TimeLine")
      .select("*")
      .eq("userId", user.id);
    setData(userDatas);
  };
  const MakeValue = Data.map((res) => {
    const obj = {
      date: res.date,
      count: Number(res.hour),
    };
    return obj;
  });

  // Return the array containing all the objects

  useEffect(() => {
    FetchData();
  }, []);
  return (
    <>
      <div className="border shadow-xl max-h-56  flex w-full justify-center items-center">
        <div className=" w-[100vw] md:w-1/2 ">
          <CalendarHeatmap
            // data-for={`tooltip-${value.date}`}
            startDate={new Date("2023-01-01")}
            endDate={new Date("2023-12-01")}
            values={MakeValue}
            tooltipDataAttrs={(value) => {
              return {
                "data-tip": true,
                "data-for": `tooltip-${value.date}`, // Unique identifier for each tooltip
              };
            }}
            showWeekdayLabels={true}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              } else if (value.count <= 5) {
                return "color-scale-1";
              } else if (value.count <= 15) {
                return "color-scale-3";
              } else if (value.count <= 20) {
                return "color-scale-4";
              } else if (value.count <= 24) {
                return "color-scale-5";
              }
            }}
            onClick={(value) =>
              alert(
                `Clicked on value with count: ${
                  value?.count ? value.count : "0"
                } hrs`
              )
            }
          />
          <ReactTooltip />
        </div>
      </div>
      <Logs Data={Data} />
    </>
  );
};
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}
function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default Calender;
