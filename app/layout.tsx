import { AuthContextProvider } from "@/Firebase/context/AuthContext";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import NavBar from "@/components/navbar";

const work = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "hey",
  description:
    "app made by me :), but like this is just a prototype, made for a client. Check out my github https://github.com/skymf and yeah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={work.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
