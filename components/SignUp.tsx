import React, { useState } from "react";
import signUp from "../Firebase/signup";
import { useRouter } from "next/navigation";
import { TextInput } from "@tremor/react";

export default function SignUps() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userCredential, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }
    console.log(userCredential);
    return router.push("/hey");
  };

  return (
    <div className="flex flex-col">
      <div className="form-wrapper">
        <h1 className="mb-3 text-2xl font-semibold">Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <p className="text-md pb-2 font-medium"> Email </p>
          <TextInput
            className="text-black"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
          />
          <p className="text-md pb-2 pt-2 font-medium">Password</p>
          <TextInput
            placeholder="Type password here"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
            id="password"
          />
          <p className="pt-2 text-xs">
            By signing up you agree to our{" "}
            <a href="#" className="text-[#F3F1EB] hover:underline">
              whatever ???
            </a>
          </p>
          <button
            type="submit"
            className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
