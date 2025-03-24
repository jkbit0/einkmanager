"use client";

import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/modetoggle";
import { MdEdit } from "react-icons/md";

export default function Navbar() {
  function handleedit() {
    if (window.location.pathname == "/queue") {
      window.location.href = "/queue/edit";
    } else {
      window.location.href = "/queue";
    }
  }

  return (
    <div className="flex bg-neutral-900 text-white p-5 items-center ">
      <div className="flex w-full h-full">
        <h1 className="text-4xl ">E-Ink Manager</h1>
      </div>
      <div className="flex justify-end w-full h-full gap-4">
        <Button className="text-xl" onClick={handleedit}>
          <MdEdit />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
