import React, { ReactElement, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ItemProps {
  item: any;
  title: string;
  desc: string;
  previmg: ReactElement;
}

export default function ItemUneditable(props: ItemProps) {
  return (
    <div className="m-4">
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <div className="bg-neutral-800 rounded-2xl p-5 w-max h-max ">
              <h1 className="text-2xl m-2">Slide Preview</h1>
              <div className="bg-neutral-600 rounded-2xl p-5  min-w-86 min-h-64 w-max h-max">
                {props.previmg}
              </div>
            </div>
            <div className="flex ml-auto mr-0 items-center"></div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
