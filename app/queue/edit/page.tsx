"use client";

import Item from "@/components/Item";
import { Button } from "@/components/ui/button";
import { Reorder } from "motion/react";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

export default function Queue() {
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
    fetch("http://localhost:3000")
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

  function getprevimg(html: string) {
    return <div>{ReactHtmlParser(html)}</div>;
  }

  function handlesubmittoserver() {
    console.log(slides);
    fetch("http://localhost:3000/changeslidequeue", {
      method: "POST",
      body: JSON.stringify(slides),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return (
    <div>
      <Button className="text-xl" onClick={handlesubmittoserver}>
        Submit
      </Button>
      <Reorder.Group axis="y" onReorder={setslides} values={slides}>
        {slides.map((slide, index) => (
          <Item
            item={slide}
            key={slide.title}
            title={slide.title}
            desc={slide.desc}
            previmg={getprevimg(slide.html)}
            onChange={handlechange}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}
