"use client";

import Item from "@/components/Item";
import { Reorder } from "motion/react";
import { useState } from "react";

export default function Queue() {
  const Slides = [
    {
      id: "fghkghk",
      title: "Slide 1",
      desc: "Slide 1 Description",
      previmgurl:
        "https://www.appgefahren.de/wp-content/uploads/2020/06/wetter-icon.jpg",
    },
    {
      id: "fgzshkmzu",
      title: "Slide 2",
      desc: "Slide 2 Description",
      previmgurl:
        "https://esrp5wss3st.exactdn.com/wp-content/uploads/2022/07/Google-calendar-ID-Foresight-by-xFanatical-1.jpg?strip=all&lossy=1&ssl=1",
    },
    {
      id: "dyfahgdyfh",
      title: "Slide 3",
      desc: "Slide 3 Description",
      previmgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQda2CXUj3q5fLA-N3FBCrhm5nxHSIctgI-qw&s",
    },
    {
      id: "duipfdsgthsfjgtfrghn",
      title: "Slide 4",
      desc: "Slide 4 Description",
      previmgurl: "",
    },
    {
      id: "dfgzjjfs",
      title: "Slide 5",
      desc: "Slide 5 Description",
      previmgurl: "",
    },
  ];

  const [slides, setslides] = useState(Slides);

  return (
    <div>
      <Reorder.Group axis="y" onReorder={setslides} values={slides}>
        {slides.map((slide, index) => (
          <Item
            draggable={true}
            item={slide}
            key={slide.title}
            title={slide.title}
            desc={slide.desc}
            previmg={slide.previmgurl}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}
