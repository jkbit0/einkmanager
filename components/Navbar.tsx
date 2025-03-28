"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/modetoggle";
import { MdEdit } from "react-icons/md";
import { FaPlay, FaStop } from "react-icons/fa";

export default function Navbar() {
  const [autoswitcher, setautoswitcher] = useState("false");

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://" + process.env.BACKEND_SERVER + "/sendinterval/status")
        .then((response) => response.text())
        .then((data) => setautoswitcher(data));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function geticon() {
    if (autoswitcher == "true") {
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="rgb(5, 223, 114)" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="rgb(255, 100, 103)" />
        </svg>
      );
    }
  }
  function handleedit() {
    if (window.location.pathname == "/queue") {
      window.location.href = "/queue/edit";
    } else {
      window.location.href = "/queue";
    }
  }

  function setintervalsending(sending: string) {
    fetch("http://" + process.env.BACKEND_SERVER + "/sendinterval/" + sending)
      .then((response) => response.text())
      .then((data) => console.log(data));
  }

  return (
    <div className="flex bg-neutral-900 text-white p-5 items-center ">
      <div className="flex w-full h-full">
        <h1 className="text-4xl ">E-Ink Manager</h1>
      </div>
      <div className="flex justify-end w-full h-full gap-4">
        <div className="flex items-center justify-center">
          <h1 className="text-xl">Intervall Sending to Matrix</h1>
          <div className="mt-0 w-10 h-10">{geticon()}</div>
        </div>
        <Button
          className="text bg-green-400"
          onClick={() => setintervalsending("start")}
        >
          <FaPlay />
        </Button>
        <Button
          className="text bg-red-400"
          onClick={() => setintervalsending("stop")}
        >
          <FaStop />
        </Button>
        <Button className="text-xl" onClick={handleedit}>
          <MdEdit />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
