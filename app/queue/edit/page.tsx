"use client";

import Item from "@/components/Item";
import { Button } from "@/components/ui/button";
import { Reorder } from "motion/react";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

let BACKEND_SERVER = "http://" + process.env.BACKEND_SERVER || "";

export default function Queue() {
  const [isOpen, setIsOpen] = useState(false);
  const [slidetitle, setslidetitle] = useState("Unnamed Slide");
  const [slidedesc, setslidedesc] = useState("Description");
  const [file, setFile] = useState<File | null>(null);
  const [slides, setslides] = useState([
    {
      title: "Slide 1",
      desc: "Slide 1",
      html: "<h1>Slide 1</h1>",
    },
    {
      title: "Slide 2",
      desc: "Slide 2",
      html: "<h1>Slide 2</h1>",
    },
    {
      title: "Slide 3",
      desc: "Slide 3",
      html: "<h1>Slide 3</h1>",
    },
    {
      title: "Slide 4",
      desc: "Slide 4",
      html: "<h1>Slide 4</h1>",
    },
  ]);

  useEffect(() => {
    console.log(BACKEND_SERVER);
    fetch(BACKEND_SERVER)
      .then((response) => response.json())
      .then((data) => setslides(data));
  }, []);

  function handlechange(
    currentslide: string,
    title: string,
    desc: string,
    html: string
  ) {
    console.log("Treid to change title to " + title);

    function isSlide(slide: { title: string; desc: string; html: string }) {
      return slide.title === currentslide;
    }
    var newslides = [...slides];
    const index = newslides.findIndex(isSlide);
    if (index !== -1) {
      newslides[index]["title"] = title;
      newslides[index]["desc"] = desc;
      newslides[index]["html"] = html;
      console.log(newslides);
      setslides(newslides);
    } else {
      console.error("Slide not found");
    }
  }

  function handleDelete(currentslide: string) {
    function isSlide(slide: { title: string; desc: string; html: string }) {
      return slide.title === currentslide;
    }
    var newslides = [...slides];
    const index = newslides.findIndex(isSlide);
    if (index !== -1) {
      newslides.splice(index, 1);
      console.log(newslides);
      setslides(newslides);
    } else {
      console.error("Slide not found");
    }
  }

  function getprevimg(html: string) {
    return <div>{ReactHtmlParser(html)}</div>;
  }

  function handlesubmittoserver() {
    console.log(slides);
    fetch(BACKEND_SERVER + "/changeslidequeue", {
      method: "POST",
      body: JSON.stringify(slides),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  function handleformsubmit() {
    var filecontent = "";
    const reader = new FileReader();
    reader.onload = async (e) => {
      filecontent = e.target?.result as string;
      console.log(filecontent);
      let slide = {
        title: slidetitle,
        desc: slidedesc,
        html: filecontent,
      };
      var newslides = [...slides];
      newslides.push(slide);
      console.log(newslides);
      setslides(newslides);
      setIsOpen(false);
    };
    if (file) reader.readAsText(file);
    if (file == null) {
      toast("You must Input a File!");
    }
  }

  function createnewslide() {}

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new Slide</DialogTitle>
            <DialogDescription>
              Input your Slide Configuration. Click save when you're done.
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
            <Button type="submit" onClick={handleformsubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
        <div className="gap-5 m-5 bg-neutral-900 p-5 rounded-2xl w-fit h-fit">
          <h1 className="text-3xl m-2">Slide Configuration</h1>
            <DialogTrigger asChild>
              <Button className="text-xl m-2">Create New Slide</Button>
            </DialogTrigger>
            <Button className="text-xl m-2" onClick={handlesubmittoserver}>
              Submit to Backend
            </Button>
        </div>


        <Reorder.Group axis="y" onReorder={setslides} values={slides}>
          {slides.map((slide, index) => (
            <Item
              item={slide}
              key={slide.title}
              title={slide.title}
              desc={slide.desc}
              html={slide.html}
              previmg={getprevimg(slide.html)}
              onChange={handlechange}
              onDelete={handleDelete}
            />
          ))}
        </Reorder.Group>
      </Dialog>
    </div>
  );
}
