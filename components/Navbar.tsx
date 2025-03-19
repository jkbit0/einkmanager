"use client";

import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/modetoggle";

export default function Navbar() {
  return (
    <div className="flex bg-neutral-900 text-white p-5 items-center ">
      <div className="flex w-full h-full">
        <h1 className="text-4xl ">E-Ink Manager</h1>
      </div>
      <div className="flex justify-end w-full h-full gap-4">
        <Button
          className="text-xl"
          onClick={() => (window.location.href = "/queue")}
        >
          Home
        </Button>
        <Button
          className="text-xl"
          onClick={() => (window.location.href = "/queue/edit")}
        >
          Warteschlange Bearbeiten
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
