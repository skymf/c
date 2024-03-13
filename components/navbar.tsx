"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import CombinedGraphComponent from "@/app/graphs/page";

export default function NavBar() {
  const user = null;
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="container mx-auto flex h-24 w-full items-center border-b-2  ">
      <Link href="/">
        <Image
          src="/123.jpg"
          width="50"
          height="0"
          alt="hey je ne sais pass"
          className="h-auto w-fit"
        />
      </Link>
      <div className="grow">
        <div className="flex flex-row items-center justify-end gap-4">
          <Link href="/" className=" h-2 hover:underline">
            contact
          </Link>

          <Link href="/graphs" className="h-2 hover:underline">
            check your recent graphs
          </Link>
          <button
            className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
            onClick={() => setIsOpen(true)}
          >
            create a new graph
          </button>
          <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
            <DialogPanel>
              <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong mb-3 text-lg font-semibold">
                display your youtube video stats
              </h3>
              <CombinedGraphComponent />
              <button
                className="group mt-3 h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
                onClick={() => setIsOpen(false)}
              >
                close
              </button>
            </DialogPanel>
          </Dialog>

          <Link
            href="/ho"
            className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
          >
            Sign Up
          </Link>

          <Link
            href="/ho"
            className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

// <header className="grow">
//   <div className="sticky z-50 h-16 ">
//     <div className="h-auto border-b border-red-200">
//       <div className="flex flex-row items-center justify-between gap-3 ">
//         {/* image on the top right // navbar */}
//         <Link href="/">
//           <Image
//             src="/hi.jpg"
//             height="30"
//             width="75"
//             alt="hey je ne sais pass"
//             className=""
//           />
//         </Link>

//         {/* if user is logged in or isnt */}
//         <div className="flex h-8 flex-row items-center gap-6">
//           <Link href="/" className=" h-3">
//             contact
//           </Link>
//           <Link href="/graphs" className="h-3">
//             check your recent graphs
//           </Link>

//           <button
//             className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
//             onClick={() => setIsOpen(true)}
//           >
//             create a new graph
//           </button>
//           <Dialog
//             open={isOpen}
//             onClose={(val) => setIsOpen(val)}
//             static={true}
//           >
//             <DialogPanel>
//               <h3 className="mb-3 text-lg font-semibold">
//                 display your youtube video stats!
//               </h3>
//               <CombinedGraphComponent />
//               <button
//                 className="group mt-3 h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
//                 onClick={() => setIsOpen(false)}
//               >
//                 close
//               </button>
//             </DialogPanel>
//           </Dialog>
//
//           {user ? null : (
//             <div className="flex flex-row gap-3">
//               <Link
//                 href="/ho"
//                 className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
//               >
//                 Sign Up
//               </Link>

//               <Link
//                 href="/ho"
//                 className="group mt-3 flex h-8 w-full max-w-xs items-center rounded-full border border-[#F3F1EB] px-3 text-sm text-[#F3F1EB] outline-none transition hover:scale-110 hover:bg-[#F3F1EB] hover:text-[#2A2A2B] focus:scale-110 active:scale-105 sm:h-10 sm:max-w-max sm:text-base"
//               >
//                 Login
//               </Link>
//             </div>
//           )}
//           {/* {user ? null : (
//             <div>
//               <Link href="/graphs">plot a new graph</Link>
//               <Image
//                 src="/p.jpg"
//                 width="128"
//                 height="128"
//                 alt="pfp"
//                 className="rounded-full drop-shadow-sm"
//               />
//               <Link href="/logout">
//                 <a className="text-red-500">Logout</a>
//               </Link>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </div>
//   </div>
// </header>
