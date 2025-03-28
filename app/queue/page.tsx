"use client";

import Item from "@/components/Item";
import ItemUneditable from "@/components/ItemUneditable";
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
    }
  ]);

  useEffect(() => {
    fetch("http://"+ process.env.BACKEND_SERVER )
      .then((response) => response.json())
      .then((data) => setslides(data));
  }, []);
  // ...

  function getprevimg(html: string) {
    return <div>{ReactHtmlParser(html)}</div>;
  }

  return (
    <div>
      <Reorder.Group axis="y" onReorder={setslides} values={slides}>
        {slides.map((slide, index) => (
          <ItemUneditable
            item={slide}
            key={slide.title}
            title={slide.title}
            desc={slide.desc}
            previmg={getprevimg(slide.html)}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}
