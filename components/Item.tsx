import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reorder, useDragControls, useMotionValue } from "motion/react";
import { ReorderIcon } from "./ReorderIcon";
import { useRaisedShadow } from "./use-raised-shadow";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
interface ItemProps {
  draggable: boolean;
  item: any;
  title: string;
  desc: string;
  previmg: string;
}

export default function Item(props: ItemProps) {
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  const boxShadow = useRaisedShadow(y);

  function verifyimg(img: string) {
    if (img == "") {
      return "https://placehold.co/200x150";
    }
    return img;
  }

  return (
    <div className="m-4">
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Slide</DialogTitle>
            <DialogDescription>
              Make changes to your Slide here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Unnamed Slide"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="html" className="text-right">
                Html
              </Label>
              <Input id="html" type="file" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
        <Reorder.Item
          value={props.item}
          id={props.item}
          style={{ boxShadow, y }}
          dragListener={false}
          dragControls={dragControls}
        >
          <Card>
            <CardHeader>
              <CardTitle>{props.title}</CardTitle>
              {props.draggable == true && (
                <ReorderIcon dragControls={dragControls} />
              )}
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
              <DialogTrigger asChild>
                <Button variant="outline">Edit Slide</Button>
              </DialogTrigger>
            </CardFooter>
          </Card>
        </Reorder.Item>
      </Dialog>
    </div>
  );
}
