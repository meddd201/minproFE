"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PofilePicture from "./components/pofilePicture";
import Hamburger from "./components/hambureger";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();
  const user = session?.data?.user;
  if (pathname === "/login") return null;
  if (pathname === "/register") return null;
  if (pathname === "/forgot-password") return null;
  return (
    <nav className="relative container mx-auto h-[55px]">
      <div className="fixed top-0 right-0 left-0 z-50 container mx-auto flex h-[55px] items-center justify-between rounded-b-lg bg-white/80 px-4 text-white">
        <Link href={"/"} className="flex items-center gap-0">
          <Image
            src={"/logo/textlogo.svg"}
            alt="LogoText"
            width={50}
            height={50}
            className="color-white aspect-square h-full"
          />
          <Image
            src="/logo/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className="aspect-square h-full animate-spin rounded-full"
          />
        </Link>
        <div className="md hidden gap-4 md:flex">
          <Link
            href="/"
            className="text-black hover:cursor-pointer hover:text-3xl"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="text-black hover:cursor-pointer hover:text-3xl"
          >
            Explore
          </Link>
          {user?.role === "ADMIN" && (
            <Link
              href="/organization"
              className="text-black hover:cursor-pointer hover:text-3xl"
            >
              Organize
            </Link>
          )}
          <Link
            href="/about"
            className="text-black hover:cursor-pointer hover:text-3xl"
          >
            About Us
          </Link>
        </div>

        <PofilePicture />
        <Hamburger />
      </div>
    </nav>
  );
};

export default Navbar;
