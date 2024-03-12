"use client";
import { Callout } from "@tremor/react";
import React from "react";
// import Image from "next/image";

export default function Hey() {
  const [value, setValue] = React.useState("");
  return (
    <section className="mb-8 mt-24">
      <div className="flex flex-row gap-8">
        <Callout title="ehm to do" color="emerald">
          <del> add note function </del> <br />
          <del>
            {" "}
            save notes on local session storage function <br />{" "}
          </del>
          <del>
            {" "}
            so the user can type their notes and stuff, and it gets deployed to{" "}
          </del>
          <del>
            {" "}
            storage or a database <br />{" "}
          </del>
          <del>
            sync the notes with the specific timestamps on each place from the
            graph, but that is pretty difficult to implement for now, so that
            might be added later too <br />{" "}
          </del>
          <del>
            {" "}
            add the database <br />{" "}
          </del>
          <del>
            add YouTube embed function and input field so the user can type
            their video length into it, is a must, so the specific timestamps
            for each place can be calculated <br />{" "}
          </del>
          <del>
            fix the bar chart, so the absolute audience retention can be
            calculated from the file !! <br />{" "}
          </del>
          use this link {" https://www.youtube.com/watch?v=HJKNb26jIRk"}
        </Callout>
      </div>
    </section>
  );
}
