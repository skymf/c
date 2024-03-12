"use client";
import SignUps from "@/components/SignUp";
import SignIn from "@/components/SignIn";
import { Callout } from "@tremor/react";

export default function Home() {
  return (
    <section className="mt-12 flex flex-col gap-3 px-12">
      <div className="flex flex-row justify-center gap-5">
        <Callout title="TO WORK ON AND TO ADD" color="emerald">
          Hey login or sign up to get started! <br /> any errors contact me{" "}
          <br /> currently only have to link graphs with notes
        </Callout>
      </div>

      <div className="flex flex-row justify-center gap-8">
        <SignUps />
        <SignIn />
      </div>
    </section>
  );
}
