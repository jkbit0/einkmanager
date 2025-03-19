import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Item(props: any) {
  function verifyimg(img: string) {
    if (img == "") {
      return "https://placehold.co/200x150";
    }
    return img;
  }

  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={verifyimg(props.previmg)}
          width={200}
          height={150}
          alt="Preview Image"
        />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
