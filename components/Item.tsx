import React, { ReactElement, useState } from "react";
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
import { toast } from "sonner";

interface ItemProps {
  item: any;
  title: string;
  desc: string;
  previmg: ReactElement;
  onChange: Function;
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
  const [isOpen, setIsOpen] = useState(false);
  const [slidetitle, setslidetitle] = useState("Unnamed Slide");
  const [slidedesc, setslidedesc] = useState("Description");
  const [file, setFile] = useState<File | null>(null);

  function handlesubmit() {
    var filecontent = "";
    const reader = new FileReader();
    reader.onload = async (e) => {
      filecontent = e.target?.result as string;
      console.log(filecontent);
      props.onChange(props.title, slidetitle, slidedesc, filecontent);
    };
    if (file) reader.readAsText(file);
  }

  return (
    <div className="m-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                value={slidetitle}
                className="col-span-3"
                onChange={(e) => setslidetitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="desc" className="text-right">
                Description
              </Label>
              <Input
                id="desc"
                value={slidedesc}
                className="col-span-3"
                onChange={(e) => setslidedesc(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="html" className="text-right">
                HTML
              </Label>
              <Input
                id="html"
                type="file"
                onChange={(e) => {
                  if (e.target.files !== null) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handlesubmit}>
              Save changes
            </Button>
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
                <div className="flex ml-auto mr-0 items-center">
                  <ReorderIcon dragControls={dragControls} />
                </div>
              </div>
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
