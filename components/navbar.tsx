"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function NavBar() {
  const user = null;
  return (
    <header className="">
      <div className="sticky inset-x-0 z-50 h-16 ">
        <div className="border-b border-red-200">
          <div className="flex h-16 flex-row items-center justify-between gap-3">
            {/* image on the top right // navbar */}
            <div>
              <Link href="/">
                <Image
                  src="/hi.jpg"
                  height="128"
                  width="128"
                  alt="hey je ne sais pass"
                />
              </Link>
            </div>
            {/* if user is logged in or isnt */}
            <div className="flex h-8 flex-row items-center gap-6">
              <Link href="/graphs" className="h-3">
                graphs
              </Link>
              <Link href="/" className=" h-3">
                contact
              </Link>
              {user ? null : (
                <div className="flex flex-row gap-3">
                  <Link
                    href="/signup"
                    className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
                  >
                    Sign Up
                  </Link>

                  <Link
                    href="/login"
                    className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
                  >
                    Login
                  </Link>
                </div>
              )}
              {/* {user ? null : (
                <div>
                  <Link href="/graphs">plot a new graph</Link>
                  <Image
                    src="/p.jpg"
                    width="128"
                    height="128"
                    alt="pfp"
                    className="rounded-full drop-shadow-sm"
                  />
                  <Link href="/logout">
                    <a className="text-red-500">Logout</a>
                  </Link>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
