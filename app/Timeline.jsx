import React from "react";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Calender from "./Components/Calender";
import Logs from "./Components/Logs";

const Timeline = () => {
  return (
    <div>
      {" "}
      <Header />
      <div className="flex flex-col   p-10 h-screen">
        <div className="flex justify-center pt-10 pb-10">
          <Form />
        </div>
        <Calender />
      </div>
    </div>
  );
};

export default Timeline;
